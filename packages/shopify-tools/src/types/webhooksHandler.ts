import { DeliveryMethod } from '@shopify/shopify-api';
import { Payload, Topics } from './webhooks/index.js';

export declare type WebhookHandlerFunction<T extends Topics> = (
  topic: T,
  shop_domain: `${string}.myshopify.com`,
  payload: Payload<T>,
  webhookId: string,
  apiVersion?: string
) => Promise<void>;
interface BaseWebhookHandler<T extends Topics> {
  id?: string;
  includeFields?: string[];
  metafieldNamespaces?: string[];
}
export interface HttpWebhookHandler<T extends Topics> extends BaseWebhookHandler<T> {
  deliveryMethod: DeliveryMethod.Http;
  privateMetafieldNamespaces?: string[];
  callbackUrl: string;
}
export interface HttpWebhookHandlerWithCallback<T extends Topics> extends HttpWebhookHandler<T> {
  callback: WebhookHandlerFunction<T>;
}
export interface EventBridgeWebhookHandler<T extends Topics> extends BaseWebhookHandler<T> {
  deliveryMethod: DeliveryMethod.EventBridge;
  arn: string;
}
export interface PubSubWebhookHandler<T extends Topics> extends BaseWebhookHandler<T> {
  deliveryMethod: DeliveryMethod.PubSub;
  pubSubProject: string;
  pubSubTopic: string;
}
export declare type WebhookHandler<T extends Topics> =
  | HttpWebhookHandler<T>
  | HttpWebhookHandlerWithCallback<T>
  | EventBridgeWebhookHandler<T>
  | PubSubWebhookHandler<T>;

export type WebhookHandlersParam = {
  [Topic in Topics]?: WebhookHandler<Topic> | WebhookHandler<Topic>[];
};
