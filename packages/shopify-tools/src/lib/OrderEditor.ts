import { DeferredPromise } from '../utils/DeferredPromise';
import type {
  OrderEditAddCustomItemMutation,
  OrderEditAddCustomItemMutationVariables,
  OrderEditAddLineItemDiscountMutation,
  OrderEditAddLineItemDiscountMutationVariables,
  OrderEditAddVariantMutation,
  OrderEditAddVariantMutationVariables,
  OrderEditBeginMutation,
  OrderEditBeginMutationVariables,
  OrderEditCommitMutation,
  OrderEditCommitMutationVariables,
  OrderEditRemoveLineItemDiscountMutation,
  OrderEditRemoveLineItemDiscountMutationVariables,
  OrderEditSetQuantityMutation,
  OrderEditSetQuantityMutationVariables,
} from '../types/admin.types';

import Debug from 'debug';
import { ApiClientBatchRequestResponse, batchMutation } from './batch';
import { ApiClient } from '@shopify/graphql-client';
const debug = Debug('shopify-tools:order-editor');

export interface OrderEditionResult {
  results: {
    begin: OrderEditBeginMutation;
    commit: OrderEditCommitMutation;
    addVariant: ApiClientBatchRequestResponse<OrderEditAddVariantMutation> | null;
    addCustomItem: ApiClientBatchRequestResponse<OrderEditAddCustomItemMutation> | null;
    addLineItemDiscount: ApiClientBatchRequestResponse<OrderEditAddLineItemDiscountMutation> | null;
    removeLineItemDiscount: ApiClientBatchRequestResponse<OrderEditRemoveLineItemDiscountMutation> | null;
    setQuantity: ApiClientBatchRequestResponse<OrderEditSetQuantityMutation> | null;
  };
}
export type OrderEditValue<T> =
  | Array<Omit<T, 'calculatedOrderId'>>
  | Omit<T, 'calculatedOrderId'>
  | ((
      calculatedOrderId: string
    ) => OrderEditValue<Omit<T, 'calculatedOrderId'>> | Promise<OrderEditValue<Omit<T, 'calculatedOrderId'>>>);
export type ExtractOrderEditValue<T> = T extends OrderEditValue<infer U> ? U : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFunction(fn: unknown): fn is (...args: any[]) => any {
  return typeof fn === 'function';
}

export function editOrder(...args: ConstructorParameters<typeof OrderEditor>): OrderEditor {
  return new OrderEditor(...args);
}

export class OrderEditor extends DeferredPromise<OrderEditionResult> {
  [Symbol.toStringTag] = 'OrderEditor';

  private readonly client;
  private readonly orderId;

  private _calculatedOrderId?: string;
  private _notifyCustomer = false;
  private _staffNote?: string;

  private _addVariant: Array<OrderEditValue<OrderEditAddVariantMutationVariables>> = [];
  private _addCustomItem: Array<OrderEditValue<OrderEditAddCustomItemMutationVariables>> = [];
  private _addLineItemDiscount: Array<OrderEditValue<OrderEditAddLineItemDiscountMutationVariables>> = [];
  private _removeLineItemDiscount: Array<OrderEditValue<OrderEditRemoveLineItemDiscountMutationVariables>> = [];
  private _setQuantity: Array<OrderEditValue<OrderEditSetQuantityMutationVariables>> = [];

  constructor(client: ApiClient, orderId: string) {
    super();
    this.client = client;
    this.orderId = orderId;

    this.notifyCustomer.bind(this);
    this.staffNote.bind(this);
    this.addVariant.bind(this);
    this.addCustomItem.bind(this);
    this.addLineItemDiscount.bind(this);
    this.removeLineItemDiscount.bind(this);
    this.setQuantity.bind(this);
    this.computeValues.bind(this);
    this.execute.bind(this);
  }

