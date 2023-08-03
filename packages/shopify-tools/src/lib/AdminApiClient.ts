/**
 * This is a copy of Hydrogen's createStorefront but for the admin api.
 *
 * @link https://github.com/Shopify/hydrogen/blob/2023-04/packages/hydrogen/src/storefront.ts
 */

import { AdminApiResponse } from '../types/api.js';
import { checkGraphQLErrors, fetchWithServerCache } from '../utils/fetch/index.js';
import { parseJSON } from '../utils/fetch/parse-json.js';
import {
  CacheNone,
  CacheLong,
  CacheShort,
  CacheCustom,
  generateCacheControlHeader,
  type CachingStrategy,
} from '../utils/fetch/strategies.js';
import { warnOnce } from '../utils/fetch/warning.js';

interface AdminApiClientOptions {
  storeDomain: string;
  adminApiVersion: string;
  adminApiSecret: string;
}

interface AdminApiOptions extends AdminApiClientOptions {
  /** An instance that implements the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) */
  cache?: Cache;
}

type AdminFetchOptions = {
  headers?: HeadersInit;
  adminApiVersion?: string;
};

type AdminQueryPayloadOptions<V> = AdminFetchOptions & {
  cache?: CachingStrategy;
  variables?: V;
};

type AdminMutationPayloadOptions<V> = AdminFetchOptions & {
  variables?: V;
};

type AdminQueryOptions<V> = AdminQueryPayloadOptions<V> & {
  query: string;
  mutation?: never;
};

type AdminMutationOptions<V> = AdminMutationPayloadOptions<V> & {
  query?: never;
  mutation: string;
  cache?: never;
};

const AdminApiError = class extends Error {} as ErrorConstructor;
export const isAdminApiError = (error: any) => error instanceof AdminApiError;

const isQueryRE = /(^|}\s)query[\s({]/im;
const isMutationRE = /(^|}\s)mutation[\s({]/im;

function minifyQuery(string: string) {
  return string
    .replace(/\s*#.*$/gm, '') // Remove GQL comments
    .replace(/\s+/gm, ' ') // Minify spaces
    .trim();
}

export class AdminApiClient {
  private clientOptions: AdminApiClientOptions;
  public cache: Cache | undefined;

  private defaultHeaders: HeadersInit;

  public CacheNone = CacheNone;
  public CacheLong = CacheLong;
  public CacheShort = CacheShort;
  public CacheCustom = CacheCustom;
  public generateCacheControlHeader = generateCacheControlHeader;
  public isApiError = isAdminApiError;

  constructor(options: AdminApiOptions) {
    const { cache, ...clientOptions } = options;
    if (!cache) {
      // TODO: should only warn in development
      warnOnce('Admin API client created without a cache instance. This may slow down your sub-requests.');
    }

    this.clientOptions = clientOptions;
    this.cache = cache;

    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': this.clientOptions.adminApiSecret,
    };
  }

  private getAdminApiUrl(override?: { storeDomain?: string; adminApiVersion?: string }) {
    return `${override?.storeDomain ?? this.clientOptions.storeDomain}/admin/api/${
      override?.adminApiVersion ?? this.clientOptions.adminApiVersion
    }/graphql.json`;
  }

  private async fetchAdminApi<T = unknown, V = Record<string, any>>({
    query,
    mutation,
    variables,
    cache: cacheOptions,
    headers = [],
    adminApiVersion,
  }: AdminQueryOptions<V> | AdminMutationOptions<V>) {
    const userHeaders =
      headers instanceof Headers
        ? //@ts-ignore
          Object.fromEntries(headers.entries())
        : Array.isArray(headers)
        ? Object.fromEntries(headers)
        : headers;

    const queryString = query ?? mutation;

    const queryVariables = { ...variables };

    const url = this.getAdminApiUrl({ adminApiVersion });
    const requestInit: RequestInit = {
      method: 'POST',
      headers: { ...this.defaultHeaders, ...userHeaders },
      body: JSON.stringify({
        query: queryString,
        variables: queryVariables,
      }),
    };

    const [body, response] = await fetchWithServerCache(url, requestInit, {
      cacheInstance: mutation ? undefined : this.cache,
      cache: cacheOptions || CacheShort(),
      shouldCacheResponse: checkGraphQLErrors,
    });

    if (!response.ok) {
      /**
       * The Admin API might return a string error, or a JSON-formatted {error: string}.
       * We try both and conform them to a single {errors} format.
       */
      let errors;
      try {
        errors = parseJSON(body);
      } catch (_e) {
        errors = [{ message: body }];
      }

      throwError(response, errors);
    }

    //@ts-expect-error TODO: Fix this type
    const { data, errors } = body as AdminApiResponse<T>;

    if (errors?.length) throwError(response, errors, AdminApiError);

    return data as T;
  }

  public async query<T = unknown, V = Record<string, any>>(payload: AdminQueryOptions<V>): Promise<T>;
  public async query<T = unknown, V = Record<string, any>>(
    query: string,
    payload?: AdminQueryPayloadOptions<V>
  ): Promise<T>;
  public async query<T = unknown, V = Record<string, any>>(
    ...args: [queryOrPayload: string | AdminQueryOptions<V>, payloadOptions?: AdminQueryPayloadOptions<V>]
  ): Promise<T> {
    let payload: AdminQueryOptions<V>;

    if (typeof args[0] === 'string') {
      payload = { query: args[0], ...(args[1] ?? {}) };
    } else {
      payload = args[0];
    }

    payload.query = minifyQuery(payload.query);

    if (isMutationRE.test(payload.query)) throw new Error('admin.query cannot execute mutations');

    return this.fetchAdminApi<T, V>(payload);
  }

  public async mutate<T = unknown, V = Record<string, any>>(payload: AdminMutationOptions<V>): Promise<T>;
  public async mutate<T = unknown, V = Record<string, any>>(
    mutation: string,
    payload?: AdminMutationPayloadOptions<V>
  ): Promise<T>;
  public async mutate<T = unknown, V = Record<string, any>>(
    ...args: [queryOrPayload: string | AdminMutationOptions<V>, payloadOptions?: AdminMutationPayloadOptions<V>]
  ): Promise<T> {
    let payload: AdminMutationOptions<V>;

    if (typeof args[0] === 'string') {
      payload = { mutation: args[0], ...(args[1] ?? {}) };
    } else {
      payload = args[0];
    }

    payload.mutation = minifyQuery(payload.mutation);

    if (isQueryRE.test(payload.mutation)) throw new Error('admin.mutate cannot execute mutations');

    return this.fetchAdminApi<T, V>(payload);
  }
}

function throwError<T>(
  response: Response,
  // @ts-expect-error TODO: Fix type
  errors: AdminApiResponse<T>['errors'],
  ErrorConstructor = Error
) {
  const reqId = response.headers.get('x-request-id');
  const reqIdMessage = reqId ? ` - Request ID: ${reqId}` : '';

  if (errors) {
    const errorMessages =
      typeof errors === 'string'
        ? errors
        : // @ts-expect-error TODO: Fix type
          errors.map((error) => error.message).join('\n');

    throw new ErrorConstructor(errorMessages + reqIdMessage);
  }

  throw new ErrorConstructor(`API response error: ${response.status}` + reqIdMessage);
}
