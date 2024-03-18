/**
 * Payload shape: https://shopify.dev/docs/api/admin-rest/2023-04/resources/webhook#event-topics-orders-edited
 */
export interface OrderEdit {
	order_edit: Order;
}

interface Order {
	id: number;
	app_id: number | null;
	created_at: string;
	notify_customer: boolean;
	order_id: number;
	staff_note: string;
	user_id: number | null;
	line_items: LineItems;
	discounts: Discounts;
	shipping_lines: ShippingLines;
}

interface LineItems {
	additions: LineItemChange[];
	removals: LineItemChange[];
}

interface LineItemChange {
	id: number;
	delta: number;
}

interface Discounts {
	line_item: DiscountLineItem;
}

interface DiscountLineItem {
	additions: any[];
	// you can add more properties here if there are any in the future
}

interface ShippingLines {
	additions: any[];
	// you can add more properties here if there are any in the future
}
