import type { ProductCreate, ProductDelete, ProductUpdate } from './products/index.js';
import type { OrderCreate, OrderDelete, OrderUpdate } from './orders/index.js';
import type {
  ReturnApprove,
  ReturnCancel,
  ReturnClose,
  ReturnDecline,
  ReturnReopen,
  ReturnRequest,
} from './returns/index.js';
import type { CustomersDataRequest, CustomersRedact, ShopRedact } from './mandatory/index.js';
import type { CustomerCreate, CustomerDelete, CustomerUpdate } from './customers/index.js';
import type { WebhookSubscriptionTopic } from '../graphql.js';

export * from './products/index.js';
export * from './orders/index.js';
export * from './returns/index.js';
export * from './mandatory/index.js';
export * from './customers/index.js';

export type Payloads = {
  CUSTOMERS_DATA_REQUEST: CustomersDataRequest;
  CUSTOMERS_REDACT: CustomersRedact;
  SHOP_REDACT: ShopRedact;
  [WebhookSubscriptionTopic.CustomersCreate]: CustomerCreate;
  [WebhookSubscriptionTopic.CustomersUpdate]: CustomerUpdate;
  [WebhookSubscriptionTopic.CustomersDelete]: CustomerDelete;
  [WebhookSubscriptionTopic.ProductsCreate]: ProductCreate;
  [WebhookSubscriptionTopic.ProductsUpdate]: ProductUpdate;
  [WebhookSubscriptionTopic.ProductsDelete]: ProductDelete;
  [WebhookSubscriptionTopic.OrdersCreate]: OrderCreate;
  [WebhookSubscriptionTopic.OrdersUpdated]: OrderUpdate;
  [WebhookSubscriptionTopic.OrdersDelete]: OrderDelete;
  [WebhookSubscriptionTopic.ReturnsApprove]: ReturnApprove;
  [WebhookSubscriptionTopic.ReturnsCancel]: ReturnCancel;
  [WebhookSubscriptionTopic.ReturnsClose]: ReturnClose;
  [WebhookSubscriptionTopic.ReturnsDecline]: ReturnDecline;
  [WebhookSubscriptionTopic.ReturnsReopen]: ReturnReopen;
  [WebhookSubscriptionTopic.ReturnsRequest]: ReturnRequest;
};

export type Topics = WebhookSubscriptionTopic | keyof Payloads;

export type Payload<Topic extends Topics> = Topic extends keyof Payloads ? Payloads[Topic] : unknown;
