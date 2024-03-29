export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ARN: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  FormattedString: { input: any; output: any; }
  HTML: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Money: { input: any; output: any; }
  StorefrontID: { input: any; output: any; }
  URL: { input: any; output: any; }
  UnsignedInt64: { input: any; output: any; }
  UtcOffset: { input: any; output: any; }
};

/** Error codes for failed bulk operations. */
export type BulkOperationErrorCode =
  /**
   * The provided operation `query` returned access denied due to missing
   * [access scopes](https://shopify.dev/api/usage/access-scopes).
   * Review the requested object permissions and execute the query as a normal non-bulk GraphQL request to see more details.
   *
   */
  | 'ACCESS_DENIED'
  /**
   * The operation resulted in partial or incomplete data due to internal server errors during execution.
   * These errors might be intermittent, so you can try performing the same query again.
   *
   */
  | 'INTERNAL_SERVER_ERROR'
  /**
   * The operation resulted in partial or incomplete data due to query timeouts during execution.
   * In some cases, timeouts can be avoided by modifying your `query` to select fewer fields.
   *
   */
  | 'TIMEOUT';

/** The valid values for the status of a bulk operation. */
export type BulkOperationStatus =
  /** The bulk operation has been canceled. */
  | 'CANCELED'
  /**
   * Cancelation has been initiated on the bulk operation. There may be a short delay from when a cancelation
   * starts until the operation is actually canceled.
   *
   */
  | 'CANCELING'
  /** The bulk operation has successfully completed. */
  | 'COMPLETED'
  /** The bulk operation has been created. */
  | 'CREATED'
  /** The bulk operation URL has expired. */
  | 'EXPIRED'
  /**
   * The bulk operation has failed. For information on why the operation failed, use
   * [BulkOperation.errorCode](https://shopify.dev/api/admin-graphql/latest/enums/bulkoperationerrorcode).
   *
   */
  | 'FAILED'
  /** The bulk operation is runnning. */
  | 'RUNNING';

/**
 * The three-letter currency codes that represent the world currencies used in stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 *
 */
