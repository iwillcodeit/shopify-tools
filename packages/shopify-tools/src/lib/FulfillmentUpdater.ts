import {
  FulfillmentOrderCancelMutation,
  FulfillmentOrderCancelMutationVariables,
  FulfillmentOrderHoldInput,
  FulfillmentOrderHoldMutation,
  FulfillmentOrderHoldMutationVariables,
  FulfillmentOrderLineItemInput,
  FulfillmentOrdersReleaseHoldsMutation,
  FulfillmentOrdersSetFulfillmentDeadlineMutation,
  FulfillmentOrdersSetFulfillmentDeadlineMutationVariables,
  FulfillmentTrackingInput,
  FulfillmentV2Input,
  FulfillOrdersMutation,
  FulfillOrdersMutationVariables,
  UpdateTrackingInfoMutation,
  UpdateTrackingInfoMutationVariables,
} from '../types/admin.types';
import { ApiClient, ClientResponse } from '@shopify/graphql-client';
import { DeferredPromise } from '../utils/DeferredPromise';
import { ApiClientBatchRequestResponse, batchMutation } from './batch';
import * as FulfillmentTypes from '../types/fulfillment';
import { compareTrackingInfo } from '../utils/fulfillments';
import { RequireField } from '../types';

export interface FulfillmentProcessResponse {
  create: ApiClientBatchRequestResponse<FulfillOrdersMutation> | null | undefined;
  update: ApiClientBatchRequestResponse<UpdateTrackingInfoMutation> | null | undefined;
  hold: ApiClientBatchRequestResponse<FulfillmentOrderHoldMutation> | null | undefined;
  released: ClientResponse<FulfillmentOrdersReleaseHoldsMutation> | null | undefined;
  cancel: ApiClientBatchRequestResponse<FulfillmentOrderCancelMutation> | null | undefined;
  setDeadline: ApiClientBatchRequestResponse<FulfillmentOrdersSetFulfillmentDeadlineMutation> | null | undefined;
}

export type FulfillmentOrder = Pick<FulfillmentTypes.FulfillmentOrder, 'id'> & {
  fulfillments: Array<RequireField<FulfillmentTypes.Fulfillment, 'id', 'trackingInfo'>>;
} & Record<string, any>;

export class FulfillmentUpdater<
  Client extends ApiClient<any, any> = ApiClient
