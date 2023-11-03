export type ProductCreate = {
  admin_graphql_api_id: string;
  body_html: string;
  created_at: string;
  handle: string;
  id: number;
  product_type: string;
  published_at: string;
  template_suffix: string | null;
  title: string;
  updated_at: string;
  vendor: string;
  status: string;
  published_scope: string;
  tags: string;
  variants: Variant[];
  options: Option[];
  images: Image[];
  image: Image | null;
};

type Option = {
  id: number;
  product_id: number;
  position: number;
  name: string;
  values: string[];
};

type Image = {
  id: number;
  admin_graphql_api_id: string;
  position: number;
  product_id: number;
  width: number;
  height: number;
  alt: string | null | undefined;
  src: string;
  created_at: string;
  updated_at: string;
  variant_ids: number[];
};

type Variant = {
  admin_graphql_api_id: string;
  barcode: string | null;
  compare_at_price: string;
  created_at: string | null;
  fulfillment_service: string;
  id: number;
  inventory_management: string;
  inventory_policy: string;
  position: number;
  price: string;
  product_id: number;
  sku: string;
  taxable: boolean;
  title: string;
  updated_at: string | null;
  option1: string;
  option2: string | null;
  option3: string | null;
  grams: number;
  image_id: number | null;
  weight: number;
  weight_unit: string;
  inventory_item_id: number | null;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
};
