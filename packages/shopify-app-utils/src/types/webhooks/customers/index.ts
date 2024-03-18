/**
 * The source that collected the customer's consent to receive marketing materials.
 *
 */
export enum CustomerConsentCollectedFrom {
  /**
   * The customer consent was collected outside of Shopify.
   *
   */
  Other = 'other',
  /**
   * The customer consent was collected by Shopify.
   *
   */
  Shopify = 'shopify',
}

/**
 * The possible email marketing states for a customer.
 *
 */
export enum CustomerEmailMarketingState {
  /**
   * The customer’s email address marketing state is invalid.
   *
   */
  Invalid = 'invalid',
  /**
   * The customer isn't subscribed to email marketing.
   *
   */
  NotSubscribed = 'not_subscribed',
  /**
   * The customer is in the process of subscribing to email marketing.
   *
   */
  Pending = 'pending',
  /**
   * The customer's personal data is erased. This value is internally-set and read-only.
   *
   */
  Redacted = 'redacted',
  /**
   * The customer is subscribed to email marketing.
   *
   */
  Subscribed = 'subscribed',
  /**
   * The customer isn't currently subscribed to email marketing but was previously subscribed.
   *
   */
  Unsubscribed = 'unsubscribed',
}

/**
 * The possible values for the marketing subscription opt-in level enabled at the time the customer consented to receive marketing information.
 *
 * The levels are defined by [the M3AAWG best practices guideline
 *   document](https://www.m3aawg.org/sites/maawg/files/news/M3AAWG_Senders_BCP_Ver3-2015-02.pdf).
 *
 */
export enum CustomerMarketingOptInLevel {
  /**
   * After providing their information, the customer receives a confirmation and is required to
   * perform a intermediate step before receiving marketing information.
   *
   */
  ConfirmedOptIn = 'confirmed_opt_in',
  /**
   * After providing their information, the customer receives marketing information without any
   * intermediate steps.
   *
   */
  SingleOptIn = 'single_opt_in',
  /**
   * The customer receives marketing information but how they were opted in is unknown.
   *
   */
  Unknown = 'unknown',
}

/** The valid values for the state of a customer's account with a shop. */
export enum CustomerState {
  /**
   * The customer declined the email invite to create an account.
   *
   */
  Declined = 'declined',
  /**
   * The customer doesn't have an active account. Customer accounts can be disabled from the Shopify admin at any time.
   *
   */
  Disabled = 'disabled',
  /**
   * The customer has created an account.
   *
   */
  Enabled = 'enabled',
  /**
   * The customer has received an email invite to create an account.
   *
   */
  Invited = 'invited',
}

export interface CustomerMailingAddress {
  id: number;
  customer_id: number;
  first_name: string;
  address1: string;
  phone: string;
  city: string;
  zip: string;
  province: string;
  country: string;
  last_name: string;
  address2: any;
  company: string;
  latitude: any;
  longitude: any;
  name: string;
  country_code: string;
  province_code: string;
}

export interface CustomerCreate {
  id: number;
  email: string;
  accepts_marketing: boolean;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  order_count: number;
  state: CustomerState;
  total_spent: string;
  last_order_id: number | null;
  note: string | null;
  verified_email: boolean;
  multipass_identifier: null;
  tax_exempt: boolean;
  tag: string | null;
  last_order_name: string | null;
  currency: string;
  phone: string;
  addresses: CustomerMailingAddress[];
  accepts_marketing_updated_at: string;
  marketing_opt_in_level: CustomerMarketingOptInLevel | null;
  tax_exemptions: unknown[];
  email_marketing_consent: {
    state: CustomerEmailMarketingState;
    opt_in_level: CustomerMarketingOptInLevel;
    consent_updated_at: string;
  } | null;
  sms_marketing_consent: {
    state: CustomerEmailMarketingState;
    opt_in_level: CustomerMarketingOptInLevel;
    consent_updated_at: string;
    consent_collected_from: CustomerConsentCollectedFrom;
  } | null;
  admin_graphql_api_id: string;
  default_address: CustomerMailingAddress;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomerUpdate extends CustomerCreate {}

export interface CustomerDelete {
  id: number;
  phone: string | null;
  addresses: CustomerMailingAddress[];
  accepts_marketing_updated_at: string;
  marketing_opt_in_level: CustomerMarketingOptInLevel | null;
  tax_exemptions: unknown[];
  email_marketing_consent: {
    state: CustomerEmailMarketingState;
    opt_in_level: CustomerMarketingOptInLevel;
    consent_updated_at: string;
  } | null;
  sms_marketing_consent: {
    state: CustomerEmailMarketingState;
    opt_in_level: CustomerMarketingOptInLevel;
    consent_updated_at: string;
    consent_collected_from: CustomerConsentCollectedFrom;
  } | null;
  admin_graphql_api_id: string;
}
