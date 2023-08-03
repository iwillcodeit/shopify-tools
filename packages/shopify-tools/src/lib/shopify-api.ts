import { AdminApiClient } from './AdminApiClient.js';
import type { Session } from '@shopify/shopify-api';

export async function getClient(session: Session) {
  const { LATEST_API_VERSION } = await import('@shopify/shopify-api');

  if (!session.accessToken) {
    throw new Error('No access token');
  }

  return new AdminApiClient({
    storeDomain: `https://${session.shop}`,
    adminApiSecret: session.accessToken,
    adminApiVersion: LATEST_API_VERSION,
    cache: typeof caches !== 'undefined' ? await caches.open(session.shop) : undefined,
  });
}
