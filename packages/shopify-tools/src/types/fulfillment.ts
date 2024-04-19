import type { GetOrdersFulfillmentsQuery } from './admin.types';

/**
 * This query is not explicitly used here. It serves for the generation of the required types for the FulfillmentUpdater
 */
export const GET_ORDERS_FULFILLMENTS = /* GraphQL */ `
  query GetOrdersFulfillments($id: ID!) {
    fulfillmentOrder(id: $id) {
      id
      fulfillmentHolds {
        reason
        reasonNotes
      }
      status
      fulfillments {
        edges {
          node {
            id
            trackingInfo {
              company
              number
              url
            }
          }
        }
      }
    }
  }
`;

export type FulfillmentOrder = Exclude<GetOrdersFulfillmentsQuery['fulfillmentOrder'], null | undefined>;
export type Fulfillment = FulfillmentOrder['fulfillments']['edges'][number]['node'];
export type TrackingInfo = Fulfillment['trackingInfo'][number];