export type CurrencyCode =
  /** United Arab Emirates Dirham (AED). */
  | 'AED'
  /** Afghan Afghani (AFN). */
  | 'AFN'
  /** Albanian Lek (ALL). */
  | 'ALL'
  /** Armenian Dram (AMD). */
  | 'AMD'
  /** Netherlands Antillean Guilder. */
  | 'ANG'
  /** Angolan Kwanza (AOA). */
  | 'AOA'
  /** Argentine Pesos (ARS). */
  | 'ARS'
  /** Australian Dollars (AUD). */
  | 'AUD'
  /** Aruban Florin (AWG). */
  | 'AWG'
  /** Azerbaijani Manat (AZN). */
  | 'AZN'
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  | 'BAM'
  /** Barbadian Dollar (BBD). */
  | 'BBD'
  /** Bangladesh Taka (BDT). */
  | 'BDT'
  /** Bulgarian Lev (BGN). */
  | 'BGN'
  /** Bahraini Dinar (BHD). */
  | 'BHD'
  /** Burundian Franc (BIF). */
  | 'BIF'
  /** Bermudian Dollar (BMD). */
  | 'BMD'
  /** Brunei Dollar (BND). */
  | 'BND'
  /** Bolivian Boliviano (BOB). */
  | 'BOB'
  /** Brazilian Real (BRL). */
  | 'BRL'
  /** Bahamian Dollar (BSD). */
  | 'BSD'
  /** Bhutanese Ngultrum (BTN). */
  | 'BTN'
  /** Botswana Pula (BWP). */
  | 'BWP'
  /** Belarusian Ruble (BYN). */
  | 'BYN'
  /** Belarusian Ruble (BYR). */
  | 'BYR'
  /** Belize Dollar (BZD). */
  | 'BZD'
  /** Canadian Dollars (CAD). */
  | 'CAD'
  /** Congolese franc (CDF). */
  | 'CDF'
  /** Swiss Francs (CHF). */
  | 'CHF'
  /** Chilean Peso (CLP). */
  | 'CLP'
  /** Chinese Yuan Renminbi (CNY). */
  | 'CNY'
  /** Colombian Peso (COP). */
  | 'COP'
  /** Costa Rican Colones (CRC). */
  | 'CRC'
  /** Cape Verdean escudo (CVE). */
  | 'CVE'
  /** Czech Koruny (CZK). */
  | 'CZK'
  /** Djiboutian Franc (DJF). */
  | 'DJF'
  /** Danish Kroner (DKK). */
  | 'DKK'
  /** Dominican Peso (DOP). */
  | 'DOP'
  /** Algerian Dinar (DZD). */
  | 'DZD'
  /** Egyptian Pound (EGP). */
  | 'EGP'
  /** Eritrean Nakfa (ERN). */
  | 'ERN'
  /** Ethiopian Birr (ETB). */
  | 'ETB'
  /** Euro (EUR). */
  | 'EUR'
  /** Fijian Dollars (FJD). */
  | 'FJD'
  /** Falkland Islands Pounds (FKP). */
  | 'FKP'
  /** United Kingdom Pounds (GBP). */
  | 'GBP'
  /** Georgian Lari (GEL). */
  | 'GEL'
  /** Ghanaian Cedi (GHS). */
  | 'GHS'
  /** Gibraltar Pounds (GIP). */
  | 'GIP'
  /** Gambian Dalasi (GMD). */
  | 'GMD'
  /** Guinean Franc (GNF). */
  | 'GNF'
  /** Guatemalan Quetzal (GTQ). */
  | 'GTQ'
  /** Guyanese Dollar (GYD). */
  | 'GYD'
  /** Hong Kong Dollars (HKD). */
  | 'HKD'
  /** Honduran Lempira (HNL). */
  | 'HNL'
  /** Croatian Kuna (HRK). */
  | 'HRK'
  /** Haitian Gourde (HTG). */
  | 'HTG'
  /** Hungarian Forint (HUF). */
  | 'HUF'
  /** Indonesian Rupiah (IDR). */
  | 'IDR'
  /** Israeli New Shekel (NIS). */
  | 'ILS'
  /** Indian Rupees (INR). */
  | 'INR'
  /** Iraqi Dinar (IQD). */
  | 'IQD'
  /** Iranian Rial (IRR). */
  | 'IRR'
  /** Icelandic Kronur (ISK). */
  | 'ISK'
  /** Jersey Pound. */
  | 'JEP'
  /** Jamaican Dollars (JMD). */
  | 'JMD'
  /** Jordanian Dinar (JOD). */
  | 'JOD'
  /** Japanese Yen (JPY). */
  | 'JPY'
  /** Kenyan Shilling (KES). */
  | 'KES'
  /** Kyrgyzstani Som (KGS). */
  | 'KGS'
  /** Cambodian Riel. */
  | 'KHR'
  /** Kiribati Dollar (KID). */
  | 'KID'
  /** Comorian Franc (KMF). */
  | 'KMF'
  /** South Korean Won (KRW). */
  | 'KRW'
  /** Kuwaiti Dinar (KWD). */
  | 'KWD'
  /** Cayman Dollars (KYD). */
  | 'KYD'
  /** Kazakhstani Tenge (KZT). */
  | 'KZT'
  /** Laotian Kip (LAK). */
  | 'LAK'
  /** Lebanese Pounds (LBP). */
  | 'LBP'
  /** Sri Lankan Rupees (LKR). */
  | 'LKR'
  /** Liberian Dollar (LRD). */
  | 'LRD'
  /** Lesotho Loti (LSL). */
  | 'LSL'
  /** Lithuanian Litai (LTL). */
  | 'LTL'
  /** Latvian Lati (LVL). */
  | 'LVL'
  /** Libyan Dinar (LYD). */
  | 'LYD'
  /** Moroccan Dirham. */
  | 'MAD'
  /** Moldovan Leu (MDL). */
  | 'MDL'
  /** Malagasy Ariary (MGA). */
  | 'MGA'
  /** Macedonia Denar (MKD). */
  | 'MKD'
  /** Burmese Kyat (MMK). */
  | 'MMK'
  /** Mongolian Tugrik. */
  | 'MNT'
  /** Macanese Pataca (MOP). */
  | 'MOP'
  /** Mauritanian Ouguiya (MRU). */
  | 'MRU'
  /** Mauritian Rupee (MUR). */
  | 'MUR'
  /** Maldivian Rufiyaa (MVR). */
  | 'MVR'
  /** Malawian Kwacha (MWK). */
  | 'MWK'
  /** Mexican Pesos (MXN). */
  | 'MXN'
  /** Malaysian Ringgits (MYR). */
  | 'MYR'
  /** Mozambican Metical. */
  | 'MZN'
  /** Namibian Dollar. */
  | 'NAD'
  /** Nigerian Naira (NGN). */
  | 'NGN'
  /** Nicaraguan Córdoba (NIO). */
  | 'NIO'
  /** Norwegian Kroner (NOK). */
  | 'NOK'
  /** Nepalese Rupee (NPR). */
  | 'NPR'
  /** New Zealand Dollars (NZD). */
  | 'NZD'
  /** Omani Rial (OMR). */
  | 'OMR'
  /** Panamian Balboa (PAB). */
  | 'PAB'
  /** Peruvian Nuevo Sol (PEN). */
  | 'PEN'
  /** Papua New Guinean Kina (PGK). */
  | 'PGK'
  /** Philippine Peso (PHP). */
  | 'PHP'
  /** Pakistani Rupee (PKR). */
  | 'PKR'
  /** Polish Zlotych (PLN). */
  | 'PLN'
  /** Paraguayan Guarani (PYG). */
  | 'PYG'
  /** Qatari Rial (QAR). */
  | 'QAR'
  /** Romanian Lei (RON). */
  | 'RON'
  /** Serbian dinar (RSD). */
  | 'RSD'
  /** Russian Rubles (RUB). */
  | 'RUB'
  /** Rwandan Franc (RWF). */
  | 'RWF'
  /** Saudi Riyal (SAR). */
  | 'SAR'
  /** Solomon Islands Dollar (SBD). */
  | 'SBD'
  /** Seychellois Rupee (SCR). */
  | 'SCR'
  /** Sudanese Pound (SDG). */
  | 'SDG'
  /** Swedish Kronor (SEK). */
  | 'SEK'
  /** Singapore Dollars (SGD). */
  | 'SGD'
  /** Saint Helena Pounds (SHP). */
  | 'SHP'
  /** Sierra Leonean Leone (SLL). */
  | 'SLL'
  /** Somali Shilling (SOS). */
  | 'SOS'
  /** Surinamese Dollar (SRD). */
  | 'SRD'
  /** South Sudanese Pound (SSP). */
  | 'SSP'
  /** Sao Tome And Principe Dobra (STD). */
  | 'STD'
  /** Sao Tome And Principe Dobra (STN). */
  | 'STN'
  /** Syrian Pound (SYP). */
  | 'SYP'
  /** Swazi Lilangeni (SZL). */
  | 'SZL'
  /** Thai baht (THB). */
  | 'THB'
  /** Tajikistani Somoni (TJS). */
  | 'TJS'
  /** Turkmenistani Manat (TMT). */
  | 'TMT'
  /** Tunisian Dinar (TND). */
  | 'TND'
  /** Tongan Pa'anga (TOP). */
  | 'TOP'
  /** Turkish Lira (TRY). */
  | 'TRY'
  /** Trinidad and Tobago Dollars (TTD). */
  | 'TTD'
  /** Taiwan Dollars (TWD). */
  | 'TWD'
  /** Tanzanian Shilling (TZS). */
  | 'TZS'
  /** Ukrainian Hryvnia (UAH). */
  | 'UAH'
  /** Ugandan Shilling (UGX). */
  | 'UGX'
  /** United States Dollars (USD). */
  | 'USD'
  /** Uruguayan Pesos (UYU). */
  | 'UYU'
  /** Uzbekistan som (UZS). */
  | 'UZS'
  /** Venezuelan Bolivares (VED). */
  | 'VED'
  /** Venezuelan Bolivares (VEF). */
  | 'VEF'
  /** Venezuelan Bolivares Soberanos (VES). */
  | 'VES'
  /** Vietnamese đồng (VND). */
  | 'VND'
  /** Vanuatu Vatu (VUV). */
  | 'VUV'
  /** Samoan Tala (WST). */
  | 'WST'
  /** Central African CFA Franc (XAF). */
  | 'XAF'
  /** East Caribbean Dollar (XCD). */
  | 'XCD'
  /** West African CFA franc (XOF). */
  | 'XOF'
  /** CFP Franc (XPF). */
  | 'XPF'
  /** Unrecognized currency. */
  | 'XXX'
  /** Yemeni Rial (YER). */
  | 'YER'
  /** South African Rand (ZAR). */
  | 'ZAR'
  /** Zambian Kwacha (ZMW). */
  | 'ZMW';

