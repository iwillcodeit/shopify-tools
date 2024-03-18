/** The reason why the merchant declined a customer's return request. */
export enum ReturnDeclineReason {
  /** The return contains final sale items. */
  FinalSale = 'final_sale',
  /** The return is declined for another reason. */
  Other = 'other',
  /** The return period has ended. */
  ReturnPeriodEnded = 'return_period_ended',
}

/** The reason for returning the return line item. */
export enum ReturnReason {
  /** The item is returned because the buyer did not like the color. */
  Color = 'color',
  /** The item is returned because it is damaged or defective. */
  Defective = 'defective',
  /** The item is returned because it was not as described. */
  NotAsDescribed = 'not_as_described',
  /** The item is returned for another reason. For this value, a return reason note is also provided. */
  Other = 'other',
  /** The item is returned because the size was too large. */
  SizeTooLarge = 'size_too_large',
  /** The item is returned because the size was too small. */
  SizeTooSmall = 'size_too_small',
  /** The item is returned because the buyer did not like the style. */
  Style = 'style',
  /** The item is returned because of an unknown reason. */
  Unknown = 'unknown',
  /** The item is returned because the customer changed their mind. */
  Unwanted = 'unwanted',
  /** The item is returned because the customer received the wrong one. */
  WrongItem = 'wrong_item',
}

/** The status of a return. */
export enum ReturnStatus {
  /** The return has been canceled. */
  Canceled = 'canceled',
  /** The return has been completed. */
  Closed = 'closed',
  /** The return was declined. */
  Declined = 'declined',
  /** The return is in progress. */
  Open = 'open',
  /** The return was requested. */
  Requested = 'requested',
}

interface ReturnPayload {
  id: number;
  admin_graphql_api_id: string;
  status: ReturnStatus;
  total_return_line_items: number;
  name: string;
  order: {
    id: number;
    admin_graphql_api_id: string;
  };
  return_line_items: Array<{
    id: number;
    admin_graphql_api_id: string;
    fulfillment_line_item: {
      id: number;
      admin_graphql_api_id: string;
      line_item: {
        id: number;
        admin_graphql_api_id: string;
      };
    };
    quantity: number;
    return_reason: ReturnReason;
    return_reason_note?: string | null;
    customer_note?: string | null;
  }>;
}

export interface ReturnApprove extends ReturnPayload {
  status: ReturnStatus.Open;
}

export interface ReturnReopen {
  id: number;
  admin_graphql_api_id: string;
  status: 'open';
}

export interface ReturnClose {
  id: number;
  admin_graphql_api_id: string;
  status: 'close';
}

export interface ReturnCancel {
  id: number;
  admin_graphql_api_id: string;
  status: 'canceled';
}

export interface ReturnRequest extends ReturnPayload {
  status: ReturnStatus.Requested;
}

export interface ReturnDecline {
  id: number;
  admin_graphql_api_id: string;
  status: 'declined';
  decline: {
    reason: ReturnDeclineReason;
    note?: string | null;
  };
}
