import { nanoid } from 'nanoid';
import Debug from 'debug';
import { createInterface } from 'node:readline';
import { createReadStream } from 'node:fs';
import { Writable } from 'node:stream';
import { unlinkMaybe } from '../utils/fs';
import { BULK_MUTATION, BULK_QUERY } from '../graphql/queries';
import type { RunBulkQueryMutation, RunBulkQueryMutationVariables } from '../types/admin.types';
import type { DeepMutable } from '../types';
import type { AllOperations, ApiClient, ReturnData } from '@shopify/graphql-client';
import { AllClientOperations, PickOperationVariables } from '../types/shopify';
import { Kind, print, parse } from 'graphql';
import type { DocumentNode, OperationDefinitionNode } from 'graphql/language/ast';
import { applyVariables, parseValues } from '../utils/graphql';
import { createStagedUpload, fetchStreamToFile, verifyResult, waitBulkOperation } from '../utils/bulk';

const debug = Debug('shopify-tools:bulk');

export function prepareBulkOperation<
  Operation extends keyof Operations = string,
  Operations extends AllOperations = AllOperations,
  Values extends Record<string, any> | undefined = PickOperationVariables<Operation, Operations>
>(operation: Operation, values: Values): string {
  const document = structuredClone(parse(String(operation))) as DeepMutable<DocumentNode>;

  const operationDefinitions = document.definitions.filter((def) => def.kind === Kind.OPERATION_DEFINITION);
  if (operationDefinitions.length === 0) {
    throw new Error('Bulk operation must have an operation');
  }
  if (operationDefinitions.length > 1) {
    throw new Error('Bulk operation cannot have more than one operations');
  }

  const operationDefinition = operationDefinitions[0] as DeepMutable<OperationDefinitionNode>;

  // If the query has no variable nor arguments, then return the query as is, because no further parsing is required
  if (
    (!operationDefinition.variableDefinitions || operationDefinition.variableDefinitions.length === 0) &&
    (!values || Object.keys(values).length === 0)
  ) {
    return String(operation);
  }

  const variableDefinitions = structuredClone(operationDefinition.variableDefinitions);
  const parsedValues = parseValues(values, variableDefinitions);
  operationDefinition.variableDefinitions = undefined;

  applyVariables(operationDefinition.selectionSet, parsedValues);

  return print(document as DocumentNode);
}

export type BulkOperationType<
  Operation extends keyof Operations = string,
  Operations extends AllOperations = AllOperations,
  Values extends Record<string, any> | undefined = PickOperationVariables<Operation, Operations>
> =
  | Operation
  | {
      query: Operation;
      variables: Values;
    };

export function parseOperation<
  Operation extends keyof Operations = string,
  Operations extends AllOperations = AllOperations,
  Values extends Record<string, any> | undefined = PickOperationVariables<Operation, Operations>
>(operation: BulkOperationType<Operation, Operations, Values>) {
  if (typeof operation === 'string' || typeof operation === 'number' || typeof operation === 'symbol') {
    return String(operation);
  } else {
    return prepareBulkOperation<Operation, Operations, Values>(operation.query, operation.variables);
  }
}

export async function runBulkQuery<
  Client extends ApiClient<any, any> = ApiClient,
  Operation extends keyof Operations = string,
  Operations extends AllClientOperations<Client> = AllClientOperations<Client>,
  Values extends Record<string, any> | undefined = PickOperationVariables<Operation, Operations>
>(client: Client, query: BulkOperationType<Operation, Operations, Values>, output: string | Writable | null) {
  // Start bulk operation

  debug(`Creating new bulk query.`);
  const { data, errors } = await client.request<RunBulkQueryMutation>(BULK_QUERY, {
    variables: {
      query: parseOperation(query),
    } satisfies RunBulkQueryMutationVariables,
  });

  if (errors) {
    throw new Error('Failed to execute bulk operation', { cause: errors });
  }

  const bulkOperationRunQuery = data?.bulkOperationRunQuery;

  if (!bulkOperationRunQuery) {
    throw new Error('Failed to execute bulk operation: run query is missing');
  }

  if (bulkOperationRunQuery.userErrors.length > 0) {
    throw new Error(JSON.stringify(bulkOperationRunQuery.userErrors, null, 2));
  }

  if (!bulkOperationRunQuery.bulkOperation) {
    throw new Error('Failed to execute bulk operation: bulk operation is missing');
  }

  debug(`Created operation.`);

  if (output) {
    debug(`Waiting completion...`);
    const bulkOperation = await waitBulkOperation(client, bulkOperationRunQuery.bulkOperation);
    debug(`Bulk operation completed.`);

    if (bulkOperation.url) {
      debug(`Download URL found. Downloading...`);
      await fetchStreamToFile(bulkOperation.url, output);
      debug(`Downloaded bulk operation output...`);
    }

    return bulkOperation;
  } else {
    debug(`No output found, not waiting for completion.`);

    return bulkOperationRunQuery.bulkOperation;
  }
}