/** The input fields for a monetary value with currency. */
export type MoneyInput = {
  /** Decimal money amount. */
  amount: Scalars['Decimal']['input'];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};

/** The input fields used to add a discount during an order edit. */
export type OrderEditAppliedDiscountInput = {
  /** The description of the discount. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The value of the discount as a fixed amount. */
  fixedValue?: InputMaybe<MoneyInput>;
  /** The value of the discount as a percentage. */
  percentValue?: InputMaybe<Scalars['Float']['input']>;
};

export type BulkOperationFragment = { __typename: 'BulkOperation', id: string, status: BulkOperationStatus, errorCode?: BulkOperationErrorCode | null, url?: any | null, objectCount: any, rootObjectCount: any };

export type CreateStagedUploadForBulkMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateStagedUploadForBulkMutation = { __typename?: 'Mutation', stagedUploadsCreate?: { __typename?: 'StagedUploadsCreatePayload', userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }>, stagedTargets?: Array<{ __typename?: 'StagedMediaUploadTarget', url?: any | null, resourceUrl?: any | null, parameters: Array<{ __typename?: 'StagedUploadParameter', name: string, value: string }> }> | null } | null };

export type RunBulkMutationMutationVariables = Exact<{
  mutation: Scalars['String']['input'];
  stagedUploadPath: Scalars['String']['input'];
}>;


