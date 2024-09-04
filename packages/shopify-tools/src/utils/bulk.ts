import type { ApiClient } from '@shopify/graphql-client';
import Debug from 'debug';
import { createWriteStream } from 'node:fs';
import { Readable, Writable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { ReadableStream } from 'node:stream/web';
import { sleep } from '.';
import { BulkError, EmptyBulkError } from '../errors/EmptyObjectError';
import { GET_BULK_STATUS } from '../graphql/queries';
import { createStagedUpload } from '../lib/upload';
import { BulkOperation } from '../types';
import type { GetBulkStatusQuery, GetBulkStatusQueryVariables } from '../types/admin.types';

const debug = Debug('shopify-tools:bulk');

export async function fetchStreamToFile(url: string, output: string | Writable) {
  const response = await fetch(url);

  if (!response.body) throw new Error('No body');
  const body = Readable.fromWeb(response.body as unknown as ReadableStream<any>);

  const writeStream = typeof output === 'string' ? createWriteStream(output) : output;

  await finished(body.pipe(writeStream));
}

export function verifyResult(result: BulkOperation) {
  if (Number(result.rootObjectCount) === 0) {
    throw new EmptyBulkError(result);
  }
  if (!result.url) {
    throw new EmptyBulkError(result);
  }
}

export async function waitBulkOperation<Client extends ApiClient<any, any> = ApiClient>(
  client: Client,
  bulkOperation: BulkOperation
) {
  // Check status with pooling
  while (bulkOperation.status === 'RUNNING' || bulkOperation.status === 'CREATED') {
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
  if (bulkOperation.status !== 'COMPLETED') {
    throw new BulkError(
      bulkOperation,
      `Bulk operation failed with status ${bulkOperation.status} (code: ${bulkOperation.errorCode})`
    );
  }

  return bulkOperation;
}

export async function createBulkMutationStagedUpload<
  Data = Record<string, unknown>,
  Client extends ApiClient<any, any> = ApiClient
>(client: Client, variables: Data[]) {
  debug(`Creating new bulk mutation. Creating variable upload`);

  const variablesStr = variables.map((v) => JSON.stringify(v)).join('\r\n');

  const data = await createStagedUpload(client, {
    filename: 'bulk_op_vars',
    mimeType: 'text/jsonl',
    resource: 'BULK_MUTATION_VARIABLES',
    value: new Blob([variablesStr]),
  });

  const target = data?.stagedTargets?.[0];

  if (!target) {
    throw new Error('Failed to create staged upload: no target');
  }

  let stagedUploadPath;
  target.parameters.forEach(({ name, value }: any) => {
    if (name === 'key') {
      stagedUploadPath = value;
    }
  });

  debug(`Uploaded mutation variables.`);

  return { stagedUploadPath };
}
