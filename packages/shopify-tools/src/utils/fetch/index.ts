import { hashKey } from './hash.js';
import { CacheShort, CachingStrategy, NO_STORE } from './strategies.js';
import { getItemFromCache, setItemInCache, isStale } from './sub-request.js';

/**
 * The cache key is used to uniquely identify a value in the cache.
 */
export type CacheKey = string | readonly unknown[];

export type WithCacheOptions<T = unknown> = {
  strategy?: CachingStrategy | null;
  cacheInstance?: Cache;
  shouldCacheResult?: (value: T) => boolean;
};

export type FetchCacheOptions = {
  cache?: CachingStrategy;
  cacheInstance?: Cache;
  cacheKey?: CacheKey;
  shouldCacheResponse?: (body: any, response: Response) => boolean;
  returnType?: 'json' | 'text' | 'arrayBuffer' | 'blob';
};

function toSerializableResponse(body: any, response: Response) {
  return [
    body,
    {
      status: response.status,
      statusText: response.statusText,
      //@ts-ignore
      headers: Array.from(response.headers.entries()) as HeadersInit,
    },
  ] satisfies [any, ResponseInit];
}

function fromSerializableResponse([body, init]: [any, ResponseInit]) {
  return [body, new Response(body, init)] as const;
}

// Check if the response body has GraphQL errors
// https://spec.graphql.org/June2018/#sec-Response-Format
export const checkGraphQLErrors = (body: any) => !body?.errors;

// Lock to prevent revalidating the same sub-request
// in the same isolate. Note that different isolates
// in the same colo could duplicate the revalidation
// since this is only an in-memory lock.
// https://github.com/Shopify/oxygen-platform/issues/625
const swrLock = new Set<string>();

export async function runWithCache<T = unknown>(
  cacheKey: CacheKey,
  actionFn: () => T | Promise<T>,
  {
    strategy = CacheShort(),
    cacheInstance,
    shouldCacheResult = () => true,
  }: WithCacheOptions<T>
): Promise<T> {
  if (!cacheInstance || !strategy || strategy.mode === NO_STORE) {
    return actionFn();
  }

  const key = hashKey([
    // '__HYDROGEN_CACHE_ID__', // TODO purgeQueryCacheOnBuild
    ...(typeof cacheKey === 'string' ? [cacheKey] : cacheKey),
  ]);

  const cachedItem = await getItemFromCache(cacheInstance, key);
  // console.log('--- Cache', cachedItem ? 'HIT' : 'MISS');

  if (cachedItem) {
    const [cachedResult, cacheInfo] = cachedItem;

    if (!swrLock.has(key) && isStale(key, cacheInfo)) {
      swrLock.add(key);

      // Important: Run revalidation asynchronously.
      Promise.resolve().then(async () => {
        try {
          const result = await actionFn();

          if (shouldCacheResult(result)) {
            await setItemInCache(cacheInstance, key, result, strategy);
          }
        } catch (error: any) {
          if (error.message) {
            error.message = 'SWR in sub-request failed: ' + error.message;
          }

          console.error(error);
        } finally {
          swrLock.delete(key);
        }
      });
    }

    return cachedResult;
  }

  const result = await actionFn();

  /**
   * Important: Do this async
   */
  if (shouldCacheResult(result)) {
    setItemInCache(cacheInstance, key, result, strategy);
  }

  return result;
}

/**
 * `fetch` equivalent that stores responses in cache.
 * Useful for calling third-party APIs that need to be cached.
 * @private
 */
export async function fetchWithServerCache(
  url: string,
  requestInit: Request | RequestInit,
  {
    cacheInstance,
    cache: cacheOptions,
    cacheKey = [url, requestInit],
    shouldCacheResponse = () => true,
    returnType = 'json',
  }: FetchCacheOptions = {}
): Promise<readonly [any, Response]> {
  if (!cacheOptions && (!requestInit.method || requestInit.method === 'GET')) {
    cacheOptions = CacheShort();
  }

  return runWithCache(
    cacheKey,
    async () => {
      const response = await fetch(url, requestInit);
      let data;

      try {
        data = await response[returnType]();
      } catch {
        data = await response.text();
      }

      return toSerializableResponse(data, response);
    },
    {
      cacheInstance,
      strategy: cacheOptions ?? null,
      shouldCacheResult: (result) =>
        shouldCacheResponse(...fromSerializableResponse(result)),
    }
  ).then(fromSerializableResponse);
}
