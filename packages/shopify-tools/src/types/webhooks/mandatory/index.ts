export interface CustomersDataRequest {
  shop_id: number;
  shop_domain: `${string}.myshopify.com`;
  orders_requested: number[];
  customer: {
    id: number;
    email: string;
    phone: string;
  };
  data_request: {
    id: number;
  };
}

export interface CustomersRedact {
  shop_id: number;
  shop_domain: `${string}.myshopify.com`;
  customer: {
    id: number;
    email: string;
    phone: string;
  };
  orders_to_redact: number[];
}

export interface ShopRedact {
  shop_id: number;
  shop_domain: `${string}.myshopify.com`;
}
