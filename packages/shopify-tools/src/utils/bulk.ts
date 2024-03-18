import { createWriteStream } from 'node:fs';
import { Readable, Writable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { ReadableStream } from 'node:stream/web';
import { CREATE_STAGED_UPLOAD, GET_BULK_STATUS } from '../graphql/queries';
import Debug from 'debug';
import { BulkError, EmptyBulkError } from '../errors/EmptyObjectError.js';
import { BulkOperation } from '../types/index';
import { BulkOperationStatus } from '../types/api';
import { sleep } from './index';
import type { GetBulkStatusQuery, GetBulkStatusQueryVariables } from '../types/admin.generated';
import type { ApiClient } from '@shopify/graphql-client';

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

export async function waitBulkOperation<Client extends ApiClient = ApiClient>(
  client: Client,
  bulkOperation: BulkOperation
) {
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

export async function createStagedUpload<Data = Record<string, unknown>, Client extends ApiClient = ApiClient>(
  client: Client,
  variables: Data[]
) {
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
  // TODO: find the type of this
  target.parameters.forEach(({ name, value }: any) => {
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
