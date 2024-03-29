import { parse, print, Kind } from 'graphql';
import type {
  ApiClient,
  ResponseErrors,
  ApiClientRequestOptions,
  AllOperations,
  ReturnData,
} from '@shopify/graphql-client';
import type { DocumentNode, FieldNode, OperationDefinitionNode } from 'graphql/language/ast';
import type { DeepMutable } from '../types';
import { sleep } from '../utils';

import Debug from 'debug';
import { AllClientOperations, PickOperationVariables } from '../types/shopify';
const debug = Debug('shopify-tools:batch');

export interface BatchParams {
  batchSize: number;
  waitTime: number;
}

const DEFAULT_BATCH_SIZE = 10;
const DEFAULT_WAIT_TIME = 1250;

export function getBatchParams(params?: Partial<BatchParams> | null): BatchParams {
  const { batchSize = DEFAULT_BATCH_SIZE, waitTime = DEFAULT_WAIT_TIME } = params ?? {};

  return {
    batchSize,
    waitTime,
  };
}

export function prepareBatchMutation<
  Operation extends keyof Operations = string,
  Operations extends AllOperations = AllOperations,
  Values extends Record<string, any> | undefined = PickOperationVariables<Operation, Operations>
>(
  mutationStr: Operation,
  values: Array<Values>,
  params?: Partial<BatchParams> | null
): { name: string; queries: Array<{ mutation: string; variables: any }> } {
  const queries: Array<{ mutation: string; variables: any }> = [];

  const { batchSize } = getBatchParams(params);

  const document = structuredClone(parse(String(mutationStr))) as DeepMutable<DocumentNode>;

  if (document.kind !== Kind.DOCUMENT) throw new Error('Query definition is missing');

  const mutationDef = document.definitions.find(
    (d) => d.kind === Kind.OPERATION_DEFINITION && d.operation === 'mutation'
  ) as DeepMutable<OperationDefinitionNode>;

  if (!mutationDef) throw new Error('Failed to parse operation');

  if (mutationDef.selectionSet.selections.length > 1) throw new Error('You can only select one mutation at a time');
  if (mutationDef.selectionSet.selections[0]?.kind !== Kind.FIELD) throw new Error('The selection must be a field');

  const name = mutationDef.name?.value ?? 'batch';

  const mutationVariables = structuredClone(mutationDef.variableDefinitions);
  const mutationSelection = structuredClone(mutationDef.selectionSet.selections[0]) as DeepMutable<FieldNode>;

  for (let i = 0; i < values.length; i += batchSize) {
    mutationDef.name = {
      kind: Kind.NAME,
      value: `${name}_${i / batchSize + 1}`,
    };
    mutationDef.variableDefinitions = [];
    mutationDef.selectionSet.selections = [];

    const chunk = values.slice(i, i + batchSize);

    const variables: Record<string, unknown> = {};
    chunk.forEach((variable, j) => {
      const I = i + j;

      if (mutationVariables) {
        mutationDef.variableDefinitions?.push(
          ...structuredClone(mutationVariables).map((def) => {
            def.variable.name.value = `${def.variable.name.value}_${I}`;
            return def;
          })
        );
      }

      const selection = structuredClone(mutationSelection);

      selection.alias = {
        kind: Kind.NAME,
        value: `${selection.alias?.value ?? selection.name.value}_${I}`,
      };
      selection.arguments = selection.arguments?.map((arg) => {
        if (arg.value.kind === Kind.VARIABLE) {
          arg.value.name.value = `${arg.value.name.value}_${I}`;
        }
        return arg;
      });
      mutationDef.selectionSet.selections.push(selection);

      if (variable) {
        Object.entries(variable).forEach(([key, value]) => {
          variables[`${key}_${I}`] = value;
        });
      }
    });

    queries.push({
      mutation: print(document as DocumentNode),
      variables,
    });
  }

  return { name, queries };
}

export type ApiClientBatchRequestOptions = Omit<ApiClientRequestOptions, 'variables'> & Partial<BatchParams>;

export type ApiClientBatchRequestResponse<TData = any> = { data: Array<TData>; errors: Array<ResponseErrors> };

export async function batchMutation<
  TData = undefined,
  Client extends ApiClient<any, any> = ApiClient,
  Operation extends keyof Operations = string,
  Operations extends AllClientOperations<Client> = AllClientOperations<Client>,
  Values extends Record<string, any> | undefined = PickOperationVariables<Operation, Operations>,
  Data = TData extends undefined ? ReturnData<Operation, Operations> : TData
>(
  client: Client,
  operation: Operation,
  values: Array<Values>,
  params?: ApiClientBatchRequestOptions
): Promise<ApiClientBatchRequestResponse<Data>> {
  const { batchSize, waitTime } = getBatchParams(params);

  const { name, queries } = prepareBatchMutation<Operation, Operations, Values>(operation, values, params);
  const errors: Array<ResponseErrors> = [];
  const data: Array<Data> = [];

  debug(
    'Executing %s in batch. %d inputs to mutate. (batchSize=%d,waitTime=%dms). Splitting into %d batches',
    name,
    values.length,
    batchSize,
    waitTime,
    queries
  );

  for (const [i, { mutation, variables }] of queries.entries()) {
    debug('Mutating batch n°%d', i / batchSize + 1);

    const res = await client.request<Data>(mutation, {
      variables,
      headers: {
        'X-GraphQL-Cost-Include-Fields': 'true',
      },
    });

    if (res.data) {
      data.push(res.data);
    }
    if (res.errors) {
      errors.push(res.errors);
    }

    await sleep(waitTime);
  }

  return {
    data,
    errors,
  };
}
