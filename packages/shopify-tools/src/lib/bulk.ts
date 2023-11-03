import {
  BulkOperationFragment,
  BulkOperationStatus,
  GetBulkStatusQuery,
  GetBulkStatusQueryVariables,
  RunBulkQueryMutation,
  RunBulkQueryMutationVariables,
  RunBulkMutationMutation,
  RunBulkMutationMutationVariables,
  CreateStagedUploadForBulkMutation,
  CreateStagedUploadForBulkMutationVariables,
} from '../types/graphql.js';
import { sleep } from '../utils/index.js';

import { fetchStreamToFile } from '../utils/bulk/download.js';
import { AdminApiClient } from './AdminApiClient.js';

import { nanoid } from 'nanoid';
import Debug from 'debug';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { unlinkMaybe } from '../utils/fs.js';
import { BulkError, EmptyBulkError } from '../errors/EmptyObjectError.js';
import { Writable } from 'stream';
const debug = Debug('shopify-tools:bulk');

export async function* bulkQuery<T>(client: AdminApiClient, query: string) {
  const operationId = nanoid();

  const operationPath = `/tmp/bulk-${operationId}.jsonl`;

  debug('Executing bulk %s', operationId);

  try {
    const result = await runBulkQuery(client, query, operationPath);

    debug('Executing bulk %s', operationId);

    if (Number(result.rootObjectCount) === 0) {
      throw new EmptyBulkError(result);
    }
    if (!result.url) {
      throw new EmptyBulkError(result);
    }

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

export async function waitBulkOperation(client: AdminApiClient, bulkOperation: BulkOperationFragment) {
  // Check status with pooling
  while (bulkOperation.status === BulkOperationStatus.Running || bulkOperation.status === BulkOperationStatus.Created) {
    await sleep(5000); // Wait 5s
    debug(`Fetching operation status`);

    const statusRes = await client.query<GetBulkStatusQuery, GetBulkStatusQueryVariables>({
      query: GET_BULK_STATUS,
      variables: {
        id: bulkOperation.id,
      },
    });

    if (!statusRes.node || statusRes.node.__typename !== 'BulkOperation') {
      throw new Error('Failed to execute bulk operation: failed to get bulk operation status');
    }

    bulkOperation = statusRes.node;
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
  const { bulkOperationRunQuery } = await client.mutate<RunBulkQueryMutation, RunBulkQueryMutationVariables>({
    mutation: BULK_QUERY,
    variables: {
      query: query,
    },
  });

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

export async function runBulkMutation<T = Record<string, unknown>>(
  client: AdminApiClient,
  mutation: string,
  variables: T[],
  output: string | Writable | null
) {
  // Initialize bulk variables upload
  debug(`Creating new bulk mutation. Creating variable upload`);
  const { stagedUploadsCreate } = await client.mutate<
    CreateStagedUploadForBulkMutation,
    CreateStagedUploadForBulkMutationVariables
  >({
    mutation: CREATE_STAGED_UPLOAD,
  });

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

  debug(`Uploaded mutation variables. Creating bulk operation...`);

  const { bulkOperationRunMutation } = await client.mutate<RunBulkMutationMutation, RunBulkMutationMutationVariables>({
    mutation: BULK_MUTATION,
    variables: {
      mutation,
      stagedUploadPath,
    },
  });

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

const BULK_OPERATION_FRAGMENT = /* GraphQL */ `
  fragment BulkOperation on BulkOperation {
    __typename
    id
    status
    errorCode
    url
    objectCount
    rootObjectCount
  }
`;

const CREATE_STAGED_UPLOAD = /* GraphQL */ `
  mutation CreateStagedUploadForBulk {
    stagedUploadsCreate(
      input: { resource: BULK_MUTATION_VARIABLES, filename: "bulk_op_vars", mimeType: "text/jsonl", httpMethod: POST }
    ) {
      userErrors {
        field
        message
      }
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
    }
  }
`;

const BULK_MUTATION = /* GraphQL */ `
  ${BULK_OPERATION_FRAGMENT}

  mutation RunBulkMutation($mutation: String!, $stagedUploadPath: String!) {
    bulkOperationRunMutation(mutation: $mutation, stagedUploadPath: $stagedUploadPath) {
      bulkOperation {
        ...BulkOperation
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const BULK_QUERY = /* GraphQL */ `
  ${BULK_OPERATION_FRAGMENT}

  mutation RunBulkQuery($query: String!) {
    bulkOperationRunQuery(query: $query) {
      bulkOperation {
        ...BulkOperation
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_BULK_STATUS = /* GraphQL */ `
  ${BULK_OPERATION_FRAGMENT}

  query GetBulkStatus($id: ID!) {
    node(id: $id) {
      __typename
      ... on BulkOperation {
        ...BulkOperation
      }
    }
  }
`;
