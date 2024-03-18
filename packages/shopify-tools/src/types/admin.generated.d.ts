/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as AdminTypes from './admin.types.d.ts';

export type BulkOperationFragment = (
  { __typename: 'BulkOperation' }
  & Pick<AdminTypes.BulkOperation, 'id' | 'status' | 'errorCode' | 'url' | 'objectCount' | 'rootObjectCount'>
);

export type CreateStagedUploadForBulkMutationVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type CreateStagedUploadForBulkMutation = { stagedUploadsCreate?: AdminTypes.Maybe<{ userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>>, stagedTargets?: AdminTypes.Maybe<Array<(
      Pick<AdminTypes.StagedMediaUploadTarget, 'url' | 'resourceUrl'>
      & { parameters: Array<Pick<AdminTypes.StagedUploadParameter, 'name' | 'value'>> }
    )>> }> };

export type RunBulkMutationMutationVariables = AdminTypes.Exact<{
  mutation: AdminTypes.Scalars['String']['input'];
  stagedUploadPath: AdminTypes.Scalars['String']['input'];
}>;


export type RunBulkMutationMutation = { bulkOperationRunMutation?: AdminTypes.Maybe<{ bulkOperation?: AdminTypes.Maybe<(
      { __typename: 'BulkOperation' }
      & Pick<AdminTypes.BulkOperation, 'id' | 'status' | 'errorCode' | 'url' | 'objectCount' | 'rootObjectCount'>
    )>, userErrors: Array<Pick<AdminTypes.BulkMutationUserError, 'field' | 'message'>> }> };

export type RunBulkQueryMutationVariables = AdminTypes.Exact<{
  query: AdminTypes.Scalars['String']['input'];
}>;


export type RunBulkQueryMutation = { bulkOperationRunQuery?: AdminTypes.Maybe<{ bulkOperation?: AdminTypes.Maybe<(
      { __typename: 'BulkOperation' }
      & Pick<AdminTypes.BulkOperation, 'id' | 'status' | 'errorCode' | 'url' | 'objectCount' | 'rootObjectCount'>
    )>, userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>> }> };

