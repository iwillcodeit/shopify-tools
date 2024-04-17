import { FulfillmentTrackingInput } from '../types/admin.types';
import { TrackingInfo } from '../types/fulfillment';

export function compareTrackingInfo(input: FulfillmentTrackingInput, data: Array<TrackingInfo>): boolean {
  // If only one URL is provided by the input
  if (input.url) {
    // Shopify should have only one tracking info
    if (data.length !== 1) {
      return false;
    }

    if (data[0].url !== input.url) {
      return false;
    }
  }

  if (input.number) {
    // Shopify should have only one tracking info
    if (data.length !== 1) {
      return false;
    }

    if (data[0].number !== input.number) {
      return false;
    }
  }

  if (input.company) {
    if (data.some((trackingInfo) => trackingInfo.company !== input.company)) {
      return false;
    }
  }

  if (input.urls) {
    if (input.urls.length !== data.length) {
      return false;
    }

    if (data.some((trackingInfo) => !input.urls?.includes(trackingInfo.url))) {
      return false;
    }
  }

  if (input.numbers) {
    if (input.numbers.length !== data.length) {
      return false;
    }

    if (data.some((trackingInfo) => !input.numbers?.includes(trackingInfo.url))) {
      return false;
    }
  }

  return true;
}
