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

/** The reason for a fulfillment hold. */
export type FulfillmentHoldReason =
  /** The fulfillment hold is applied because payment is pending. */
  | 'AWAITING_PAYMENT'
  /** The fulfillment hold is applied because of a high risk of fraud. */
  | 'HIGH_RISK_OF_FRAUD'
  /** The fulfillment hold is applied because of an incorrect address. */
  | 'INCORRECT_ADDRESS'
  /** The fulfillment hold is applied because inventory is out of stock. */
  | 'INVENTORY_OUT_OF_STOCK'
  /** The fulfillment hold is applied for another reason. */
  | 'OTHER'
  /** The fulfillment hold is applied because of an unknown delivery date. */
  | 'UNKNOWN_DELIVERY_DATE';

/** The input fields for the fulfillment hold applied on the fulfillment order. */
export type FulfillmentOrderHoldInput = {
  /** A configurable ID used to track the automation system releasing these holds. */
  externalId?: InputMaybe<Scalars['String']['input']>;
  /**
   * The fulfillment order line items to be placed on hold.
   * If left blank, all line items of the fulfillment order are placed on hold.
   *
   */
  fulfillmentOrderLineItems?: InputMaybe<Array<FulfillmentOrderLineItemInput>>;
  /** Whether the merchant receives a notification about the fulfillment hold. The default value is `false`. */
  notifyMerchant?: InputMaybe<Scalars['Boolean']['input']>;
  /** The reason for the fulfillment hold. */
  reason: FulfillmentHoldReason;
  /** Additional information about the fulfillment hold reason. */
  reasonNotes?: InputMaybe<Scalars['String']['input']>;
};

/**
 * The input fields used to include the quantity of the fulfillment order line item that should be fulfilled.
 *
 */
export type FulfillmentOrderLineItemInput = {
  /** The ID of the fulfillment order line item. */
  id: Scalars['ID']['input'];
  /** The quantity of the fulfillment order line item. */
  quantity: Scalars['Int']['input'];
};

/**
 * The input fields used to include the line items of a specified fulfillment order that should be fulfilled.
 *
 */
export type FulfillmentOrderLineItemsInput = {
  /** The ID of the fulfillment order. */
  fulfillmentOrderId: Scalars['ID']['input'];
  /**
   * The fulfillment order line items to be fulfilled.
   * If left blank, all line items of the fulfillment order will be fulfilled.
   *
   */
  fulfillmentOrderLineItems?: InputMaybe<Array<FulfillmentOrderLineItemInput>>;
};

/** The input fields used to include the address at which the fulfillment occurred. This input object is intended for tax purposes, as a full address is required for tax providers to accurately calculate taxes. Typically this is the address of the warehouse or fulfillment center. To retrieve a fulfillment location's address, use the `assignedLocation` field on the [`FulfillmentOrder`](/docs/api/admin-graphql/latest/objects/FulfillmentOrder) object instead. */
export type FulfillmentOriginAddressInput = {
  /** The street address of the fulfillment location. */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** The city in which the fulfillment location is located. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** The country of the fulfillment location. */
  countryCode: Scalars['String']['input'];
  /** The province of the fulfillment location. */
  provinceCode?: InputMaybe<Scalars['String']['input']>;
  /** The zip code of the fulfillment location. */
  zip?: InputMaybe<Scalars['String']['input']>;
};

/**
 * The input fields that specify all possible fields for tracking information.
 *
 * > Note:
 * > If you provide the `url` field, you should not provide the `urls` field.
 * >
 * > If you provide the `number` field, you should not provide the `numbers` field.
 * >
 * > If you provide the `url` field, you should provide the `number` field.
 * >
 * > If you provide the `urls` field, you should provide the `numbers` field.
 *
 */