  public notifyCustomer(notifyCustomer = true) {
    this._notifyCustomer = notifyCustomer;
    return this;
  }
  public staffNote(staffNote: string) {
    this._staffNote = staffNote;
    return this;
  }
  public addVariant(values: OrderEditValue<OrderEditAddVariantMutationVariables>) {
    this._addVariant.push(values);
    return this;
  }
  public addCustomItem(values: OrderEditValue<OrderEditAddCustomItemMutationVariables>) {
    this._addCustomItem.push(values);
    return this;
  }
  public addLineItemDiscount(values: OrderEditValue<OrderEditAddLineItemDiscountMutationVariables>) {
    this._addLineItemDiscount.push(values);
    return this;
  }
  public removeLineItemDiscount(values: OrderEditValue<OrderEditRemoveLineItemDiscountMutationVariables>) {
    this._removeLineItemDiscount.push(values);
    return this;
  }
  public setQuantity(values: OrderEditValue<OrderEditSetQuantityMutationVariables>) {
    this._setQuantity.push(values);
    return this;
  }

  private async computeValues<T>(values: T): Promise<Array<T>> {
    if (!this._calculatedOrderId) {
      throw new Error('Cannot compute values before order edition has been initialized.');
    }

    if (Array.isArray(values)) {
      const valuesArray = await Promise.all(values.map((v) => this.computeValues(v)));
      return valuesArray.flat();
    }

    if (isFunction(values)) {
      const returnedValues = await values(this._calculatedOrderId);
      return await this.computeValues(returnedValues);
    }

    return [{ calculatedOrderId: this._calculatedOrderId, ...values }];
  }

