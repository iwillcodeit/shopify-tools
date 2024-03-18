/**
 * The supported topics for webhook subscriptions. You can use webhook subscriptions to receive
 * notifications about particular events in a shop.
 *
 * You don't create webhook subscriptions to
 * [mandatory webhooks](https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks).
 * Instead, you configure mandatory webhooks in your Partner Dashboard as part of your app setup.
 *
 */
export enum WebhookSubscriptionTopic {
  /** The webhook topic for `app_purchases_one_time/update` events. Occurs whenever a one-time app charge is updated. */
  AppPurchasesOneTimeUpdate = 'APP_PURCHASES_ONE_TIME_UPDATE',
  /** The webhook topic for `app_subscriptions/approaching_capped_amount` events. Occurs when the balance used on an app subscription crosses 90% of the capped amount. */
  AppSubscriptionsApproachingCappedAmount = 'APP_SUBSCRIPTIONS_APPROACHING_CAPPED_AMOUNT',
  /** The webhook topic for `app_subscriptions/update` events. Occurs whenever an app subscription is updated. */
  AppSubscriptionsUpdate = 'APP_SUBSCRIPTIONS_UPDATE',
  /** The webhook topic for `app/uninstalled` events. Occurs whenever a shop has uninstalled the app. */
  AppUninstalled = 'APP_UNINSTALLED',
  /** The webhook topic for `attributed_sessions/first` events. Occurs whenever an order with a "first" attributed session is attributed. Requires the `read_marketing_events` scope. */
  AttributedSessionsFirst = 'ATTRIBUTED_SESSIONS_FIRST',
  /** The webhook topic for `attributed_sessions/last` events. Occurs whenever an order with a "last" attributed session is attributed. Requires the `read_marketing_events` scope. */
  AttributedSessionsLast = 'ATTRIBUTED_SESSIONS_LAST',
  /** The webhook topic for `audit_events/admin_api_activity` events. Triggers for each auditable Admin API request. This topic is limited to one active subscription per Plus store and requires the use of Google Cloud Pub/Sub or AWS EventBridge. Requires the `read_audit_events` scope. */
  AuditEventsAdminApiActivity = 'AUDIT_EVENTS_ADMIN_API_ACTIVITY',
  /** The webhook topic for `bulk_operations/finish` events. Notifies when a Bulk Operation finishes. */
  BulkOperationsFinish = 'BULK_OPERATIONS_FINISH',
  /** The webhook topic for `carts/create` events. Occurs when a cart is created in the online store. Other types of carts aren't supported. For example, the webhook doesn't support carts that are created in a custom storefront. Requires the `read_orders` scope. */
  CartsCreate = 'CARTS_CREATE',
  /** The webhook topic for `carts/update` events. Occurs when a cart is updated in the online store. Other types of carts aren't supported. For example, the webhook doesn't support carts that are updated in a custom storefront. Requires the `read_orders` scope. */
  CartsUpdate = 'CARTS_UPDATE',
  /** The webhook topic for `channels/delete` events. Occurs whenever a channel is deleted. Requires the `read_publications` scope. */
  ChannelsDelete = 'CHANNELS_DELETE',
  /** The webhook topic for `checkouts/create` events. Occurs whenever a checkout is created. Requires the `read_orders` scope. */
  CheckoutsCreate = 'CHECKOUTS_CREATE',
  /** The webhook topic for `checkouts/delete` events. Occurs whenever a checkout is deleted. Requires the `read_orders` scope. */
  CheckoutsDelete = 'CHECKOUTS_DELETE',
  /** The webhook topic for `checkouts/update` events. Occurs whenever a checkout is updated. Requires the `read_orders` scope. */
  CheckoutsUpdate = 'CHECKOUTS_UPDATE',
  /** The webhook topic for `collections/create` events. Occurs whenever a collection is created. Requires the `read_products` scope. */
  CollectionsCreate = 'COLLECTIONS_CREATE',
  /** The webhook topic for `collections/delete` events. Occurs whenever a collection is deleted. Requires the `read_products` scope. */
  CollectionsDelete = 'COLLECTIONS_DELETE',
  /** The webhook topic for `collections/update` events. Occurs whenever a collection is updated, including whenever products are added or removed from the collection. Occurs once if multiple products are added or removed from a collection at the same time. Requires the `read_products` scope. */
  CollectionsUpdate = 'COLLECTIONS_UPDATE',
  /** The webhook topic for `collection_listings/add` events. Occurs whenever a collection listing is added. Requires the `read_product_listings` scope. */
  CollectionListingsAdd = 'COLLECTION_LISTINGS_ADD',
  /** The webhook topic for `collection_listings/remove` events. Occurs whenever a collection listing is removed. Requires the `read_product_listings` scope. */
  CollectionListingsRemove = 'COLLECTION_LISTINGS_REMOVE',
  /** The webhook topic for `collection_listings/update` events. Occurs whenever a collection listing is updated. Requires the `read_product_listings` scope. */
  CollectionListingsUpdate = 'COLLECTION_LISTINGS_UPDATE',
  /** The webhook topic for `collection_publications/create` events. Occurs whenever a collection publication listing is created. Requires the `read_publications` scope. */
  CollectionPublicationsCreate = 'COLLECTION_PUBLICATIONS_CREATE',
  /** The webhook topic for `collection_publications/delete` events. Occurs whenever a collection publication listing is deleted. Requires the `read_publications` scope. */
  CollectionPublicationsDelete = 'COLLECTION_PUBLICATIONS_DELETE',
  /** The webhook topic for `collection_publications/update` events. Occurs whenever a collection publication listing is updated. Requires the `read_publications` scope. */
  CollectionPublicationsUpdate = 'COLLECTION_PUBLICATIONS_UPDATE',
  /** The webhook topic for `companies/create` events. Occurs whenever a company is created. Requires the `read_customers` scope. */
  CompaniesCreate = 'COMPANIES_CREATE',
  /** The webhook topic for `companies/delete` events. Occurs whenever a company is deleted. Requires the `read_customers` scope. */
  CompaniesDelete = 'COMPANIES_DELETE',
  /** The webhook topic for `companies/update` events. Occurs whenever a company is updated. Requires the `read_customers` scope. */
  CompaniesUpdate = 'COMPANIES_UPDATE',
  /** The webhook topic for `company_contacts/create` events. Occurs whenever a company contact is created. Requires the `read_customers` scope. */
  CompanyContactsCreate = 'COMPANY_CONTACTS_CREATE',
  /** The webhook topic for `company_contacts/delete` events. Occurs whenever a company contact is deleted. Requires the `read_customers` scope. */
  CompanyContactsDelete = 'COMPANY_CONTACTS_DELETE',
  /** The webhook topic for `company_contacts/update` events. Occurs whenever a company contact is updated. Requires the `read_customers` scope. */
  CompanyContactsUpdate = 'COMPANY_CONTACTS_UPDATE',
  /** The webhook topic for `company_contact_roles/assign` events. Occurs whenever a role is assigned to a contact at a location. Requires the `read_customers` scope. */
  CompanyContactRolesAssign = 'COMPANY_CONTACT_ROLES_ASSIGN',
  /** The webhook topic for `company_contact_roles/revoke` events. Occurs whenever a role is revoked from a contact at a location. Requires the `read_customers` scope. */
  CompanyContactRolesRevoke = 'COMPANY_CONTACT_ROLES_REVOKE',
  /** The webhook topic for `company_locations/create` events. Occurs whenever a company location is created. Requires the `read_customers` scope. */
  CompanyLocationsCreate = 'COMPANY_LOCATIONS_CREATE',
  /** The webhook topic for `company_locations/delete` events. Occurs whenever a company location is deleted. Requires the `read_customers` scope. */
  CompanyLocationsDelete = 'COMPANY_LOCATIONS_DELETE',
  /** The webhook topic for `company_locations/update` events. Occurs whenever a company location is updated. Requires the `read_customers` scope. */
  CompanyLocationsUpdate = 'COMPANY_LOCATIONS_UPDATE',
  /** The webhook topic for `customers/create` events. Occurs whenever a customer is created. Requires the `read_customers` scope. */
  CustomersCreate = 'CUSTOMERS_CREATE',
  /** The webhook topic for `customers/delete` events. Occurs whenever a customer is deleted. Requires the `read_customers` scope. */
  CustomersDelete = 'CUSTOMERS_DELETE',
  /** The webhook topic for `customers/disable` events. Occurs whenever a customer account is disabled. Requires the `read_customers` scope. */
  CustomersDisable = 'CUSTOMERS_DISABLE',
  /** The webhook topic for `customers_email_marketing_consent/update` events. Occurs whenever a customer's email marketing consent is updated. Requires the `read_customers` scope. */
  CustomersEmailMarketingConsentUpdate = 'CUSTOMERS_EMAIL_MARKETING_CONSENT_UPDATE',
  /** The webhook topic for `customers/enable` events. Occurs whenever a customer account is enabled. Requires the `read_customers` scope. */
  CustomersEnable = 'CUSTOMERS_ENABLE',
  /** The webhook topic for `customers_marketing_consent/update` events. Occurs whenever a customer's SMS marketing consent is updated. Requires the `read_customers` scope. */
  CustomersMarketingConsentUpdate = 'CUSTOMERS_MARKETING_CONSENT_UPDATE',
  /** The webhook topic for `customers/merge` events. Triggers when two customers are merged Requires the `read_customer_merge` scope. */
  CustomersMerge = 'CUSTOMERS_MERGE',
  /** The webhook topic for `customers/update` events. Occurs whenever a customer is updated. Requires the `read_customers` scope. */
  CustomersUpdate = 'CUSTOMERS_UPDATE',
  /** The webhook topic for `customer_groups/create` events. Occurs whenever a customer saved search is created. Requires the `read_customers` scope. */
  CustomerGroupsCreate = 'CUSTOMER_GROUPS_CREATE',
  /** The webhook topic for `customer_groups/delete` events. Occurs whenever a customer saved search is deleted. Requires the `read_customers` scope. */
  CustomerGroupsDelete = 'CUSTOMER_GROUPS_DELETE',
  /** The webhook topic for `customer_groups/update` events. Occurs whenever a customer saved search is updated. Requires the `read_customers` scope. */
  CustomerGroupsUpdate = 'CUSTOMER_GROUPS_UPDATE',
  /** The webhook topic for `customer_payment_methods/create` events. Occurs whenever a customer payment method is created. Requires the `read_customer_payment_methods` scope. */
  CustomerPaymentMethodsCreate = 'CUSTOMER_PAYMENT_METHODS_CREATE',
  /** The webhook topic for `customer_payment_methods/revoke` events. Occurs whenever a customer payment method is revoked. Requires the `read_customer_payment_methods` scope. */
  CustomerPaymentMethodsRevoke = 'CUSTOMER_PAYMENT_METHODS_REVOKE',
  /** The webhook topic for `customer_payment_methods/update` events. Occurs whenever a customer payment method is updated. Requires the `read_customer_payment_methods` scope. */
  CustomerPaymentMethodsUpdate = 'CUSTOMER_PAYMENT_METHODS_UPDATE',
  /** The webhook topic for `customer.tags_added` events. Triggers when tags are added to a customer. Requires the `read_customers` scope. */
  CustomerTagsAdded = 'CUSTOMER_TAGS_ADDED',
  /** The webhook topic for `customer.tags_removed` events. Triggers when tags are removed from a customer. Requires the `read_customers` scope. */
  CustomerTagsRemoved = 'CUSTOMER_TAGS_REMOVED',
  /** The webhook topic for `disputes/create` events. Occurs whenever a dispute is created. Requires the `read_shopify_payments_disputes` scope. */
  DisputesCreate = 'DISPUTES_CREATE',
  /** The webhook topic for `disputes/update` events. Occurs whenever a dispute is updated. Requires the `read_shopify_payments_disputes` scope. */
  DisputesUpdate = 'DISPUTES_UPDATE',
  /** The webhook topic for `domains/create` events. Occurs whenever a domain is created. */
  DomainsCreate = 'DOMAINS_CREATE',
  /** The webhook topic for `domains/destroy` events. Occurs whenever a domain is destroyed. */
  DomainsDestroy = 'DOMAINS_DESTROY',
  /** The webhook topic for `domains/update` events. Occurs whenever a domain is updated. */
  DomainsUpdate = 'DOMAINS_UPDATE',
  /** The webhook topic for `draft_orders/create` events. Occurs whenever a draft order is created. Requires the `read_draft_orders` scope. */
  DraftOrdersCreate = 'DRAFT_ORDERS_CREATE',
  /** The webhook topic for `draft_orders/delete` events. Occurs whenever a draft order is deleted. Requires the `read_draft_orders` scope. */
  DraftOrdersDelete = 'DRAFT_ORDERS_DELETE',
  /** The webhook topic for `draft_orders/update` events. Occurs whenever a draft order is updated. Requires the `read_draft_orders` scope. */
  DraftOrdersUpdate = 'DRAFT_ORDERS_UPDATE',
  /** The webhook topic for `fulfillments/create` events. Occurs whenever a fulfillment is created. Requires at least one of the following scopes: read_fulfillments, read_marketplace_orders. */
  FulfillmentsCreate = 'FULFILLMENTS_CREATE',
  /** The webhook topic for `fulfillments/update` events. Occurs whenever a fulfillment is updated. Requires at least one of the following scopes: read_fulfillments, read_marketplace_orders. */
  FulfillmentsUpdate = 'FULFILLMENTS_UPDATE',
  /** The webhook topic for `fulfillment_events/create` events. Occurs whenever a fulfillment event is created. Requires the `read_fulfillments` scope. */
  FulfillmentEventsCreate = 'FULFILLMENT_EVENTS_CREATE',
  /** The webhook topic for `fulfillment_events/delete` events. Occurs whenever a fulfillment event is deleted. Requires the `read_fulfillments` scope. */
  FulfillmentEventsDelete = 'FULFILLMENT_EVENTS_DELETE',
  /** The webhook topic for `fulfillment_orders/cancellation_request_accepted` events. Occurs when a 3PL accepts a fulfillment cancellation request, received from a merchant. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersCancellationRequestAccepted = 'FULFILLMENT_ORDERS_CANCELLATION_REQUEST_ACCEPTED',
  /** The webhook topic for `fulfillment_orders/cancellation_request_rejected` events. Occurs when a 3PL rejects a fulfillment cancellation request, received from a merchant. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersCancellationRequestRejected = 'FULFILLMENT_ORDERS_CANCELLATION_REQUEST_REJECTED',
  /** The webhook topic for `fulfillment_orders/cancellation_request_submitted` events. Occurs when a merchant requests a fulfillment request to be cancelled after that request was approved by a 3PL. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersCancellationRequestSubmitted = 'FULFILLMENT_ORDERS_CANCELLATION_REQUEST_SUBMITTED',
  /** The webhook topic for `fulfillment_orders/cancelled` events. Occurs when a fulfillment order is cancelled. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersCancelled = 'FULFILLMENT_ORDERS_CANCELLED',
  /** The webhook topic for `fulfillment_orders/fulfillment_request_accepted` events. Occurs when a fulfillment service accepts a request to fulfill a fulfillment order. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersFulfillmentRequestAccepted = 'FULFILLMENT_ORDERS_FULFILLMENT_REQUEST_ACCEPTED',
  /** The webhook topic for `fulfillment_orders/fulfillment_request_rejected` events. Occurs when a 3PL rejects a fulfillment request that was sent by a merchant. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersFulfillmentRequestRejected = 'FULFILLMENT_ORDERS_FULFILLMENT_REQUEST_REJECTED',
  /** The webhook topic for `fulfillment_orders/fulfillment_request_submitted` events. Occurs when a merchant submits a fulfillment request to a 3PL. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders, read_buyer_membership_orders. */
  FulfillmentOrdersFulfillmentRequestSubmitted = 'FULFILLMENT_ORDERS_FULFILLMENT_REQUEST_SUBMITTED',
  /** The webhook topic for `fulfillment_orders/fulfillment_service_failed_to_complete` events. Occurs when a fulfillment service intends to close an in_progress fulfillment order. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersFulfillmentServiceFailedToComplete = 'FULFILLMENT_ORDERS_FULFILLMENT_SERVICE_FAILED_TO_COMPLETE',
  /** The webhook topic for `fulfillment_orders/hold_released` events. Occurs whenever a fulfillment order hold is released. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersHoldReleased = 'FULFILLMENT_ORDERS_HOLD_RELEASED',
  /** The webhook topic for `fulfillment_orders/line_items_prepared_for_local_delivery` events. Occurs whenever a fulfillment order's line items are prepared for local delivery. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersLineItemsPreparedForLocalDelivery = 'FULFILLMENT_ORDERS_LINE_ITEMS_PREPARED_FOR_LOCAL_DELIVERY',
  /** The webhook topic for `fulfillment_orders/line_items_prepared_for_pickup` events. Triggers when one or more of the line items for a fulfillment order are prepared for pickup Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersLineItemsPreparedForPickup = 'FULFILLMENT_ORDERS_LINE_ITEMS_PREPARED_FOR_PICKUP',
  /**
   * The webhook topic for `fulfillment_orders/moved` events. Occurs whenever the location which is assigned to fulfill one or more fulfillment order line items is changed.
   *
   * * `original_fulfillment_order` - The final state of the original fulfillment order.
   * * `moved_fulfillment_order` - The fulfillment order which now contains the re-assigned line items.
   * * `source_location` - The original location which was assigned to fulfill the line items (available as of the `2023-04` API version).
   * * `destination_location_id` - The ID of the location which is now responsible for fulfilling the line items.
   *
   * **Note:** The [assignedLocation](https://shopify.dev/docs/api/admin-graphql/latest/objects/fulfillmentorder#field-fulfillmentorder-assignedlocation)
   * of the `original_fulfillment_order` might be changed by the move operation.
   * If you need to determine the originally assigned location, then you should refer to the `source_location`.
   *
   * [Learn more about moving line items](https://shopify.dev/docs/api/admin-graphql/latest/mutations/fulfillmentOrderMove).
   *  Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders.
   */
  FulfillmentOrdersMoved = 'FULFILLMENT_ORDERS_MOVED',
  /** The webhook topic for `fulfillment_orders/order_routing_complete` events. Occurs when an order has finished being routed and it's fulfillment orders assigned to a fulfillment service's location. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders, read_buyer_membership_orders. */
  FulfillmentOrdersOrderRoutingComplete = 'FULFILLMENT_ORDERS_ORDER_ROUTING_COMPLETE',
  /** The webhook topic for `fulfillment_orders/placed_on_hold` events. Occurs when a fulfillment order is placed on hold. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersPlacedOnHold = 'FULFILLMENT_ORDERS_PLACED_ON_HOLD',
  /**
   * The webhook topic for `fulfillment_orders/rescheduled` events. Triggers when a fulfillment order is rescheduled.
   *
   * Fulfillment orders may be merged if they have the same `fulfillAt` datetime.
   * If the fulfillment order is merged then the resulting fulfillment order will be indicated in the webhook body.
   * Otherwise it will be the original fulfillment order with an updated `fulfill_at` datetime.
   *  Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders.
   */
  FulfillmentOrdersRescheduled = 'FULFILLMENT_ORDERS_RESCHEDULED',
  /** The webhook topic for `fulfillment_orders/scheduled_fulfillment_order_ready` events. Occurs whenever a fulfillment order which was scheduled becomes due. Requires at least one of the following scopes: read_merchant_managed_fulfillment_orders, read_assigned_fulfillment_orders, read_third_party_fulfillment_orders. */
  FulfillmentOrdersScheduledFulfillmentOrderReady = 'FULFILLMENT_ORDERS_SCHEDULED_FULFILLMENT_ORDER_READY',
  /** The webhook topic for `inventory_items/create` events. Occurs whenever an inventory item is created. Requires the `read_inventory` scope. */
  InventoryItemsCreate = 'INVENTORY_ITEMS_CREATE',
  /** The webhook topic for `inventory_items/delete` events. Occurs whenever an inventory item is deleted. Requires the `read_inventory` scope. */
  InventoryItemsDelete = 'INVENTORY_ITEMS_DELETE',
  /** The webhook topic for `inventory_items/update` events. Occurs whenever an inventory item is updated. Requires the `read_inventory` scope. */
  InventoryItemsUpdate = 'INVENTORY_ITEMS_UPDATE',
  /** The webhook topic for `inventory_levels/connect` events. Occurs whenever an inventory level is connected. Requires the `read_inventory` scope. */
  InventoryLevelsConnect = 'INVENTORY_LEVELS_CONNECT',
  /** The webhook topic for `inventory_levels/disconnect` events. Occurs whenever an inventory level is disconnected. Requires the `read_inventory` scope. */
  InventoryLevelsDisconnect = 'INVENTORY_LEVELS_DISCONNECT',
  /** The webhook topic for `inventory_levels/update` events. Occurs whenever an inventory level is updated. Requires the `read_inventory` scope. */
  InventoryLevelsUpdate = 'INVENTORY_LEVELS_UPDATE',
  /** The webhook topic for `locales/create` events. Occurs whenever a shop locale is created Requires the `read_locales` scope. */
  LocalesCreate = 'LOCALES_CREATE',
  /** The webhook topic for `locales/update` events. Occurs whenever a shop locale is updated, such as published or unpublished Requires the `read_locales` scope. */
  LocalesUpdate = 'LOCALES_UPDATE',
  /** The webhook topic for `locations/activate` events. Occurs whenever a deactivated location is re-activated. Requires the `read_locations` scope. */
  LocationsActivate = 'LOCATIONS_ACTIVATE',
  /** The webhook topic for `locations/create` events. Occurs whenever a location is created. Requires the `read_locations` scope. */
  LocationsCreate = 'LOCATIONS_CREATE',
  /** The webhook topic for `locations/deactivate` events. Occurs whenever a location is deactivated. Requires the `read_locations` scope. */
  LocationsDeactivate = 'LOCATIONS_DEACTIVATE',
  /** The webhook topic for `locations/delete` events. Occurs whenever a location is deleted. Requires the `read_locations` scope. */
  LocationsDelete = 'LOCATIONS_DELETE',
  /** The webhook topic for `locations/update` events. Occurs whenever a location is updated. Requires the `read_locations` scope. */
  LocationsUpdate = 'LOCATIONS_UPDATE',
  /** The webhook topic for `markets/create` events. Occurs when a new market is created. Requires the `read_markets` scope. */
  MarketsCreate = 'MARKETS_CREATE',
  /** The webhook topic for `markets/delete` events. Occurs when a market is deleted. Requires the `read_markets` scope. */
  MarketsDelete = 'MARKETS_DELETE',
  /** The webhook topic for `markets/update` events. Occurs when a market is updated. Requires the `read_markets` scope. */
  MarketsUpdate = 'MARKETS_UPDATE',
  /** The webhook topic for `orders/cancelled` events. Occurs whenever an order is cancelled. Requires at least one of the following scopes: read_orders, read_marketplace_orders, read_buyer_membership_orders. */
  OrdersCancelled = 'ORDERS_CANCELLED',
  /** The webhook topic for `orders/create` events. Occurs whenever an order is created. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  OrdersCreate = 'ORDERS_CREATE',
  /** The webhook topic for `orders/delete` events. Occurs whenever an order is deleted. Requires the `read_orders` scope. */
  OrdersDelete = 'ORDERS_DELETE',
  /** The webhook topic for `orders/edited` events. Occurs whenever an order is edited. Requires at least one of the following scopes: read_orders, read_marketplace_orders, read_buyer_membership_orders. */
  OrdersEdited = 'ORDERS_EDITED',
  /** The webhook topic for `orders/fulfilled` events. Occurs whenever an order is fulfilled. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  OrdersFulfilled = 'ORDERS_FULFILLED',
  /** The webhook topic for `orders/paid` events. Occurs whenever an order is paid. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  OrdersPaid = 'ORDERS_PAID',
  /** The webhook topic for `orders/partially_fulfilled` events. Occurs whenever an order is partially fulfilled. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  OrdersPartiallyFulfilled = 'ORDERS_PARTIALLY_FULFILLED',
  /** The webhook topic for `orders/shopify_protect_eligibility_changed` events. Occurs whenever Shopify Protect's eligibility for an order is changed. Requires the `read_orders` scope. */
  OrdersShopifyProtectEligibilityChanged = 'ORDERS_SHOPIFY_PROTECT_ELIGIBILITY_CHANGED',
  /** The webhook topic for `orders/updated` events. Occurs whenever an order is updated. Requires at least one of the following scopes: read_orders, read_marketplace_orders, read_buyer_membership_orders. */
  OrdersUpdated = 'ORDERS_UPDATED',
  /** The webhook topic for `order_transactions/create` events. Occurs when a order transaction is created or when it's status is updated. Only occurs for transactions with a status of success, failure or error. Requires at least one of the following scopes: read_orders, read_marketplace_orders, read_buyer_membership_orders. */
  OrderTransactionsCreate = 'ORDER_TRANSACTIONS_CREATE',
  /** The webhook topic for `payment_schedules/due` events. Occurs whenever payment schedules are due. Requires the `read_payment_terms` scope. */
  PaymentSchedulesDue = 'PAYMENT_SCHEDULES_DUE',
  /** The webhook topic for `payment_terms/create` events. Occurs whenever payment terms are created. Requires the `read_payment_terms` scope. */
  PaymentTermsCreate = 'PAYMENT_TERMS_CREATE',
  /** The webhook topic for `payment_terms/delete` events. Occurs whenever payment terms are deleted. Requires the `read_payment_terms` scope. */
  PaymentTermsDelete = 'PAYMENT_TERMS_DELETE',
  /** The webhook topic for `payment_terms/update` events. Occurs whenever payment terms are updated. Requires the `read_payment_terms` scope. */
  PaymentTermsUpdate = 'PAYMENT_TERMS_UPDATE',
  /** The webhook topic for `products/create` events. Occurs whenever a product is created. Requires the `read_products` scope. */
  ProductsCreate = 'PRODUCTS_CREATE',
  /** The webhook topic for `products/delete` events. Occurs whenever a product is deleted. Requires the `read_products` scope. */
  ProductsDelete = 'PRODUCTS_DELETE',
  /** The webhook topic for `products/update` events. Occurs whenever a product is updated, or whenever a product is ordered, or whenever a variant is added, removed, or updated. Requires the `read_products` scope. */
  ProductsUpdate = 'PRODUCTS_UPDATE',
  /** The webhook topic for `product_feeds/create` events. Triggers when product feed is created Requires the `read_product_listings` scope. */
  ProductFeedsCreate = 'PRODUCT_FEEDS_CREATE',
  /** The webhook topic for `product_feeds/full_sync` events. Triggers when a full sync for a product feed is performed Requires the `read_product_listings` scope. */
  ProductFeedsFullSync = 'PRODUCT_FEEDS_FULL_SYNC',
  /** The webhook topic for `product_feeds/incremental_sync` events. Occurs whenever a product publication is created, updated or removed for a product feed Requires the `read_product_listings` scope. */
  ProductFeedsIncrementalSync = 'PRODUCT_FEEDS_INCREMENTAL_SYNC',
  /** The webhook topic for `product_feeds/update` events. Triggers when product feed is updated Requires the `read_product_listings` scope. */
  ProductFeedsUpdate = 'PRODUCT_FEEDS_UPDATE',
  /** The webhook topic for `product_listings/add` events. Occurs whenever an active product is listed on a channel. Requires the `read_product_listings` scope. */
  ProductListingsAdd = 'PRODUCT_LISTINGS_ADD',
  /** The webhook topic for `product_listings/remove` events. Occurs whenever a product listing is removed from the channel. Requires the `read_product_listings` scope. */
  ProductListingsRemove = 'PRODUCT_LISTINGS_REMOVE',
  /** The webhook topic for `product_listings/update` events. Occurs whenever a product publication is updated. Requires the `read_product_listings` scope. */
  ProductListingsUpdate = 'PRODUCT_LISTINGS_UPDATE',
  /** The webhook topic for `product_publications/create` events. Occurs whenever a product publication for an active product is created, or whenever an existing product publication is published. Requires the `read_publications` scope. */
  ProductPublicationsCreate = 'PRODUCT_PUBLICATIONS_CREATE',
  /** The webhook topic for `product_publications/delete` events. Occurs whenever a product publication for an active product is removed, or whenever an existing product publication is unpublished. Requires the `read_publications` scope. */
  ProductPublicationsDelete = 'PRODUCT_PUBLICATIONS_DELETE',
  /** The webhook topic for `product_publications/update` events. Occurs whenever a product publication is updated. Requires the `read_publications` scope. */
  ProductPublicationsUpdate = 'PRODUCT_PUBLICATIONS_UPDATE',
  /** The webhook topic for `profiles/create` events. Occurs whenever a delivery profile is created Requires at least one of the following scopes: read_shipping, read_assigned_shipping. */
  ProfilesCreate = 'PROFILES_CREATE',
  /** The webhook topic for `profiles/delete` events. Occurs whenever a delivery profile is deleted Requires at least one of the following scopes: read_shipping, read_assigned_shipping. */
  ProfilesDelete = 'PROFILES_DELETE',
  /** The webhook topic for `profiles/update` events. Occurs whenever a delivery profile is updated Requires at least one of the following scopes: read_shipping, read_assigned_shipping. */
  ProfilesUpdate = 'PROFILES_UPDATE',
  /** The webhook topic for `publications/delete` events. Occurs whenever a publication is deleted. Requires the `read_publications` scope. */
  PublicationsDelete = 'PUBLICATIONS_DELETE',
  /** The webhook topic for `refunds/create` events. Occurs whenever a new refund is created without errors on an order, independent from the movement of money. Requires at least one of the following scopes: read_orders, read_marketplace_orders, read_buyer_membership_orders. */
  RefundsCreate = 'REFUNDS_CREATE',
  /** The webhook topic for `returns/approve` events. Occurs whenever a return is approved. This means `Return.status` is `OPEN`. Requires at least one of the following scopes: read_returns, read_marketplace_returns, read_buyer_membership_orders. */
  ReturnsApprove = 'RETURNS_APPROVE',
  /** The webhook topic for `returns/cancel` events. Occurs whenever a return is canceled. Requires at least one of the following scopes: read_orders, read_marketplace_orders, read_returns, read_marketplace_returns, read_buyer_membership_orders. */
  ReturnsCancel = 'RETURNS_CANCEL',
  /** The webhook topic for `returns/close` events. Occurs whenever a return is closed. Requires at least one of the following scopes: read_orders, read_marketplace_orders, read_returns, read_marketplace_returns, read_buyer_membership_orders. */
  ReturnsClose = 'RETURNS_CLOSE',
  /** The webhook topic for `returns/decline` events. Occurs whenever a return is declined. This means `Return.status` is `DECLINED`. Requires at least one of the following scopes: read_returns, read_marketplace_returns, read_buyer_membership_orders. */
  ReturnsDecline = 'RETURNS_DECLINE',
  /** The webhook topic for `returns/reopen` events. Occurs whenever a closed return is reopened. Requires at least one of the following scopes: read_orders, read_marketplace_orders, read_returns, read_marketplace_returns, read_buyer_membership_orders. */
  ReturnsReopen = 'RETURNS_REOPEN',
  /** The webhook topic for `returns/request` events. Occurs whenever a return is requested. This means `Return.status` is `REQUESTED`. Requires at least one of the following scopes: read_returns, read_marketplace_returns, read_buyer_membership_orders. */
  ReturnsRequest = 'RETURNS_REQUEST',
  /**
   * The webhook topic for `reverse_deliveries/attach_deliverable` events. Occurs whenever a deliverable is attached to a reverse delivery.
   * This occurs when a reverse delivery is created or updated with delivery metadata.
   * Metadata includes the delivery method, label, and tracking information associated with a reverse delivery.
   *  Requires at least one of the following scopes: read_returns, read_marketplace_returns.
   */
  ReverseDeliveriesAttachDeliverable = 'REVERSE_DELIVERIES_ATTACH_DELIVERABLE',
  /**
   * The webhook topic for `reverse_fulfillment_orders/dispose` events. Occurs whenever a disposition is made on a reverse fulfillment order.
   * This includes dispositions made on reverse deliveries that are associated with the reverse fulfillment order.
   *  Requires at least one of the following scopes: read_returns, read_marketplace_returns.
   */
  ReverseFulfillmentOrdersDispose = 'REVERSE_FULFILLMENT_ORDERS_DISPOSE',
  /** The webhook topic for `scheduled_product_listings/add` events. Occurs whenever a product is scheduled to be published. Requires the `read_product_listings` scope. */
  ScheduledProductListingsAdd = 'SCHEDULED_PRODUCT_LISTINGS_ADD',
  /** The webhook topic for `scheduled_product_listings/remove` events. Occurs whenever a product is no longer scheduled to be published. Requires the `read_product_listings` scope. */
  ScheduledProductListingsRemove = 'SCHEDULED_PRODUCT_LISTINGS_REMOVE',
  /** The webhook topic for `scheduled_product_listings/update` events. Occurs whenever a product's scheduled availability date changes. Requires the `read_product_listings` scope. */
  ScheduledProductListingsUpdate = 'SCHEDULED_PRODUCT_LISTINGS_UPDATE',
  /** The webhook topic for `segments/create` events. Occurs whenever a segment is created. Requires the `read_customers` scope. */
  SegmentsCreate = 'SEGMENTS_CREATE',
  /** The webhook topic for `segments/delete` events. Occurs whenever a segment is deleted. Requires the `read_customers` scope. */
  SegmentsDelete = 'SEGMENTS_DELETE',
  /** The webhook topic for `segments/update` events. Occurs whenever a segment is updated. Requires the `read_customers` scope. */
  SegmentsUpdate = 'SEGMENTS_UPDATE',
  /** The webhook topic for `selling_plan_groups/create` events. Notifies when a SellingPlanGroup is created. Requires the `read_products` scope. */
  SellingPlanGroupsCreate = 'SELLING_PLAN_GROUPS_CREATE',
  /** The webhook topic for `selling_plan_groups/delete` events. Notifies when a SellingPlanGroup is deleted. Requires the `read_products` scope. */
  SellingPlanGroupsDelete = 'SELLING_PLAN_GROUPS_DELETE',
  /** The webhook topic for `selling_plan_groups/update` events. Notifies when a SellingPlanGroup is updated. Requires the `read_products` scope. */
  SellingPlanGroupsUpdate = 'SELLING_PLAN_GROUPS_UPDATE',
  /** The webhook topic for `shipping_addresses/create` events. Occurs whenever a shipping address is created. Requires the `read_shipping` scope. */
  ShippingAddressesCreate = 'SHIPPING_ADDRESSES_CREATE',
  /** The webhook topic for `shipping_addresses/update` events. Occurs whenever a shipping address is updated. Requires the `read_shipping` scope. */
  ShippingAddressesUpdate = 'SHIPPING_ADDRESSES_UPDATE',
  /** The webhook topic for `shop/update` events. Occurs whenever a shop is updated. */
  ShopUpdate = 'SHOP_UPDATE',
  /** The webhook topic for `subscription_billing_attempts/challenged` events. Occurs when the financial instutition challenges the subscripttion billing attempt charge as per 3D Secure. Requires the `read_own_subscription_contracts` scope. */
  SubscriptionBillingAttemptsChallenged = 'SUBSCRIPTION_BILLING_ATTEMPTS_CHALLENGED',
  /** The webhook topic for `subscription_billing_attempts/failure` events. Occurs whenever a subscription billing attempt fails. Requires the `read_own_subscription_contracts` scope. */
  SubscriptionBillingAttemptsFailure = 'SUBSCRIPTION_BILLING_ATTEMPTS_FAILURE',
  /** The webhook topic for `subscription_billing_attempts/success` events. Occurs whenever a subscription billing attempt succeeds. Requires the `read_own_subscription_contracts` scope. */
  SubscriptionBillingAttemptsSuccess = 'SUBSCRIPTION_BILLING_ATTEMPTS_SUCCESS',
  /** The webhook topic for `subscription_billing_cycle_edits/create` events. Occurs whenever a subscription contract billing cycle is edited. Requires the `read_own_subscription_contracts` scope. */
  SubscriptionBillingCycleEditsCreate = 'SUBSCRIPTION_BILLING_CYCLE_EDITS_CREATE',
  /** The webhook topic for `subscription_billing_cycle_edits/delete` events. Occurs whenever a subscription contract billing cycle edit is deleted. Requires the `read_own_subscription_contracts` scope. */
  SubscriptionBillingCycleEditsDelete = 'SUBSCRIPTION_BILLING_CYCLE_EDITS_DELETE',
  /** The webhook topic for `subscription_billing_cycle_edits/update` events. Occurs whenever a subscription contract billing cycle edit is updated. Requires the `read_own_subscription_contracts` scope. */
  SubscriptionBillingCycleEditsUpdate = 'SUBSCRIPTION_BILLING_CYCLE_EDITS_UPDATE',
  /** The webhook topic for `subscription_contracts/create` events. Occurs whenever a subscription contract is created. Requires the `read_own_subscription_contracts` scope. */
  SubscriptionContractsCreate = 'SUBSCRIPTION_CONTRACTS_CREATE',
  /** The webhook topic for `subscription_contracts/update` events. Occurs whenever a subscription contract is updated. Requires the `read_own_subscription_contracts` scope. */
  SubscriptionContractsUpdate = 'SUBSCRIPTION_CONTRACTS_UPDATE',
  /** The webhook topic for `tax_partners/update` events. Occurs whenever a tax partner is created or updated. Requires the `read_taxes` scope. */
  TaxPartnersUpdate = 'TAX_PARTNERS_UPDATE',
  /** The webhook topic for `tax_services/create` events. Occurs whenever a tax service is created. Requires the `read_taxes` scope. */
  TaxServicesCreate = 'TAX_SERVICES_CREATE',
  /** The webhook topic for `tax_services/update` events. Occurs whenver a tax service is updated. Requires the `read_taxes` scope. */
  TaxServicesUpdate = 'TAX_SERVICES_UPDATE',
  /** The webhook topic for `tender_transactions/create` events. Occurs when a tender transaction is created. Requires the `read_orders` scope. */
  TenderTransactionsCreate = 'TENDER_TRANSACTIONS_CREATE',
  /** The webhook topic for `themes/create` events. Occurs whenever a theme is created. Does not occur when theme files are created. Requires the `read_themes` scope. */
  ThemesCreate = 'THEMES_CREATE',
  /** The webhook topic for `themes/delete` events. Occurs whenever a theme is deleted. Does not occur when theme files are deleted. Requires the `read_themes` scope. */
  ThemesDelete = 'THEMES_DELETE',
  /** The webhook topic for `themes/publish` events. Occurs whenever a theme with the main or mobile (deprecated) role is published. Requires the `read_themes` scope. */
  ThemesPublish = 'THEMES_PUBLISH',
  /** The webhook topic for `themes/update` events. Occurs whenever a theme is updated. Does not occur when theme files are updated. Requires the `read_themes` scope. */
  ThemesUpdate = 'THEMES_UPDATE',
  /** The webhook topic for `variants/in_stock` events. Occurs whenever a variant becomes in stock. Requires the `read_products` scope. */
  VariantsInStock = 'VARIANTS_IN_STOCK',
  /** The webhook topic for `variants/out_of_stock` events. Occurs whenever a variant becomes out of stock. Requires the `read_products` scope. */
  VariantsOutOfStock = 'VARIANTS_OUT_OF_STOCK',
}
