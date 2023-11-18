import gql from 'graphql-tag';

import { Kind } from 'graphql/language/kinds.js';
import { print } from 'graphql/language/printer.js';
import type { DocumentNode, FieldNode, OperationDefinitionNode } from 'graphql/language/ast.js';
import type { Batched, DeepMutable } from '../types/index.js';
import { AdminApiClient } from './AdminApiClient.js';
import { sleep } from '../utils/index.js';

import Debug from 'debug';
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

export function prepareBatchMutation<V extends Record<string, unknown> = Record<string, unknown>>(
  mutationStr: string,
  values: V[],
  params?: Partial<BatchParams> | null
): { name: string; queries: Array<{ mutation: string; variables: Record<string, unknown> }> } {
  const queries: Array<{ mutation: string; variables: Record<string, unknown> }> = [];

  const { batchSize } = getBatchParams(params);

  const document = structuredClone(gql(String(mutationStr))) as DeepMutable<DocumentNode>;

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
          ...structuredClone(mutationVariables).map((def, j) => {
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
          arg.value.name.value = `${arg.name.value}_${I}`;
        }
        return arg;
      });
      mutationDef.selectionSet.selections.push(selection);

      Object.entries(variable).forEach(([key, value]) => {
        variables[`${key}_${I}`] = value;
      });
    });

    queries.push({
      mutation: print(document as DocumentNode),
      variables,
    });
  }

  return { name, queries };
}

export async function batchMutation<
  T extends Record<string, unknown>,
  V extends Record<string, unknown> = Record<string, unknown>
>(client: AdminApiClient, mutationStr: string, values: V[], params?: Partial<BatchParams> | null): Promise<Batched<T>> {
  const { batchSize, waitTime } = getBatchParams(params);

  const { name, queries } = prepareBatchMutation<V>(mutationStr, values, params);
  let responses = {} as Batched<T>;

  debug(
    'Executing %s in batch. %d inputs to mutate. (batchSize=%d,waitTime=%dms). Splitting into %d batches',
    name,
    values.length,
    batchSize,
    waitTime,
    queries
  );
  for (const [i, query] of queries.entries()) {
    debug('Mutating batch n°%d', i / batchSize + 1);

    const res = await client.mutate<Record<string, any>>({
      ...query,
      headers: {
        'X-GraphQL-Cost-Include-Fields': 'true',
      },
    });

    responses = {
      ...responses,
      ...res,
    };

    await sleep(waitTime);
  }

  return responses;
}
