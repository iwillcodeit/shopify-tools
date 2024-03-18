export interface OrderCreate {
  id: number;
  admin_graphql_api_id: string;
  app_id: any;
  browser_ip: any;
  buyer_accepts_marketing: boolean;
  cancel_reason: string;
  cancelled_at: string;
  cart_token: any;
  checkout_id: any;
  checkout_token: any;
  client_details: any;
  closed_at: any;
  confirmation_number: any;
  confirmed: boolean;
  contact_email: string;
  created_at: string;
  currency: string;
  current_subtotal_price: string;
  current_subtotal_price_set: PriceSet;
  current_total_additional_fees_set: any;
  current_total_discounts: string;
  current_total_discounts_set: PriceSet;
  current_total_duties_set: any;
  current_total_price: string;
  current_total_price_set: PriceSet;
  current_total_tax: string;
  current_total_tax_set: PriceSet;
  customer_locale: string;
  device_id: any;
  discount_codes: any[];
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: string;
  landing_site: any;
  landing_site_ref: any;
  location_id: any;
  merchant_of_record_app_id: any;
  name: string;
  note: any;
  note_attributes: any[];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: any;
  original_total_duties_set: any;
  payment_gateway_names: string[];
  phone: any;
  po_number: any;
  presentment_currency: string;
  processed_at: any;
  reference: any;
  referring_site: any;
  source_identifier: any;
  source_name: string;
  source_url: any;
  subtotal_price: string;
  subtotal_price_set: PriceSet;
  tags: string;
  tax_exempt: boolean;
  tax_lines: any[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_discounts: string;
  total_discounts_set: PriceSet;
  total_line_items_price: string;
  total_line_items_price_set: PriceSet;
  total_outstanding: string;
  total_price: string;
  total_price_set: PriceSet;
  total_shipping_price_set: PriceSet;
  total_tax: string;
  total_tax_set: PriceSet;
  total_tip_received: string;
  total_weight: number;
  updated_at: string;
  user_id: any;
  billing_address: OrderMailingAddress;
  customer: Customer;
  discount_applications: any[];
  fulfillments: any[];
  line_items: LineItem[];
  payment_terms: any;
  refunds: any[];
  shipping_address: OrderMailingAddress;
  shipping_lines: ShippingLine[];
}

export interface Money {
  amount: string;
  currency_code: string;
}

export interface PriceSet {
  shop_money: Money;
  presentment_money: Money;
}

export interface Customer {
  id: number;
  email: string;
  accepts_marketing: boolean;
  created_at: any;
  updated_at: any;
  first_name: string;
  last_name: string;
  state: string;
  note: any;
  verified_email: boolean;
  multipass_identifier: any;
  tax_exempt: boolean;
  phone: any;
  email_marketing_consent: EmailMarketingConsent;
  sms_marketing_consent: any;
  tags: string;
  currency: string;
  accepts_marketing_updated_at: any;
  marketing_opt_in_level: any;
  tax_exemptions: any[];
  admin_graphql_api_id: string;
  default_address: DefaultAddress;
}

export interface EmailMarketingConsent {
  state: string;
  opt_in_level: any;
  consent_updated_at: any;
}

export interface DefaultAddress {
  id: number;
  customer_id: number;
  first_name: any;
  last_name: any;
  company: any;
  address1: string;
  address2: any;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  name: string;
  province_code: string;
  country_code: string;
  country_name: string;
  default: boolean;
}

export interface LineItem {
  id: number;
  admin_graphql_api_id: string;
  attributed_staffs: AttributedStaff[];
  fulfillable_quantity: number;
  fulfillment_service: string;
  fulfillment_status: any;
  gift_card: boolean;
  grams: number;
  name: string;
  price: string;
  price_set: PriceSet;
  product_exists: boolean;
  product_id: number;
  properties: any[];
  quantity: number;
  requires_shipping: boolean;
  sku: string;
  taxable: boolean;
  title: string;
  total_discount: string;
  total_discount_set: PriceSet;
  variant_id: number;
  variant_inventory_management: string;
  variant_title: any;
  vendor: any;
  tax_lines: any[];
  duties: any[];
  discount_allocations: any[];
}

export interface AttributedStaff {
  id: string;
  quantity: number;
}

export interface OrderMailingAddress {
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

export interface ShippingLine {
  id: number;
  admin_graphql_api_id: string;
  code: any;
  discount_allocations: any[];
  grams: number;
  phone: any;
  price: string;
  price_set: PriceSet;
  discount_source: any;
  discounted_price: string;
  discounted_price_set: PriceSet;
  markup: any;
  original_price: string;
  original_price_set: PriceSet;
  tax_lines: any[];
  title: string;
  source: string;
  carrier_identifier: any;
  requested_fulfillment_service_id: any;
  delivery_category: any;
}
