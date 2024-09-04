import type { ApiClient } from '@shopify/graphql-client';
import Debug from 'debug';
import { CREATE_STAGED_UPLOAD } from '../graphql/queries';
import {
  CreateStagedUploadMutation,
  CreateStagedUploadMutationVariables,
  StagedUploadInput,
} from '../types/admin.types';

const debug = Debug('shopify-tools:upload');

interface UploadInput extends Pick<StagedUploadInput, 'resource' | 'filename' | 'mimeType'> {
  value: Blob;
}

function parseInput(input: UploadInput): StagedUploadInput {
  return {
    filename: input.filename,
    mimeType: input.mimeType,
    resource: input.resource,
    fileSize: input.value.size.toString(),
    httpMethod: 'POST',
  };
}

export async function createStagedUpload<Client extends ApiClient<any, any> = ApiClient>(
  client: Client,
  inputs: Array<UploadInput> | UploadInput
) {
  if (!Array.isArray(inputs)) {
    inputs = [inputs];
  }

  // Initialize bulk variables upload
  debug(`Creating new staged upload`);
  const { data, errors } = await client.request<CreateStagedUploadMutation>(CREATE_STAGED_UPLOAD, {
    variables: {
      input: inputs.map(parseInput),
    } satisfies CreateStagedUploadMutationVariables,
  });

  if (errors) {
    throw new Error('Failed to create staged upload', { cause: errors });
  }

  const stagedUploadsCreate = data?.stagedUploadsCreate;
  if (!stagedUploadsCreate) {
    throw new Error('Failed to create staged upload');
  }
  if (!stagedUploadsCreate.stagedTargets) {
    throw new Error('No targets to upload');
  }

  for (const [index, target] of stagedUploadsCreate.stagedTargets.entries()) {
    const input = inputs[index];

    if (!target.url) {
      throw new Error('Failed to create staged upload: no target url');
    }

    debug(`Created file upload URL %d`, index);

    const form = new FormData();
    target.parameters.forEach(({ name, value }) => {
      form.append(name, value);
    });
    form.append('file', input.value, input.filename);

    debug(`Uploading staged file %d`, index);

    const res = await fetch(target.url, {
      method: 'POST',
      body: form,
    });

    if (!res.ok || res.status >= 400) {
      throw new Error(`Failed to upload bulk operation variables with status ${res.status}:\n${await res.text()}`);
    }

    debug(`Uploading staged file %d`, index);
  }
  return data.stagedUploadsCreate;
}
