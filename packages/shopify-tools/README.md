# Shopify tools

This library adds a variety of utilities to simpliy usage of some shopify APIs.

## Features

### Admin GraphQL API client

Shopify tools can replace the @shopify/shopify-api default graphql client. The client is basically a port of the hydrogen's storefront client, but for the admin api. It offers more flexibility and add the possibility to use a cache, if available.

**You can create a new client like this:**

```typescript
import { AdminApiClient } from '@iwci/shopify-tools';
import { LATEST_API_VERSION } from '@shopify/shopify-api';

const client = AdminApiClient({
  storeDomain: `https://exampleshop.myshopify.com`,
  adminApiSecret: "admin api access token",
  adminApiVersion: LATEST_API_VERSION,
  cache: typeof caches !== 'undefined' ? await caches.open(session.shop) : undefined,
});
}
```

**Caching**:

If you are running in an environment that supports cache (like Cloudflare Workers), are really want to cache (using some K/V storage), you can use a cache like this:

```typescript
const cache = typeof caches !== 'undefined' ? await caches.open(session.shop) : undefined;

const client = AdminApiClient({
  // ...
  cache,
});
}
```

**Using `@shopify/shopify-api` Session:**

If you already have a session from `@shopify/shopify-api` you can easily create a client using the `getClient()` function.

```typescript
const client = await getClient(session)
```

### Bulk operations

### Query batching

### Webhook wrapper
