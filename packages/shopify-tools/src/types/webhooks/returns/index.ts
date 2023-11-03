import type { ReturnDeclineReason, ReturnReason, ReturnStatus } from '../../graphql.js';

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
