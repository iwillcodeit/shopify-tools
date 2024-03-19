import type { ProductCreate, ProductDelete, ProductUpdate } from './products';
import type { OrderCreate, OrderDelete, OrderUpdate, OrderEdit } from './orders';
import type { ReturnApprove, ReturnCancel, ReturnClose, ReturnDecline, ReturnReopen, ReturnRequest } from './returns';
import type { CustomersDataRequest, CustomersRedact, ShopRedact } from './mandatory';
import type { CustomerCreate, CustomerDelete, CustomerUpdate } from './customers';
import { WebhookSubscriptionTopic } from '../topics';
import { BulkOperationFinish } from './bulk';

export * from './products';
export * from './orders';
export * from './returns';
export * from './mandatory';
export * from './customers';
export * from './bulk';

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
  [WebhookSubscriptionTopic.OrdersEdited]: OrderEdit;
  [WebhookSubscriptionTopic.OrdersDelete]: OrderDelete;
  [WebhookSubscriptionTopic.ReturnsApprove]: ReturnApprove;
  [WebhookSubscriptionTopic.ReturnsCancel]: ReturnCancel;
  [WebhookSubscriptionTopic.ReturnsClose]: ReturnClose;
  [WebhookSubscriptionTopic.ReturnsDecline]: ReturnDecline;
  [WebhookSubscriptionTopic.ReturnsReopen]: ReturnReopen;
  [WebhookSubscriptionTopic.ReturnsRequest]: ReturnRequest;
  [WebhookSubscriptionTopic.BulkOperationsFinish]: BulkOperationFinish;
};

export type Topics = WebhookSubscriptionTopic | keyof Payloads;

export type Payload<Topic extends Topics> = Topic extends keyof Payloads ? Payloads[Topic] : unknown;