export type RunBulkMutationMutation = { __typename?: 'Mutation', bulkOperationRunMutation?: { __typename?: 'BulkOperationRunMutationPayload', bulkOperation?: { __typename: 'BulkOperation', id: string, status: BulkOperationStatus, errorCode?: BulkOperationErrorCode | null, url?: any | null, objectCount: any, rootObjectCount: any } | null, userErrors: Array<{ __typename?: 'BulkMutationUserError', field?: Array<string> | null, message: string }> } | null };

export type RunBulkQueryMutationVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type RunBulkQueryMutation = { __typename?: 'Mutation', bulkOperationRunQuery?: { __typename?: 'BulkOperationRunQueryPayload', bulkOperation?: { __typename: 'BulkOperation', id: string, status: BulkOperationStatus, errorCode?: BulkOperationErrorCode | null, url?: any | null, objectCount: any, rootObjectCount: any } | null, userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }> } | null };

export type GetBulkStatusQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBulkStatusQuery = { __typename?: 'QueryRoot', node?: { __typename: 'AbandonedCheckout' } | { __typename: 'Abandonment' } | { __typename: 'AddAllProductsOperation' } | { __typename: 'AdditionalFee' } | { __typename: 'App' } | { __typename: 'AppCatalog' } | { __typename: 'AppCredit' } | { __typename: 'AppInstallation' } | { __typename: 'AppPurchaseOneTime' } | { __typename: 'AppRevenueAttributionRecord' } | { __typename: 'AppSubscription' } | { __typename: 'AppUsageRecord' } | { __typename: 'BasicEvent' } | { __typename: 'BulkOperation', id: string, status: BulkOperationStatus, errorCode?: BulkOperationErrorCode | null, url?: any | null, objectCount: any, rootObjectCount: any } | { __typename: 'CalculatedOrder' } | { __typename: 'CatalogCsvOperation' } | { __typename: 'Channel' } | { __typename: 'ChannelDefinition' } | { __typename: 'ChannelInformation' } | { __typename: 'CheckoutProfile' } | { __typename: 'Collection' } | { __typename: 'CommentEvent' } | { __typename: 'Company' } | { __typename: 'CompanyAddress' } | { __typename: 'CompanyContact' } | { __typename: 'CompanyContactRole' } | { __typename: 'CompanyContactRoleAssignment' } | { __typename: 'CompanyLocation' } | { __typename: 'CompanyLocationCatalog' } | { __typename: 'Customer' } | { __typename: 'CustomerPaymentMethod' } | { __typename: 'CustomerSegmentMembersQuery' } | { __typename: 'CustomerVisit' } | { __typename: 'DeliveryCarrierService' } | { __typename: 'DeliveryCondition' } | { __typename: 'DeliveryCountry' } | { __typename: 'DeliveryCustomization' } | { __typename: 'DeliveryLocationGroup' } | { __typename: 'DeliveryMethod' } | { __typename: 'DeliveryMethodDefinition' } | { __typename: 'DeliveryParticipant' } | { __typename: 'DeliveryProfile' } | { __typename: 'DeliveryProfileItem' } | { __typename: 'DeliveryProvince' } | { __typename: 'DeliveryRateDefinition' } | { __typename: 'DeliveryZone' } | { __typename: 'DiscountAutomaticBxgy' } | { __typename: 'DiscountAutomaticNode' } | { __typename: 'DiscountCodeNode' } | { __typename: 'DiscountNode' } | { __typename: 'DiscountRedeemCodeBulkCreation' } | { __typename: 'Domain' } | { __typename: 'DraftOrder' } | { __typename: 'DraftOrderLineItem' } | { __typename: 'DraftOrderTag' } | { __typename: 'Duty' } | { __typename: 'ExternalVideo' } | { __typename: 'Fulfillment' } | { __typename: 'FulfillmentEvent' } | { __typename: 'FulfillmentLineItem' } | { __typename: 'FulfillmentOrder' } | { __typename: 'FulfillmentOrderDestination' } | { __typename: 'FulfillmentOrderLineItem' } | { __typename: 'FulfillmentOrderMerchantRequest' } | { __typename: 'GenericFile' } | { __typename: 'GiftCard' } | { __typename: 'InventoryAdjustmentGroup' } | { __typename: 'InventoryItem' } | { __typename: 'InventoryLevel' } | { __typename: 'LineItem' } | { __typename: 'LineItemMutable' } | { __typename: 'Location' } | { __typename: 'MailingAddress' } | { __typename: 'Market' } | { __typename: 'MarketCatalog' } | { __typename: 'MarketRegionCountry' } | { __typename: 'MarketWebPresence' } | { __typename: 'MarketingActivity' } | { __typename: 'MarketingEvent' } | { __typename: 'MediaImage' } | { __typename: 'Metafield' } | { __typename: 'MetafieldDefinition' } | { __typename: 'MetafieldStorefrontVisibility' } | { __typename: 'Metaobject' } | { __typename: 'MetaobjectDefinition' } | { __typename: 'Model3d' } | { __typename: 'OnlineStoreArticle' } | { __typename: 'OnlineStoreBlog' } | { __typename: 'OnlineStorePage' } | { __typename: 'Order' } | { __typename: 'OrderDisputeSummary' } | { __typename: 'OrderTransaction' } | { __typename: 'PaymentCustomization' } | { __typename: 'PaymentMandate' } | { __typename: 'PaymentSchedule' } | { __typename: 'PaymentTerms' } | { __typename: 'PaymentTermsTemplate' } | { __typename: 'PriceList' } | { __typename: 'PriceRule' } | { __typename: 'PriceRuleDiscountCode' } | { __typename: 'PrivateMetafield' } | { __typename: 'Product' } | { __typename: 'ProductOption' } | { __typename: 'ProductTaxonomyNode' } | { __typename: 'ProductVariant' } | { __typename: 'Publication' } | { __typename: 'PublicationResourceOperation' } | { __typename: 'Refund' } | { __typename: 'Return' } | { __typename: 'ReturnLineItem' } | { __typename: 'ReturnableFulfillment' } | { __typename: 'ReverseDelivery' } | { __typename: 'ReverseDeliveryLineItem' } | { __typename: 'ReverseFulfillmentOrder' } | { __typename: 'ReverseFulfillmentOrderDisposition' } | { __typename: 'ReverseFulfillmentOrderLineItem' } | { __typename: 'SavedSearch' } | { __typename: 'ScriptTag' } | { __typename: 'Segment' } | { __typename: 'SellingPlan' } | { __typename: 'SellingPlanGroup' } | { __typename: 'ServerPixel' } | { __typename: 'Shop' } | { __typename: 'ShopAddress' } | { __typename: 'ShopPolicy' } | { __typename: 'ShopifyPaymentsAccount' } | { __typename: 'ShopifyPaymentsBankAccount' } | { __typename: 'ShopifyPaymentsDispute' } | { __typename: 'ShopifyPaymentsDisputeEvidence' } | { __typename: 'ShopifyPaymentsDisputeFileUpload' } | { __typename: 'ShopifyPaymentsDisputeFulfillment' } | { __typename: 'ShopifyPaymentsPayout' } | { __typename: 'ShopifyPaymentsVerification' } | { __typename: 'StaffMember' } | { __typename: 'StandardMetafieldDefinitionTemplate' } | { __typename: 'StorefrontAccessToken' } | { __typename: 'SubscriptionBillingAttempt' } | { __typename: 'SubscriptionContract' } | { __typename: 'SubscriptionDraft' } | { __typename: 'TenderTransaction' } | { __typename: 'TransactionFee' } | { __typename: 'UrlRedirect' } | { __typename: 'UrlRedirectImport' } | { __typename: 'Video' } | { __typename: 'WebPixel' } | { __typename: 'WebhookSubscription' } | null };

