import type { WebhookHandler, WebhookHandlersParam, Topics } from '../types/index.js';
import type { WebhookHandler as BaseWebhookHandler } from '@shopify/shopify-api';
import { DeliveryMethod } from '@shopify/shopify-api';

function wrapHandler<T extends Topics>(handler: WebhookHandler<T>): BaseWebhookHandler {
  if (handler.deliveryMethod !== DeliveryMethod.Http) {
    return handler;
  }

  if (!('callback' in handler)) {
    return handler;
  }

  const { callback, ...config } = handler;

  return {
    ...config,
    callback: (topic: string, shop: string, body: string, webhookId: string, apiVersion?: string) => {
      return callback(topic as T, shop as `${string}.myshopify.com`, JSON.parse(body), webhookId, apiVersion);
    },
  };
}

export function webhooks(params: WebhookHandlersParam): import('@shopify/shopify-app-express').WebhookHandlersParam {
  return Object.entries(params).reduce((acc, [key, handler]) => {
    if (handler) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[key] = Array.isArray(handler) ? handler.map(wrapHandler) : wrapHandler(handler);
    }

    return acc;
  }, {});
}