export type GetBulkStatusQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type GetBulkStatusQuery = { node?: AdminTypes.Maybe<{ __typename: 'AbandonedCheckout' | 'Abandonment' | 'AddAllProductsOperation' | 'AdditionalFee' | 'App' | 'AppCatalog' | 'AppCredit' | 'AppInstallation' | 'AppPurchaseOneTime' | 'AppRevenueAttributionRecord' | 'AppSubscription' | 'AppUsageRecord' | 'BasicEvent' | 'CalculatedOrder' | 'CatalogCsvOperation' | 'Channel' | 'ChannelDefinition' | 'ChannelInformation' | 'CheckoutProfile' | 'Collection' } | { __typename: 'CommentEvent' | 'Company' | 'CompanyAddress' | 'CompanyContact' | 'CompanyContactRole' | 'CompanyContactRoleAssignment' | 'CompanyLocation' | 'CompanyLocationCatalog' | 'Customer' | 'CustomerPaymentMethod' | 'CustomerSegmentMembersQuery' | 'CustomerVisit' | 'DeliveryCarrierService' | 'DeliveryCondition' | 'DeliveryCountry' | 'DeliveryCustomization' | 'DeliveryLocationGroup' | 'DeliveryMethod' | 'DeliveryMethodDefinition' | 'DeliveryParticipant' } | { __typename: 'DeliveryProfile' | 'DeliveryProfileItem' | 'DeliveryProvince' | 'DeliveryRateDefinition' | 'DeliveryZone' | 'DiscountAutomaticBxgy' | 'DiscountAutomaticNode' | 'DiscountCodeNode' | 'DiscountNode' | 'DiscountRedeemCodeBulkCreation' | 'Domain' | 'DraftOrder' | 'DraftOrderLineItem' | 'DraftOrderTag' | 'Duty' | 'ExternalVideo' | 'Fulfillment' | 'FulfillmentEvent' | 'FulfillmentLineItem' | 'FulfillmentOrder' } | { __typename: 'FulfillmentOrderDestination' | 'FulfillmentOrderLineItem' | 'FulfillmentOrderMerchantRequest' | 'GenericFile' | 'GiftCard' | 'InventoryAdjustmentGroup' | 'InventoryItem' | 'InventoryLevel' | 'LineItem' | 'LineItemMutable' | 'Location' | 'MailingAddress' | 'Market' | 'MarketCatalog' | 'MarketRegionCountry' | 'MarketWebPresence' | 'MarketingActivity' | 'MarketingEvent' | 'MediaImage' | 'Metafield' } | { __typename: 'MetafieldDefinition' | 'MetafieldStorefrontVisibility' | 'Metaobject' | 'MetaobjectDefinition' | 'Model3d' | 'OnlineStoreArticle' | 'OnlineStoreBlog' | 'OnlineStorePage' | 'Order' | 'OrderDisputeSummary' | 'OrderTransaction' | 'PaymentCustomization' | 'PaymentMandate' | 'PaymentSchedule' | 'PaymentTerms' | 'PaymentTermsTemplate' | 'PriceList' | 'PriceRule' | 'PriceRuleDiscountCode' | 'PrivateMetafield' } | { __typename: 'Product' | 'ProductOption' | 'ProductTaxonomyNode' | 'ProductVariant' | 'Publication' | 'PublicationResourceOperation' | 'Refund' | 'Return' | 'ReturnLineItem' | 'ReturnableFulfillment' | 'ReverseDelivery' | 'ReverseDeliveryLineItem' | 'ReverseFulfillmentOrder' | 'ReverseFulfillmentOrderDisposition' | 'ReverseFulfillmentOrderLineItem' | 'SavedSearch' | 'ScriptTag' | 'Segment' | 'SellingPlan' | 'SellingPlanGroup' } | { __typename: 'ServerPixel' | 'Shop' | 'ShopAddress' | 'ShopPolicy' | 'ShopifyPaymentsAccount' | 'ShopifyPaymentsBankAccount' | 'ShopifyPaymentsDispute' | 'ShopifyPaymentsDisputeEvidence' | 'ShopifyPaymentsDisputeFileUpload' | 'ShopifyPaymentsDisputeFulfillment' | 'ShopifyPaymentsPayout' | 'ShopifyPaymentsVerification' | 'StaffMember' | 'StandardMetafieldDefinitionTemplate' | 'StorefrontAccessToken' | 'SubscriptionBillingAttempt' | 'SubscriptionContract' | 'SubscriptionDraft' | 'TenderTransaction' | 'TransactionFee' } | { __typename: 'UrlRedirect' | 'UrlRedirectImport' | 'Video' | 'WebPixel' | 'WebhookSubscription' } | (
    { __typename: 'BulkOperation' }
    & Pick<AdminTypes.BulkOperation, 'id' | 'status' | 'errorCode' | 'url' | 'objectCount' | 'rootObjectCount'>
  )> };

interface GeneratedQueryTypes {
  "\n  \n\n  query GetBulkStatus($id: ID!) {\n    node(id: $id) {\n      __typename\n      ... on BulkOperation {\n        ...BulkOperation\n      }\n    }\n  }\n": {return: GetBulkStatusQuery, variables: GetBulkStatusQueryVariables},
}

interface GeneratedMutationTypes {
  "\n  mutation CreateStagedUploadForBulk {\n    stagedUploadsCreate(\n      input: { resource: BULK_MUTATION_VARIABLES, filename: \"bulk_op_vars\", mimeType: \"text/jsonl\", httpMethod: POST }\n    ) {\n      userErrors {\n        field\n        message\n      }\n      stagedTargets {\n        url\n        resourceUrl\n        parameters {\n          name\n          value\n        }\n      }\n    }\n  }\n": {return: CreateStagedUploadForBulkMutation, variables: CreateStagedUploadForBulkMutationVariables},
  "\n  \n\n  mutation RunBulkMutation($mutation: String!, $stagedUploadPath: String!) {\n    bulkOperationRunMutation(mutation: $mutation, stagedUploadPath: $stagedUploadPath) {\n      bulkOperation {\n        ...BulkOperation\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: RunBulkMutationMutation, variables: RunBulkMutationMutationVariables},
  "\n  \n\n  mutation RunBulkQuery($query: String!) {\n    bulkOperationRunQuery(query: $query) {\n      bulkOperation {\n        ...BulkOperation\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: RunBulkQueryMutation, variables: RunBulkQueryMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