export type OrderEditBeginMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type OrderEditBeginMutation = { __typename?: 'Mutation', orderEditBegin?: { __typename?: 'OrderEditBeginPayload', calculatedOrder?: { __typename?: 'CalculatedOrder', id: string } | null, userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }> } | null };

export type OrderEditCommitMutationVariables = Exact<{
  calculatedOrderId: Scalars['ID']['input'];
  notifyCustomer: Scalars['Boolean']['input'];
  staffNote?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrderEditCommitMutation = { __typename?: 'Mutation', orderEditCommit?: { __typename?: 'OrderEditCommitPayload', order?: { __typename?: 'Order', id: string } | null, userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }> } | null };

export type OrderEditAddVariantMutationVariables = Exact<{
  calculatedOrderId: Scalars['ID']['input'];
  variantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type OrderEditAddVariantMutation = { __typename?: 'Mutation', orderEditAddVariant?: { __typename?: 'OrderEditAddVariantPayload', userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }> } | null };

export type OrderEditAddCustomItemMutationVariables = Exact<{
  calculatedOrderId: Scalars['ID']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  price: MoneyInput;
  quantity: Scalars['Int']['input'];
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  taxable?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
}>;


export type OrderEditAddCustomItemMutation = { __typename?: 'Mutation', orderEditAddCustomItem?: { __typename?: 'OrderEditAddCustomItemPayload', userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }> } | null };

export type OrderEditAddLineItemDiscountMutationVariables = Exact<{
  calculatedOrderId: Scalars['ID']['input'];
  discount: OrderEditAppliedDiscountInput;
  lineItemId: Scalars['ID']['input'];
}>;


export type OrderEditAddLineItemDiscountMutation = { __typename?: 'Mutation', orderEditAddLineItemDiscount?: { __typename?: 'OrderEditAddLineItemDiscountPayload', userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }> } | null };

export type OrderEditRemoveLineItemDiscountMutationVariables = Exact<{
  calculatedOrderId: Scalars['ID']['input'];
  discountApplicationId: Scalars['ID']['input'];
}>;


export type OrderEditRemoveLineItemDiscountMutation = { __typename?: 'Mutation', orderEditRemoveLineItemDiscount?: { __typename?: 'OrderEditRemoveLineItemDiscountPayload', userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }> } | null };

export type OrderEditSetQuantityMutationVariables = Exact<{
  calculatedOrderId: Scalars['ID']['input'];
  lineItemId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  restock?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type OrderEditSetQuantityMutation = { __typename?: 'Mutation', orderEditSetQuantity?: { __typename?: 'OrderEditSetQuantityPayload', userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }> } | null };
