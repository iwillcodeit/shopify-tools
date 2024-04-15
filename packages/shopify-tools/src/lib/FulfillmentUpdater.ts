import {
  FulfillmentOrderLineItemInput,
  FulfillmentTrackingInput,
  FulfillmentV2Input,
  FulfillOrdersMutation,
  FulfillOrdersMutationVariables,
  UpdateTrackingInfoMutation,
  UpdateTrackingInfoMutationVariables,
} from '../types/admin.types';
import { ApiClient } from '@shopify/graphql-client';
import { DeferredPromise } from '../utils/DeferredPromise';
import { ApiClientBatchRequestResponse, batchMutation } from './batch';
import { shallowEqual } from '../utils/object';
import * as FulfillmentTypes from '../types/fulfillment';

export interface FulfillmentProcessResponse {
  create: ApiClientBatchRequestResponse<FulfillOrdersMutation> | null | undefined;
  update: ApiClientBatchRequestResponse<UpdateTrackingInfoMutation> | null | undefined;
}

export type FulfillmentOrder = FulfillmentTypes.FulfillmentOrder & {
  fulfillments: Array<FulfillmentTypes.Fulfillment>;
};

// export type Fulfillment = FulfillmentOrder & {
//   fulfillments: Array<
//     FulfillmentTypes.Fulfillment & {
//       fulfillmentOrder: Array<FulfillmentTypes.FulfillmentLineItem>;
//     }
//   >;
// };

export class FulfillmentUpdater<
  Client extends ApiClient<any, any> = ApiClient
