import { describe, expect, beforeEach, it, vi } from 'vitest';
import * as batch from '../src/lib/batch';
import * as shopifyApi from '@shopify/admin-api-client';
const { createAdminApiClient } = shopifyApi
const { batchMutation } = batch

vi.mock('@shopify/admin-api-client', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@shopify/admin-api-client')>()
  
  return {
    ...mod,
    createAdminApiClient: mod.createAdminApiClient
  }
})

const batchMutationSpy = vi.fn(batchMutation).mockImplementation(async () => ({
  data: [],
  errors: [],
}));

enum FulfillmentHoldReason {
  INVENTORY_OUT_OF_STOCK = 'INVENTORY_OUT_OF_STOCK',
  // other reasons...
}

const apiClient = createAdminApiClient({
  accessToken: 'toto',
  apiVersion: '2024-01',
  storeDomain: 'test.myshopify.com',
});

// const requestSpy = vi.spyOn(apiClient, 'request').mockImplementation(async () => ({ data: null }))

import { FulfillmentUpdater, FULFILLMENT_ORDER_HOLD, FULFILLMENT_ORDER_HOLD_RELEASE, FULFILLEMENT_ORDER_CANCEL, FULFILLEMENT_ORDER_SET_DEADLINE } from '../src/lib/FulfillmentUpdater';