  async execute(): Promise<OrderEditionResult> {
    debug('Starting order edition on order %s', this.orderId);
    const { data: begin } = await this.client.request<OrderEditBeginMutation>(ORDER_EDIT_BEGIN, {
      variables: {
        orderId: this.orderId,
      } satisfies OrderEditBeginMutationVariables,
    });

    if (!begin?.orderEditBegin?.calculatedOrder?.id) {
      throw new Error('Failed to start edition: no calculatedId.');
    }
    this._calculatedOrderId = begin.orderEditBegin.calculatedOrder.id;

    debug('Edition on order %s stared calculating on %s', this.orderId, this._calculatedOrderId);
    let addVariant = null;
    if (this._addVariant.length > 0) {
      debug('Edition on order %s executing addVariant for %d items', this._calculatedOrderId, this._addVariant.length);
      addVariant = await batchMutation(this.client, ORDER_EDIT_ADD_VARIANT, await this.computeValues(this._addVariant));
    }

    let addCustomItem = null;
    if (this._addCustomItem.length > 0) {
      debug(
        'Edition on order %s executing addCustomItem for %d items',
        this._calculatedOrderId,
        this._addCustomItem.length
      );
      addCustomItem = await batchMutation(
        this.client,
        ORDER_EDIT_ADD_CUSTOM_ITEM,
        await this.computeValues(this._addCustomItem)
      );
    }

    let addLineItemDiscount = null;
    if (this._addLineItemDiscount.length > 0) {
      debug(
        'Edition on order %s executing addLineItemDiscount for %d items',
        this._calculatedOrderId,
        this._addLineItemDiscount.length
      );
      addLineItemDiscount = await batchMutation(
        this.client,
        ORDER_EDIT_ADD_LINE_ITEM_DISCOUNT,
        await this.computeValues(this._addLineItemDiscount)
      );
    }

    let removeLineItemDiscount = null;
    if (this._removeLineItemDiscount.length > 0) {
      debug(
        'Edition on order %s executing removeLineItemDiscount for %d items',
        this._calculatedOrderId,
        this._removeLineItemDiscount.length
      );
      removeLineItemDiscount = await batchMutation(
        this.client,
        ORDER_EDIT_REMOVE_LINE_ITEM_DISCOUNT,
        await this.computeValues(this._removeLineItemDiscount)
      );
    }

    let setQuantity = null;
    if (this._setQuantity.length > 0) {
      debug(
        'Edition on order %s executing setQuantity for %d items',
        this._calculatedOrderId,
        this._setQuantity.length
      );
      setQuantity = await batchMutation(
        this.client,
        ORDER_EDIT_SET_QUANTITY,
        await this.computeValues(this._setQuantity)
      );
    }

    debug('Committing edition for %s', this._calculatedOrderId);
    const { data: commit } = await this.client.request<OrderEditCommitMutation>(ORDER_EDIT_COMMIT, {
      variables: {
        calculatedOrderId: this._calculatedOrderId,
        notifyCustomer: this._notifyCustomer,
        staffNote: this._staffNote,
      } satisfies OrderEditCommitMutationVariables,
    });

    if (!commit) {
      throw new Error('Failed to commit edition');
    }

    debug('Committed edition for %s', this._calculatedOrderId);
    return {
      results: {
        begin,
        commit,
        setQuantity,
        removeLineItemDiscount,
        addVariant,
        addCustomItem,
        addLineItemDiscount,
      },
    };
  }
}
const ORDER_EDIT_BEGIN = /* GraphQL */ `
  mutation orderEditBegin($orderId: ID!) {
    orderEditBegin(id: $orderId) {
      calculatedOrder {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
const ORDER_EDIT_COMMIT = /* GraphQL */ `
  mutation orderEditCommit($calculatedOrderId: ID!, $notifyCustomer: Boolean!, $staffNote: String) {
    orderEditCommit(id: $calculatedOrderId, notifyCustomer: $notifyCustomer, staffNote: $staffNote) {
      order {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
const ORDER_EDIT_ADD_VARIANT = /* GraphQL */ `
  mutation orderEditAddVariant($calculatedOrderId: ID!, $variantId: ID!, $quantity: Int!) {
    orderEditAddVariant(id: $calculatedOrderId, variantId: $variantId, quantity: $quantity) {
      userErrors {
        field
        message
      }
    }
  }
`;
const ORDER_EDIT_ADD_CUSTOM_ITEM = /* GraphQL */ `
  mutation orderEditAddCustomItem(
    $calculatedOrderId: ID!
    $locationId: ID
    $price: MoneyInput!
    $quantity: Int!
    $requiresShipping: Boolean
    $taxable: Boolean
    $title: String!
  ) {
    orderEditAddCustomItem(
      id: $calculatedOrderId
      locationId: $locationId
      price: $price
      quantity: $quantity
      requiresShipping: $requiresShipping
      taxable: $taxable
      title: $title
    ) {
      userErrors {
        field
        message
      }
    }
  }
`;
const ORDER_EDIT_ADD_LINE_ITEM_DISCOUNT = /* GraphQL */ `
  mutation orderEditAddLineItemDiscount(
    $calculatedOrderId: ID!
    $discount: OrderEditAppliedDiscountInput!
    $lineItemId: ID!
  ) {
    orderEditAddLineItemDiscount(id: $calculatedOrderId, discount: $discount, lineItemId: $lineItemId) {
      userErrors {
        field
        message
      }
    }
  }
`;
const ORDER_EDIT_REMOVE_LINE_ITEM_DISCOUNT = /* GraphQL */ `
  mutation orderEditRemoveLineItemDiscount($calculatedOrderId: ID!, $discountApplicationId: ID!) {
    orderEditRemoveLineItemDiscount(id: $calculatedOrderId, discountApplicationId: $discountApplicationId) {
      userErrors {
        field
        message
      }
    }
  }
`;
const ORDER_EDIT_SET_QUANTITY = /* GraphQL */ `
  mutation orderEditSetQuantity($calculatedOrderId: ID!, $lineItemId: ID!, $quantity: Int!, $restock: Boolean) {
    orderEditSetQuantity(id: $calculatedOrderId, lineItemId: $lineItemId, quantity: $quantity, restock: $restock) {
      userErrors {
        field
        message
      }
    }
  }
`;