export type FulfillmentTrackingInput = {
  /**
   * The name of the tracking company.
   *
   * If you specify a tracking company name from
   * [the list](https://shopify.dev/api/admin-graphql/latest/objects/FulfillmentTrackingInfo#supported-tracking-companies),
   * Shopify will automatically build tracking URLs for all provided tracking numbers,
   * which will make the tracking numbers clickable in the interface.
   * The same tracking company will be applied to all tracking numbers specified.
   *
   * Additionally, for the tracking companies listed on the
   * [Shipping Carriers help page](https://help.shopify.com/manual/shipping/understanding-shipping/shipping-carriers#integrated-shipping-carriers)
   * Shopify will automatically update the fulfillment's `shipment_status` field during the fulfillment process.
   *
   * > Note:
   * > Send the tracking company name exactly as written in
   * > [the list](https://shopify.dev/api/admin-graphql/latest/objects/FulfillmentTrackingInfo#supported-tracking-companies)
   * > (capitalization matters).
   *
   */
  company?: InputMaybe<Scalars['String']['input']>;
  /**
   * The tracking number of the fulfillment.
   *
   * The tracking number will be clickable in the interface if one of the following applies
   * (the highest in the list has the highest priority):
   *
   * * Tracking url provided in the `url` field.
   * * [Shopify-known tracking company name](https://shopify.dev/api/admin-graphql/latest/objects/FulfillmentTrackingInfo#supported-tracking-companies)
   *   specified in the `company` field.
   *   Shopify will build the tracking URL automatically based on the tracking number specified.
   * * The tracking number has a Shopify-known format.
   *   Shopify will guess the tracking provider and build the tracking url based on the tracking number format.
   *   Not all tracking carriers are supported, and multiple tracking carriers may use similarly formatted tracking numbers.
   *   This can result in an invalid tracking URL.
   *   It is highly recommended that you send the tracking company and the tracking URL.
   *
   */
  number?: InputMaybe<Scalars['String']['input']>;
  /**
   * The tracking numbers of the fulfillment, one or many.
   *
   * With multiple tracking numbers, you can provide tracking information
   * for all shipments associated with the fulfillment, if there are more than one.
   * For example, if you're shipping assembly parts of one furniture item in several boxes.
   *
   * Tracking numbers will be clickable in the interface if one of the following applies
   * (the highest in the list has the highest priority):
   *
   * * Tracking URLs provided in the `urls` field.
   *   The tracking URLs will be matched to the tracking numbers based on their positions in the arrays.
   * * [Shopify-known tracking company name](https://shopify.dev/api/admin-graphql/latest/objects/FulfillmentTrackingInfo#supported-tracking-companies)
   *   specified in the `company` field.
   *   Shopify will build tracking URLs automatically for all tracking numbers specified.
   *   The same tracking company will be applied to all tracking numbers.
   * * Tracking numbers have a Shopify-known format.
   *   Shopify will guess tracking providers and build tracking URLs based on the tracking number formats.
   *   Not all tracking carriers are supported, and multiple tracking carriers may use similarly formatted tracking numbers.
   *   This can result in an invalid tracking URL.
   *   It is highly recommended that you send the tracking company and the tracking URLs.
   *
   *
   */
  numbers?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * The URL to track the fulfillment.
   *
   * The tracking URL is displayed in the merchant's admin on the order page.
   * The tracking URL is displayed in the shipping confirmation email, which can optionally be sent to the customer.
   * When accounts are enabled, it's also displayed in the customer's order history.
   *
   * The URL must be an [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) and
   * [RFC 3987](https://datatracker.ietf.org/doc/html/rfc3987)-compliant URI string.
   * For example, `"https://www.myshipping.com/track/?tracknumbers=TRACKING_NUMBER"` is a valid URL.
   * It includes a scheme (`https`) and a host (`myshipping.com`).
   *
   */
  url?: InputMaybe<Scalars['URL']['input']>;
  /**
   * The URLs to track the fulfillment, one or many.
   *
   * The tracking URLs are displayed in the merchant's admin on the order page.
   * The tracking URLs are displayed in the shipping confirmation email, which can optionally be sent to the customer.
   * When accounts are enabled, the tracking URLs are also displayed in the customer's order history.
   *
   * If you're not specifying a
   * [Shopify-known](https://shopify.dev/api/admin-graphql/latest/objects/FulfillmentTrackingInfo#supported-tracking-companies)
   * tracking company name in the `company` field,
   * then provide tracking URLs for all tracking numbers from the `numbers` field.
   *
   * Tracking URLs from the `urls` array field are being matched with the tracking numbers from the `numbers` array
   * field correspondingly their positions in the arrays.
   *
   * Each URL must be an [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) and
   * [RFC 3987](https://datatracker.ietf.org/doc/html/rfc3987)-compliant URI string.
   * For example, `"https://www.myshipping.com/track/?tracknumbers=TRACKING_NUMBER"` is a valid URL.
   * It includes a scheme (`https`) and a host (`myshipping.com`).
   *
   */
  urls?: InputMaybe<Array<Scalars['URL']['input']>>;
};

/** The input fields used to create a fulfillment from fulfillment orders. */
export type FulfillmentV2Input = {
  /**
   * Pairs of `fulfillment_order_id` and `fulfillment_order_line_items` that represent the fulfillment
   * order line items that have to be fulfilled for each fulfillment order.  For any given pair, if the
   * fulfillment order line items are left blank then all the fulfillment order line items of the
   * associated fulfillment order ID will be fulfilled.
   *
   */
  lineItemsByFulfillmentOrder: Array<FulfillmentOrderLineItemsInput>;
  /**
   * Whether the customer is notified.
   * If `true`, then a notification is sent when the fulfillment is created. The default value is `false`.
   *
   */
  notifyCustomer?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Address information about the location from which the order was fulfilled.
   *
   */
  originAddress?: InputMaybe<FulfillmentOriginAddressInput>;
  /**
   * The fulfillment's tracking information, including a tracking URL, a tracking number,
   * and the company associated with the fulfillment.
   *
   */
  trackingInfo?: InputMaybe<FulfillmentTrackingInput>;
};

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

export type UpdateTrackingInfoMutationVariables = Exact<{
  fulfillmentId: Scalars['ID']['input'];
  trackingInfo: FulfillmentTrackingInput;
  notifyCustomer?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateTrackingInfoMutation = { __typename?: 'Mutation', fulfillmentTrackingInfoUpdateV2?: { __typename?: 'FulfillmentTrackingInfoUpdateV2Payload', userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }> } | null };

export type FulfillOrdersMutationVariables = Exact<{
  fulfillment: FulfillmentV2Input;
}>;


export type FulfillOrdersMutation = { __typename?: 'Mutation', fulfillmentCreateV2?: { __typename?: 'FulfillmentCreateV2Payload', fulfillment?: { __typename?: 'Fulfillment', id: string } | null, userErrors: Array<{ __typename?: 'UserError', message: string }> } | null };

export type FulfillmentOrderHoldMutationVariables = Exact<{
  fulfillmentHold: FulfillmentOrderHoldInput;
  id: Scalars['ID']['input'];
}>;


export type FulfillmentOrderHoldMutation = { __typename?: 'Mutation', fulfillmentOrderHold?: { __typename?: 'FulfillmentOrderHoldPayload', userErrors: Array<{ __typename?: 'FulfillmentOrderHoldUserError', field?: Array<string> | null, message: string }> } | null };

export type FulfillmentOrdersReleaseHoldsMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type FulfillmentOrdersReleaseHoldsMutation = { __typename?: 'Mutation', fulfillmentOrdersReleaseHolds?: { __typename?: 'FulfillmentOrdersReleaseHoldsPayload', job?: { __typename?: 'Job', id: string } | null, userErrors: Array<{ __typename?: 'FulfillmentOrdersReleaseHoldsUserError', field?: Array<string> | null, message: string }> } | null };

export type FulfillmentOrderCancelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FulfillmentOrderCancelMutation = { __typename?: 'Mutation', fulfillmentOrderCancel?: { __typename?: 'FulfillmentOrderCancelPayload', fulfillmentOrder?: { __typename?: 'FulfillmentOrder', id: string } | null, replacementFulfillmentOrder?: { __typename?: 'FulfillmentOrder', id: string } | null, userErrors: Array<{ __typename?: 'UserError', field?: Array<string> | null, message: string }> } | null };

export type FulfillmentOrdersSetFulfillmentDeadlineMutationVariables = Exact<{
  fulfillmentDeadline: Scalars['DateTime']['input'];
  fulfillmentOrderIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type FulfillmentOrdersSetFulfillmentDeadlineMutation = { __typename?: 'Mutation', fulfillmentOrdersSetFulfillmentDeadline?: { __typename?: 'FulfillmentOrdersSetFulfillmentDeadlinePayload', success?: boolean | null, userErrors: Array<{ __typename?: 'FulfillmentOrdersSetFulfillmentDeadlineUserError', field?: Array<string> | null, message: string }> } | null };

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

export type GetOrdersFulfillmentsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOrdersFulfillmentsQuery = { __typename?: 'QueryRoot', fulfillmentOrder?: { __typename?: 'FulfillmentOrder', id: string, fulfillmentHolds: Array<{ __typename?: 'FulfillmentHold', reason: FulfillmentHoldReason, reasonNotes?: string | null }>, fulfillments: { __typename?: 'FulfillmentConnection', edges: Array<{ __typename?: 'FulfillmentEdge', node: { __typename?: 'Fulfillment', id: string, trackingInfo: Array<{ __typename?: 'FulfillmentTrackingInfo', company?: string | null, number?: string | null, url?: any | null }>, fulfillmentLineItems: { __typename?: 'FulfillmentLineItemConnection', edges: Array<{ __typename?: 'FulfillmentLineItemEdge', node: { __typename?: 'FulfillmentLineItem', id: string, quantity?: number | null, lineItem: { __typename?: 'LineItem', id: string } } }> } } }> } } | null };
