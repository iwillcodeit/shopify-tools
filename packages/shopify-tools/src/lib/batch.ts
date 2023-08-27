import gql from 'graphql-tag';

import { Kind } from 'graphql/language/kinds.js';
import { print } from 'graphql/language/printer.js';
import type { DocumentNode, OperationDefinitionNode } from 'graphql/language/ast.js';
import type { Batched, DeepMutable } from '../types/index.js';
import { AdminApiClient } from './AdminApiClient.js';
import { sleep } from '../utils/index.js';

import Debug from 'debug';
const debug = Debug('shopify-tools:batch');

export interface BatchParams {
  batchSize: number;
  waitTime: number;
}

export async function batchMutation<
  T extends Record<string, unknown>,
  V extends Record<string, unknown> = Record<string, unknown>
>(client: AdminApiClient, mutationStr: string, values: V[], params: Partial<BatchParams>): Promise<Batched<T>> {
  const { batchSize = 10, waitTime = 1250 } = params ?? {};

  const query = gql(mutationStr) as DeepMutable<DocumentNode>;

  if (query.kind !== Kind.DOCUMENT) throw new Error('Query definition is missing');

  const mutationDef = query.definitions.find(
    (d) => d.kind === Kind.OPERATION_DEFINITION && d.operation === 'mutation'
  ) as DeepMutable<OperationDefinitionNode>;

  if (!mutationDef) throw new Error('Failed to parse operation');

  if (mutationDef.selectionSet.selections.length > 1) throw new Error('You can only select one mutation at a time');
  if (mutationDef.selectionSet.selections[0]?.kind !== Kind.FIELD) throw new Error('The selection must be a field');

  const name = mutationDef.name?.value ?? 'batch';
  const mutationVariables = structuredClone(mutationDef.variableDefinitions);
  const mutationSelection = structuredClone(mutationDef.selectionSet.selections[0]);

  let responses = {} as Batched<T>;

  debug(
    'Executing %s in batch. %d inputs to mutate. (batchSize=%d,waitTime=%dms). Splitting into %d batches',
    name,
    values.length,
    batchSize,
    waitTime,
    Math.ceil(values.length / batchSize)
  );
  for (let i = 0; i < values.length; i += batchSize) {
    debug('Mutating batch n°%d', i + 1);
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

    const res = await client.mutate<Record<string, any>>({
      mutation: print(query as DocumentNode),
      variables,
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
