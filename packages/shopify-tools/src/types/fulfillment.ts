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
      fulfillments {
        edges {
          node {
            id
            trackingInfo {
              company
              number
              url
            }
            fulfillmentLineItems {
              edges {
                node {
                  id
                  quantity
                  lineItem {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type FulfillmentOrder = Omit<
  Exclude<GetOrdersFulfillmentsQuery['fulfillmentOrder'], null | undefined>,
  'fulfillments' | 'fulfillmentHolds'
>;
export type FulfillmentOrderToHold = Pick<
  Exclude<GetOrdersFulfillmentsQuery['fulfillmentOrder'], null | undefined>,
  'id' | 'fulfillmentHolds'
>;
export type Fulfillment = Omit<
  Exclude<GetOrdersFulfillmentsQuery['fulfillmentOrder'], null | undefined>['fulfillments']['edges'][number]['node'],
  'fulfillmentLineItems'
>;
export type FulfillmentLineItem = Exclude<
  GetOrdersFulfillmentsQuery['fulfillmentOrder'],
  null | undefined
>['fulfillments']['edges'][number]['node']['fulfillmentLineItems']['edges'][number]['node'];