> extends DeferredPromise<FulfillmentProcessResponse> {
  private readonly client: Client;

  private fulfillmentsToCreate: Array<FulfillOrdersMutationVariables> = [];
  private fulfillmentsToUpdate: Array<UpdateTrackingInfoMutationVariables> = [];

  constructor(client: Client) {
    super();
    this.client = client;

    this.execute = this.execute.bind(this);
    this.setOrderTrackingInfo = this.setOrderTrackingInfo.bind(this);
    this.setFulfillmentTrackingInfo = this.setFulfillmentTrackingInfo.bind(this);
    this.createFulfillmentTrackingInfo = this.createFulfillmentTrackingInfo.bind(this);
    this.updateFulfillmentTrackingInfo = this.updateFulfillmentTrackingInfo.bind(this);
  }

  /**
   * Define the tracking info for all fulfillments within the fulfillmentOrder.
   *
   * If the order already has fulfillments, it will update the existing ones with the new data.
   * Else it will create a fulfillment for all the line items of the order.
   *
   * If you don't want to fulfill the whole order, you may use setFulfillmentTrackingInfo
   */
  public setOrderTrackingInfo(
    fulfillmentOrder: FulfillmentOrder,
    trackingInfo: FulfillmentTrackingInput | null | undefined = null,
    notifyCustomer = true
  ): this {
    // If the order has no fulfillment
    if (fulfillmentOrder.fulfillments.length === 0) {
      // Create fulfillment
      // And if STACI provides a tracking url
      // Then, add tracking info at creation

      const fulfillmentOrderId = fulfillmentOrder.id;

      if (trackingInfo) {
        this.fulfillmentsToCreate.push({
          fulfillment: {
            lineItemsByFulfillmentOrder: [{ fulfillmentOrderId }],
            trackingInfo,
            notifyCustomer,
          },
        });
      } else {
        this.fulfillmentsToCreate.push({
          fulfillment: {
            lineItemsByFulfillmentOrder: [{ fulfillmentOrderId }],
            notifyCustomer: false,
          },
        });
      }
    } else if (trackingInfo) {
      for (const fulfillment of fulfillmentOrder.fulfillments) {
        const fulfillmentId = fulfillment.id;
        if (!shallowEqual(trackingInfo, fulfillment.trackingInfo[0])) {
          // Then, update current fulfillment to replace tracking url
          this.fulfillmentsToUpdate.push({
            fulfillmentId,
            trackingInfo,
            notifyCustomer,
          });
        }
      }
    }

    return this;
  }

  public setFulfillmentTrackingInfo(
    fulfillmentOrderId: string,
    /**
     * If the fulfillment already exists, and you want to edit it
     */
    fulfillment: string | FulfillmentTypes.Fulfillment,
    params: Pick<UpdateTrackingInfoMutationVariables, 'trackingInfo' | 'notifyCustomer'>
  ): this;
  public setFulfillmentTrackingInfo(
    fulfillmentOrderId: string,
    /**
     * If the fulfillment does not exist yet
     */
    lineItemsId: Array<FulfillmentOrderLineItemInput>,
    params: Pick<FulfillmentV2Input, 'trackingInfo' | 'originAddress' | 'notifyCustomer'>
  ): this;
  public setFulfillmentTrackingInfo(
    fulfillmentOrderId: string,
    fulfillmentIdOrLineItemsId: string | FulfillmentTypes.Fulfillment | Array<FulfillmentOrderLineItemInput>,
    params:
      | Pick<FulfillmentV2Input, 'trackingInfo' | 'originAddress' | 'notifyCustomer'>
      | Pick<UpdateTrackingInfoMutationVariables, 'trackingInfo' | 'notifyCustomer'>
  ): this {
    if (Array.isArray(fulfillmentIdOrLineItemsId)) {
      return this.createFulfillmentTrackingInfo(
        fulfillmentOrderId,
        fulfillmentIdOrLineItemsId,
        params as Pick<FulfillmentV2Input, 'trackingInfo' | 'originAddress' | 'notifyCustomer'>
      );
    } else {
      return this.updateFulfillmentTrackingInfo(
        fulfillmentOrderId,
        fulfillmentIdOrLineItemsId,
        params as Pick<UpdateTrackingInfoMutationVariables, 'trackingInfo' | 'notifyCustomer'>
      );
    }
  }

  public createFulfillmentTrackingInfo(
    fulfillmentOrderId: string,
    /**
     * If the fulfillment does not exist yet
     */
    lineItems: Array<FulfillmentOrderLineItemInput>,
    params: Pick<FulfillmentV2Input, 'trackingInfo' | 'originAddress' | 'notifyCustomer'>
  ) {
    if (!Array.isArray(lineItems)) throw new TypeError('lineItemsId can only be an array of string');

    this.fulfillmentsToCreate.push({
      fulfillment: {
        lineItemsByFulfillmentOrder: [
          {
            fulfillmentOrderId,
            fulfillmentOrderLineItems: lineItems,
          },
        ],
        ...params,
      },
    });

    return this;
  }
  public updateFulfillmentTrackingInfo(
    fulfillmentOrderId: string,
    /**
     * If the fulfillment already exists, and you want to edit it
     */
    fulfillment: string | FulfillmentTypes.Fulfillment,
    params: Pick<UpdateTrackingInfoMutationVariables, 'trackingInfo' | 'notifyCustomer'>
  ) {
    let fulfillmentId: string;
    if (typeof fulfillment === 'object') {
      if (shallowEqual(params.trackingInfo, fulfillment.trackingInfo[0])) {
        return this;
      }

      fulfillmentId = fulfillment.id;
    } else if (typeof fulfillment === 'string') {
      fulfillmentId = fulfillment;
    } else {
      throw new TypeError('fulfillmentId should be a string');
    }

    this.fulfillmentsToUpdate.push({
      fulfillmentId,
      ...params,
    });

    return this;
  }

  public async execute(): Promise<FulfillmentProcessResponse> {
    const responses: FulfillmentProcessResponse = {
      create: null,
      update: null,
    };

    if (this.fulfillmentsToCreate.length > 0) {
      responses.create = await batchMutation(this.client, FULFILL_ORDER, this.fulfillmentsToCreate);
      if (responses.create.errors.length > 0) {
        responses.create.errors.forEach(console.error);
      }
    }

    if (this.fulfillmentsToUpdate.length > 0) {
      responses.update = await batchMutation(this.client, UPDATE_TRACKING_INFO, this.fulfillmentsToUpdate);
      if (responses.update.errors.length > 0) {
        responses.update.errors.forEach(console.error);
      }
    }

    return responses;
  }
}

export const UPDATE_TRACKING_INFO = /* GraphQL */ `
  mutation UpdateTrackingInfo(
    $fulfillmentId: ID!
    $trackingInfo: FulfillmentTrackingInput!
    $notifyCustomer: Boolean = true
  ) {
    fulfillmentTrackingInfoUpdateV2(
      fulfillmentId: $fulfillmentId
      notifyCustomer: $notifyCustomer
      trackingInfoInput: $trackingInfo
    ) {
      userErrors {
        field
        message
      }
    }
  }
`;
export const FULFILL_ORDER = /* GraphQL */ `
  mutation FulfillOrders($fulfillment: FulfillmentV2Input!) {
    fulfillmentCreateV2(fulfillment: $fulfillment) {
      fulfillment {
        id
      }
      userErrors {
        message
      }
    }
  }
`;