describe('FulfillmentUpdater', () => {
  let fulfillmentUpdater: FulfillmentUpdater;

  beforeEach(() => {
    fulfillmentUpdater = new FulfillmentUpdater(apiClient);
  });

  afterEach(() => {
    vi.clearAllMocks()
  });

  describe('holdFulfillmentOrder', () => {
    it('should be in holding state, with fulfillmentOrder as a string', async (): Promise<void> => {
      const fulfillmentOrder = 'someId';
      const fulfillmentHold = { reason: FulfillmentHoldReason.INVENTORY_OUT_OF_STOCK, reasonNotes: 'optionnal comment' };

      await fulfillmentUpdater.holdFulfillmentOrder(
        fulfillmentOrder,
        fulfillmentHold
      ).execute()

      // TODO : https://stackoverflow.com/questions/76436481/vitest-how-can-i-mock-a-function-that-the-function-being-tested-uses
      expect(batchMutationSpy).toBeCalledWith(apiClient, FULFILLMENT_ORDER_HOLD, [
        {
          fulfillmentHold,
          id: fulfillmentOrder,
        }
      ])
    });

    it('should be in holding state, with fulfillmentOrder as an object', async (): Promise<void> => {
      const fulfillmentOrder = { id: 'someId', fulfillmentHolds: [ { reason: FulfillmentHoldReason.INVENTORY_OUT_OF_STOCK, reasonNotes: 'different notes' } ] };
      const fulfillmentHold = { reason: FulfillmentHoldReason.INVENTORY_OUT_OF_STOCK, reasonNotes: 'optionnal comment' };

      await fulfillmentUpdater.holdFulfillmentOrder(
        fulfillmentOrder,
        fulfillmentHold
      ).execute()

      expect(batchMutationSpy).toBeCalledWith(apiClient, FULFILLMENT_ORDER_HOLD, [
        {
          fulfillmentHold,
          id: fulfillmentOrder,
        }
      ])
    });

    it('should not be called, with fulfillmentOrder as an object with exact same reasons', async (): Promise<void> => {
      const fulfillmentOrder = { id: 'someId', fulfillmentHolds: [ { reason: FulfillmentHoldReason.INVENTORY_OUT_OF_STOCK, reasonNotes: 'optionnal comment' } ] };
      const fulfillmentHold = { reason: FulfillmentHoldReason.INVENTORY_OUT_OF_STOCK, reasonNotes: 'optionnal comment' };

      await fulfillmentUpdater.holdFulfillmentOrder(
        fulfillmentOrder,
        fulfillmentHold
      ).execute()

      expect(batchMutationSpy).not.toBeCalledWith(apiClient, FULFILLMENT_ORDER_HOLD, [
        {
          fulfillmentHold,
          id: fulfillmentOrder
        }
      ])
    });

    it('should throw an error if fulfillmentOrder is neither a string nor an object', async () => {
      const fulfillmentOrder = 123;
      const fulfillmentHold = { reason: FulfillmentHoldReason.INVENTORY_OUT_OF_STOCK, reasonNotes: 'optionnal comment' };

      await fulfillmentUpdater.holdFulfillmentOrder(
        // @ts-expect-error testing invalid input
        fulfillmentOrder,
        fulfillmentHold
      ).execute();

      expect(batchMutationSpy).not.toBeCalled();
    });
  });

  // describe('releaseFulfillmentOrderHolds', () => {
  //   it('should be released, with one fulfillmentOrderId', async (): Promise<void> => {
  //     const fulfillmentOrderId = 'someId';
  //     const result = fulfillmentUpdater.releaseFulfillmentOrderHolds(fulfillmentOrderId);

  //     const expectedResult = { status: 'success' };

  //     expect(result).toEqual(expectedResult);

  //     await fulfillmentUpdater.execute()

  //     expect(requestSpy).toBeCalledWith(FULFILLMENT_ORDER_HOLD_RELEASE);
  //   });

  //   it('should be released, with multiple fulfillmentOrderId', async (): Promise<void> => {
  //     const fulfillmentOrderIds = ['someId', 'anotherId'];

  //     const result = fulfillmentUpdater.releaseFulfillmentOrderHolds(fulfillmentOrderIds);

  //     const expectedResult = { status: 'success' };

  //     expect(result).toEqual(expectedResult);

  //     await fulfillmentUpdater.execute()

  //     expect(requestSpy).toBeCalledWith(FULFILLMENT_ORDER_HOLD_RELEASE);
  //   });

  //   it('should throw an error if fulfillmentOrderId is neither a string nor an array', async () => {
  //     const fulfillmentOrderId = 123;
  //     const result = fulfillmentUpdater.releaseFulfillmentOrderHolds(
  //       // @ts-expect-error testing invalid input
  //       fulfillmentOrderId
  //     );

  //     const expectedResult = { status: 'error' };

  //     expect(result).toEqual(expectedResult);

  //     await fulfillmentUpdater.execute();

  //     expect(requestSpy).not.toBeCalled();
  //   });
  // });

  describe('cancelFulfillmentOrder', () => {
    it('should be canceled, with a fulfillmentOrderId', async (): Promise<void> => {
      const fulfillmentOrderId = 'someId';

      await fulfillmentUpdater.cancelFulfillmentOrder(fulfillmentOrderId).execute()

      expect(batchMutationSpy).toBeCalledWith(apiClient, FULFILLEMENT_ORDER_CANCEL, [
        {
          id: fulfillmentOrderId,
        }
      ])
    });

    it('should be released, with multiple fulfillmentOrderId', async (): Promise<void> => {
      const fulfillmentOrder = { id: 'someId' };

      await fulfillmentUpdater.cancelFulfillmentOrder(fulfillmentOrder).execute()

      expect(batchMutationSpy).toBeCalledWith(apiClient, FULFILLEMENT_ORDER_CANCEL, [
        {
          id: fulfillmentOrder.id,
        }
      ])
    });

    it('should throw an error if fulfillmentOrderId is neither a string nor an array', async () => {
      const fulfillmentOrderId = 123;

      await fulfillmentUpdater.cancelFulfillmentOrder(
        // @ts-expect-error testing invalid input
        fulfillmentOrderId
      ).execute();

      expect(batchMutationSpy).not.toBeCalledWith(apiClient, FULFILLEMENT_ORDER_CANCEL, [
        {
          id: fulfillmentOrderId,
        }
      ])
    });
  });

  describe('setFulfillmentDeadline', () => {
    it('should be set, with one fulfillmentOrderId as a string', async (): Promise<void> => {
      const fulfillmentOrderId = 'someId';
      const deadline = new Date();

      await fulfillmentUpdater.setFulfillmentDeadline(fulfillmentOrderId, deadline).execute()

      expect(batchMutationSpy).toBeCalledWith(apiClient, FULFILLEMENT_ORDER_SET_DEADLINE, [
        {
          fulfillmentDeadline: deadline,
          fulfillmentOrderIds: [ fulfillmentOrderId ],
        }
      ])
    });

    it('should be set, with one fulfillmentOrder as an object', async (): Promise<void> => {
      const fulfillmentOrder = { id: 'someId' };
      const deadline = new Date();

      await fulfillmentUpdater.setFulfillmentDeadline(fulfillmentOrder, deadline).execute()

      expect(batchMutationSpy).toBeCalledWith(apiClient, FULFILLEMENT_ORDER_SET_DEADLINE, [
        {
          fulfillmentDeadline: deadline,
          fulfillmentOrderIds: [ fulfillmentOrder.id ],
        }
      ])
    });

    it('should throw an error if fulfillmentOrder is neither a string nor an array', async () => {
      const fulfillmentOrder = 123;
      const deadline = new Date();

      await fulfillmentUpdater.setFulfillmentDeadline(
        // @ts-expect-error testing invalid input
        fulfillmentOrderId,
        deadline
      ).execute();

      expect(batchMutationSpy).not.toBeCalledWith(apiClient, FULFILLEMENT_ORDER_SET_DEADLINE, [
        {
          fulfillmentDeadline: deadline,
          fulfillmentOrderIds: [ fulfillmentOrder ],
        }
      ])
    });
  });
});