export async function* bulkQuery<
  TData = undefined,
  Client extends ApiClient<any, any> = ApiClient,
  Operation extends keyof Operations = string,
  Operations extends AllClientOperations<Client> = AllClientOperations<Client>,
  Values extends Record<string, any> | undefined = PickOperationVariables<Operation, Operations>,
  Data = TData extends undefined ? ReturnData<Operation, Operations> : TData
>(client: Client, query: BulkOperationType<Operation, Operations, Values>): AsyncGenerator<Data> {
  const operationId = nanoid();

  const operationPath = `/tmp/bulk-${operationId}.jsonl`;

  debug('Executing bulk %s', operationId);

  try {
    const result = await runBulkQuery(client, query, operationPath);
    debug('Finished bulk %s', operationId);

    verifyResult(result);

    debug('Creating read interface for bulk %s', operationId);
    const rl = createInterface({
      input: createReadStream(operationPath),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      yield JSON.parse(line) as Data;
    }
  } catch (e) {
    throw new Error('Failed to execute bulk', { cause: e });
  } finally {
    unlinkMaybe(operationPath).catch(console.error);
  }
}

export async function runBulkMutation<
  Client extends ApiClient<any, any> = ApiClient,
  Operation extends keyof Operations = string,
  Operations extends AllClientOperations<Client> = AllClientOperations<Client>,
  Values extends Record<string, any> | undefined = PickOperationVariables<Operation, Operations>
>(client: Client, mutation: Operation, variables: Array<Values>, output: string | Writable | null) {
  const { stagedUploadPath } = await createStagedUpload(client, variables);

  debug(`Creating bulk operation...`);

  const { data, errors } = await client.request(BULK_MUTATION, {
    variables: {
      mutation,
      stagedUploadPath,
    },
  });

  if (errors) {
    throw new Error('Failed to execute bulk operation', { cause: errors });
  }

  const bulkOperationRunMutation = data?.bulkOperationRunMutation;

  if (!bulkOperationRunMutation) {
    throw new Error('Failed to execute bulk operation: run mutation is missing');
  }

  if (bulkOperationRunMutation.userErrors.length > 0) {
    throw new Error(JSON.stringify(bulkOperationRunMutation.userErrors, null, 2));
  }

  if (!bulkOperationRunMutation.bulkOperation) {
    throw new Error('Failed to execute bulk operation: bulk operation is missing');
  }

  debug(`Created bulk operation.`);

  if (output) {
    debug(`Waiting completion...`);
    const bulkOperation = await waitBulkOperation(client, bulkOperationRunMutation.bulkOperation);
    debug(`Bulk operation completed.`);

    if (bulkOperation.url) {
      debug(`Download URL found. Downloading...`);
      await fetchStreamToFile(bulkOperation.url, output);
      debug(`Downloaded bulk operation output...`);
    }

    return bulkOperation;
  } else {
    debug(`No output found, not waiting for completion.`);

    return bulkOperationRunMutation.bulkOperation;
  }
}

export async function* bulkMutate<
  TData = undefined,
  Client extends ApiClient<any, any> = ApiClient,
  Operation extends keyof Operations = string,
  Operations extends AllClientOperations<Client> = AllClientOperations<Client>,
  Values extends Record<string, any> | undefined = PickOperationVariables<Operation, Operations>,
  Data = TData extends undefined ? ReturnData<Operation, Operations> : TData
>(client: Client, mutation: string, variables: Array<Values>): AsyncGenerator<Data> {
  const operationId = nanoid();

  const operationPath = `/tmp/bulk-${operationId}.jsonl`;

  debug('Executing bulk %s', operationId);

  try {
    debug('Executing bulk %s', operationId);
    const result = await runBulkMutation(client, mutation, variables, operationPath);

    verifyResult(result);

    const rl = createInterface({
      input: createReadStream(operationPath),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      yield JSON.parse(line) as Data;
    }
  } finally {
    unlinkMaybe(operationPath).catch(console.error);
  }
}