> extends DeferredPromise<FulfillmentProcessResponse> {
  private readonly client: Client;

  private fulfillmentsToCreate: Array<FulfillOrdersMutationVariables> = [];
  private fulfillmentsToUpdate: Array<UpdateTrackingInfoMutationVariables> = [];
  private fulfillmentOrderToHold: Array<FulfillmentOrderHoldMutationVariables> = [];
  private fulfillmentOrdersToRelease = new Set<string>();
  private fulfillmentOrdersToCancel: Array<FulfillmentOrderCancelMutationVariables> = [];
  private fulfillmentOrdersToSetDeadline: Array<FulfillmentOrdersSetFulfillmentDeadlineMutationVariables> = [];

  constructor(client: Client) {
    super();
    this.client = client;

    this.execute = this.execute.bind(this);
    this.setOrderTrackingInfo = this.setOrderTrackingInfo.bind(this);
    this.setFulfillmentTrackingInfo = this.setFulfillmentTrackingInfo.bind(this);
    this.createFulfillmentTrackingInfo = this.createFulfillmentTrackingInfo.bind(this);
    this.updateFulfillmentTrackingInfo = this.updateFulfillmentTrackingInfo.bind(this);
    this.holdFulfillmentOrder = this.holdFulfillmentOrder.bind(this);
    this.releaseFulfillmentOrderHolds = this.releaseFulfillmentOrderHolds.bind(this);
    this.cancelFulfillmentOrder = this.cancelFulfillmentOrder.bind(this);
    this.setFulfillmentDeadline = this.setFulfillmentDeadline.bind(this);
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
        if (fulfillment.trackingInfo) {
          if (compareTrackingInfo(trackingInfo, fulfillment.trackingInfo)) {
            return this;
          }
        }

        // Then, update current fulfillment to replace tracking url
        this.fulfillmentsToUpdate.push({
          fulfillmentId: fulfillment.id,
          trackingInfo,
          notifyCustomer,
        });
      }
    }

    return this;
  }

  public setFulfillmentTrackingInfo(
    fulfillmentOrderId: string,
    /**
     * If the fulfillment already exists, and you want to edit it
     */
    fulfillment: string | RequireField<FulfillmentTypes.Fulfillment, 'id', 'trackingInfo'>,
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
    fulfillmentIdOrLineItemsId:
      | string
      | RequireField<FulfillmentTypes.Fulfillment, 'id', 'trackingInfo'>
      | Array<FulfillmentOrderLineItemInput>,
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
    fulfillment: string | RequireField<FulfillmentTypes.Fulfillment, 'id', 'trackingInfo'>,
    params: Pick<UpdateTrackingInfoMutationVariables, 'trackingInfo' | 'notifyCustomer'>
  ) {
    let fulfillmentId: string;
    if (typeof fulfillment === 'object') {
      if (fulfillment.trackingInfo) {
        if (compareTrackingInfo(params.trackingInfo, fulfillment.trackingInfo)) {
          return this;
        }
      }

      fulfillmentId = fulfillment.id;
    } else if (typeof fulfillment === 'string') {
      fulfillmentId = fulfillment;
    } else {
      throw new TypeError('fulfillmentId should be a string or a Fulfillment object');
    }

    this.fulfillmentsToUpdate.push({
      fulfillmentId,
      ...params,
    });

    return this;
  }

  public holdFulfillmentOrder(
    fulfillmentOrder: string | RequireField<FulfillmentTypes.FulfillmentOrder, 'id', 'fulfillmentHolds'>,
    fulfillmentHold: FulfillmentOrderHoldInput
  ) {
    let fulfillmentOrderId: string;

    if (typeof fulfillmentOrder === 'object') {
      if (fulfillmentOrder.fulfillmentHolds) {
        const lastHold = fulfillmentOrder.fulfillmentHolds.at(-1);
        if (lastHold?.reason === fulfillmentHold.reason && lastHold?.reasonNotes === fulfillmentHold.reasonNotes) {
          return this;
        }
      }

      fulfillmentOrderId = fulfillmentOrder.id;
    } else if (typeof fulfillmentOrder === 'string') {
      fulfillmentOrderId = fulfillmentOrder;
    } else {
      throw new TypeError('fulfillmentOrderId should be a string or a FulfillmentOrder object');
    }

    this.fulfillmentOrderToHold.push({
      fulfillmentHold,
      id: fulfillmentOrderId,
    });

    return this;
  }

  public releaseFulfillmentOrderHolds(fulfillmentOrderIds: string | string[]) {
    if (typeof fulfillmentOrderIds === 'string') {
      this.fulfillmentOrdersToRelease.add(fulfillmentOrderIds);
    } else if (Array.isArray(fulfillmentOrderIds)) {
      for (const id of fulfillmentOrderIds) {
        this.fulfillmentOrdersToRelease.add(id);
      }
    } else {
      throw new TypeError('fulfillmentOrderIds should be a string or an array of string');
    }

    return this;
  }

  public cancelFulfillmentOrder(
    fulfillmentOrder: string | RequireField<FulfillmentTypes.FulfillmentOrder, 'id', 'status'>
  ) {
    let fulfillmentOrderId: string;
    if (typeof fulfillmentOrder === 'object') {
      if (fulfillmentOrder.status === 'CANCELLED') {
        return this;
      }

      fulfillmentOrderId = fulfillmentOrder.id;
    } else if (typeof fulfillmentOrder === 'string') {
      fulfillmentOrderId = fulfillmentOrder;
    } else {
      throw new TypeError('fulfillmentOrderId should be a string or a FulfillmentOrder object');
    }

    this.fulfillmentOrdersToCancel.push({
      id: fulfillmentOrderId,
    });

    return this;
  }

  // TODO : optimize the method using an array of fulfillmentOrderIds to batch per request sharing the same deadline
  // Store a Map<string,Array<string>> where the key is an ISO string representation of the Date. And the value is an array of fulfillmentOrderIds
  public setFulfillmentDeadline(
    fulfillmentOrderIds: string | string[] | (Pick<FulfillmentTypes.FulfillmentOrder, 'id'> & Record<string, any>),
    fulfillmentDeadline: Date
  ) {
    let fulfillmentOrderId: string | Array<string>;
    if (Array.isArray(fulfillmentOrderIds)) {
      fulfillmentOrderId = fulfillmentOrderIds;
    } else if (typeof fulfillmentOrderIds === 'object') {
      fulfillmentOrderId = fulfillmentOrderIds.id;
    } else if (typeof fulfillmentOrderIds === 'string') {
      fulfillmentOrderId = fulfillmentOrderIds;
    } else {
      throw new TypeError('fulfillmentOrderIds should be a string or a FulfillmentOrder object');
    }

    this.fulfillmentOrdersToSetDeadline.push({
      fulfillmentDeadline,
      fulfillmentOrderIds: fulfillmentOrderId,
    });

    return this;
  }

  public async execute(): Promise<FulfillmentProcessResponse> {
    const responses: FulfillmentProcessResponse = {
      create: null,
      update: null,
      hold: null,
      released: null,
      cancel: null,
      setDeadline: null,
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

    if (this.fulfillmentOrderToHold.length > 0) {
      responses.hold = await batchMutation(this.client, FULFILLMENT_ORDER_HOLD, this.fulfillmentOrderToHold);
      if (responses.hold.errors.length > 0) {
        responses.hold.errors.forEach(console.error);
      }
    }

    if (this.fulfillmentOrdersToRelease.size > 0) {
      responses.released = await this.client.request<FulfillmentOrdersReleaseHoldsMutation>(
        FULFILLMENT_ORDER_HOLD_RELEASE
      );
      if (responses.released.errors) {
        console.error(responses.released.errors);
      }
    }

    if (this.fulfillmentOrdersToCancel.length > 0) {
      responses.cancel = await batchMutation(this.client, FULFILLMENT_ORDER_CANCEL, this.fulfillmentOrdersToCancel);
      if (responses.cancel.errors.length > 0) {
        responses.cancel.errors.forEach(console.error);
      }
    }

    if (this.fulfillmentOrdersToSetDeadline.length > 0) {
      responses.setDeadline = await batchMutation(
        this.client,
        FULFILLMENT_ORDER_SET_DEADLINE,
        this.fulfillmentOrdersToSetDeadline
      );
      if (responses.setDeadline.errors.length > 0) {
        responses.setDeadline.errors.forEach(console.error);
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

export const FULFILLMENT_ORDER_HOLD = /* GraphQL */ `
  mutation fulfillmentOrderHold($fulfillmentHold: FulfillmentOrderHoldInput!, $id: ID!) {
    fulfillmentOrderHold(fulfillmentHold: $fulfillmentHold, id: $id) {
      userErrors {
        field
        message
      }
    }
  }
`;

export const FULFILLMENT_ORDER_HOLD_RELEASE = /* GraphQL */ `
  mutation fulfillmentOrdersReleaseHolds($ids: [ID!]!) {
    fulfillmentOrdersReleaseHolds(ids: $ids) {
      job {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const FULFILLMENT_ORDER_CANCEL = /* GraphQL */ `
  mutation fulfillmentOrderCancel($id: ID!) {
    fulfillmentOrderCancel(id: $id) {
      fulfillmentOrder {
        id
      }
      replacementFulfillmentOrder {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const FULFILLMENT_ORDER_SET_DEADLINE = /* GraphQL */ `
  mutation fulfillmentOrdersSetFulfillmentDeadline($fulfillmentDeadline: DateTime!, $fulfillmentOrderIds: [ID!]!) {
    fulfillmentOrdersSetFulfillmentDeadline(
      fulfillmentDeadline: $fulfillmentDeadline
      fulfillmentOrderIds: $fulfillmentOrderIds
    ) {
      success
      userErrors {
        field
        message
      }
    }
  }
`;
