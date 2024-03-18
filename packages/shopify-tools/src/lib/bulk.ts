import { sleep } from '../utils/index.js';

import type { AdminApiClient } from '@shopify/admin-api-client';
import { fetchStreamToFile } from '../utils/bulk/download.js';

import { BulkError, EmptyBulkError } from '../errors/EmptyObjectError.js';

import { nanoid } from 'nanoid';
import Debug from 'debug';
import { createInterface } from 'node:readline';
import { createReadStream } from 'node:fs';
import { Writable } from 'node:stream';
import { unlinkMaybe } from '../utils/fs.js';
import { BULK_MUTATION, BULK_QUERY, CREATE_STAGED_UPLOAD, GET_BULK_STATUS } from '../graphql/queries.js';
import { BulkOperationStatus } from '../types/api.js';
import type {
  GetBulkStatusQuery,
  GetBulkStatusQueryVariables,
  RunBulkQueryMutation,
  RunBulkQueryMutationVariables,
} from '../types/admin.generated.js';
import { BulkOperation, type DeepMutable } from '../types/index.js';
import type { AllOperations } from '@shopify/graphql-client';
import { PickOperationVariables } from '../types/shopify';
import { Kind, print, parse } from 'graphql';
import type { DocumentNode, OperationDefinitionNode } from 'graphql/language/ast';
import { applyVariables, parseValues } from '../utils/graphql';

const debug = Debug('shopify-tools:bulk');

export function prepareBulkOperation<
  Operation extends keyof Operations = string,
  Operations extends AllOperations = AllOperations,
  Values extends Record<string, any> = PickOperationVariables<Operation, Operations>
>(operation: Operation, values?: Values): string {
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

export async function waitBulkOperation(client: AdminApiClient, bulkOperation: BulkOperation) {
  // Check status with pooling
  while (bulkOperation.status === BulkOperationStatus.Running || bulkOperation.status === BulkOperationStatus.Created) {
    await sleep(5000); // Wait 5s
    debug(`Fetching operation status`);

    const { data, errors } = await client.request<GetBulkStatusQuery>(GET_BULK_STATUS, {
      variables: {
        id: bulkOperation.id,
      } satisfies GetBulkStatusQueryVariables,
    });

    if (errors) throw new Error('Failed to get bulk status', { cause: errors });

    if (!data || !data.node || data.node.__typename !== 'BulkOperation') {
      throw new Error('Failed to execute bulk operation: failed to get bulk operation status');
    }

    bulkOperation = data.node;
  }

  // Handle non success status
  if (bulkOperation.status !== BulkOperationStatus.Completed) {
    throw new BulkError(
      bulkOperation,
      `Bulk operation failed with status ${bulkOperation.status} (code: ${bulkOperation.errorCode})`
    );
  }

  return bulkOperation;
}

export async function runBulkQuery(client: AdminApiClient, query: string, output: string | Writable | null) {
  // Start bulk operation

  debug(`Creating new bulk query.`);
  const { data, errors } = await client.request<RunBulkQueryMutation>(BULK_QUERY, {
    variables: {
      query: query,
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

export function verifyResult(result: BulkOperation) {
  if (Number(result.rootObjectCount) === 0) {
    throw new EmptyBulkError(result);
  }
  if (!result.url) {
    throw new EmptyBulkError(result);
  }
}

export async function* bulkQuery<T>(client: AdminApiClient, query: string) {
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
      yield JSON.parse(line) as T;
    }
  } catch (e) {
    throw new Error('Failed to execute bulk', { cause: e });
  } finally {
    unlinkMaybe(operationPath).catch(console.error);
  }
}

async function createStagedUpload<T = Record<string, unknown>>(client: AdminApiClient, variables: T[]) {
  // Initialize bulk variables upload
  debug(`Creating new bulk mutation. Creating variable upload`);
  const { data, errors } = await client.request(CREATE_STAGED_UPLOAD);

  if (errors) {
    throw new Error('Failed to create staged upload', { cause: errors });
  }

  const stagedUploadsCreate = data?.stagedUploadsCreate;

  if (!stagedUploadsCreate) {
    throw new Error('Failed to create staged upload');
  }

  const variablesStr = variables.map((v) => JSON.stringify(v)).join('\r\n');
  const target = stagedUploadsCreate.stagedTargets?.[0];

  if (!target) {
    throw new Error('Failed to create staged upload: no target');
  }
  if (!target.url) {
    throw new Error('Failed to create staged upload: no target url');
  }

  debug(`Created file upload URL.`);

  const form = new FormData();
  let stagedUploadPath;
  target.parameters.forEach(({ name, value }) => {
    if (name === 'key') {
      stagedUploadPath = value;
    }
    form.append(name, value);
  });
  form.append('file', new Blob([variablesStr]), '/tmp/variables.jsonl');

  if (!stagedUploadPath) {
    throw new Error('Missing stagedUploadPath');
  }

  debug(`Uploading mutation variables.`);

  const res = await fetch(target.url, {
    method: 'POST',
    body: form,
  });

  if (!res.ok || res.status >= 400) {
    throw new Error(`Failed to upload bulk operation variables with status ${res.status}:\n${await res.text()}`);
  }

  debug(`Uploaded mutation variables.`);
  return { stagedUploadPath };
}

export async function runBulkMutation<T = Record<string, unknown>>(
  client: AdminApiClient,
  mutation: string,
  variables: T[],
  output: string | Writable | null
) {
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

export async function* bulkMutate<V = Record<string, unknown>, T = unknown>(
  client: AdminApiClient,
  mutation: string,
  variables: V[]
) {
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
      yield JSON.parse(line) as T;
    }
  } finally {
    unlinkMaybe(operationPath).catch(console.error);
  }
}
