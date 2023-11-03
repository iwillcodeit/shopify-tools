import {
  CustomerConsentCollectedFrom,
  CustomerEmailMarketingState,
  CustomerMarketingOptInLevel,
  CustomerState,
} from '../../graphql.js';

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
