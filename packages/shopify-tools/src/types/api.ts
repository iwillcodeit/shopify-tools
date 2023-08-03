import type { FormattedExecutionResult } from 'graphql';
import type { PartialDeep } from 'type-fest';
/**
 * Provides more information about the error(s) including properties and metadata.
 * Refer to https://shopify.dev/docs/api/admin-graphql#status_and_error_codes for more information.
 */
type AdminApiExtensions = {
  /**
   * Shows error codes common to Shopify. Additional error codes may also be shown.
   * https://shopify.dev/docs/api/admin-graphql#status_and_error_codes
   */
  code?:
    | 'THROTTLED'
    | 'ACCESS_DENIED'
    | 'SHOP_INACTIVE'
    | 'INTERNAL_SERVER_ERROR'
    | NonNullable<string>;
};
/**
 * The Admin API can return a 200 OK response code when the query succeeds, and will populate the `data` property. The generic you pass in through type parameters will be the shape of the `data` object if successful. If you prefer a "deeply-partial" version of that generic object, consider using `AdminApiResponseOkPartial` instead.
 *
 * The Admin API can also return a 200 OK response code in cases that would typically produce 4xx errors in REST. This will propulate the `errors` property.
 *
 * Refer to https://shopify.dev/docs/api/admin-graphql#status_and_error_codes for more information.
 */
export type AdminApiResponseOk<DataGeneric> = FormattedExecutionResult<
  DataGeneric,
  AdminApiExtensions
>;
/**
 * The Admin API can return a 200 OK response code when the query succeeds, and will populate the `data` property. The generic you pass in through type parameters will be the shape of the `data` object, with `Partial` deeply-applied to all nested objects and properties, if successful. If you prefer not using this "deeply-partial" generic data object, consider using `AdminApiResponseOk` instead.
 *
 * The Admin API can also return a 200 OK response code in cases that would typically produce 4xx errors in REST. This will propulate the `errors` property.
 *
 * Refer to https://shopify.dev/docs/api/admin-graphql#status_and_error_codes for more information.
 */
export type AdminApiResponseOkPartial<DataGeneric> = FormattedExecutionResult<
  PartialDeep<
    DataGeneric,
    {
      recurseIntoArrays: true;
    }
  >,
  AdminApiExtensions
>;
/**
 * The 4xx and 5xx errors occur infrequently. They are often related to network communications, your account, or an issue with Shopify’s services.
 *
 * Many errors that would typically return a 4xx or 5xx status code, return an HTTP 200 errors response instead. Refer to the 200 OK section in the link below for details.
 *
 * Commonly the response is a `JSON.parse`-able string, but in rare occasions may also return HTML which is not `JSON.parse()`-able.
 *
 * Refer to https://shopify.dev/docs/api/admin-graphql#status_and_error_codes for more information.
 */
export type AdminApiResponseError =
  | string
  | {
      errors: {
        query: string;
      };
    }
  | {
      errors: string;
    };
/**
 * The Admin API can return a 200 OK response code when the query succeeds, and will populate the `data` property. The generic you pass in through type parameters will be the shape of the `data` object if successful. If you prefer a "deeply-partial" version of that generic object, consider using `AdminApiResponseOkPartial` instead.
 *
 * The Admin API can also return a 200 OK response code in cases that would typically produce 4xx errors in REST. This will propulate the `errors` property.
 *
 * 4xx and 5xx errors occur infrequently. They are often related to network communications, your account, or an issue with Shopify’s services.  Commonly the response is a `JSON.parse`-able string, but in rare occasions may also return HTML which is not `JSON.parse()`-able.
 *
 * Refer to https://shopify.dev/docs/api/admin-graphql#status_and_error_codes for more information.
 */
export type AdminApiResponse<DataGeneric> =
  | AdminApiResponseOk<DataGeneric>
  | AdminApiResponseError;
/**
 * The Admin API can return a 200 OK response code when the query succeeds, and will populate the `data` property. The generic you pass in through type parameters will be the shape of the `data` object, with `Partial` deeply-applied to all nested objects and properties, if successful. If you prefer not using this "deeply-partial" generic data object, consider using `AdminApiResponseOk` instead.
 *
 * The Admin API can also return a 200 OK response code in cases that would typically produce 4xx errors in REST. This will propulate the `errors` property.
 *
 * 4xx and 5xx errors occur infrequently. They are often related to network communications, your account, or an issue with Shopify’s services. Commonly the response is a `JSON.parse`-able string, but in rare occasions may also return HTML which is not `JSON.parse()`-able.
 *
 * Refer to https://shopify.dev/docs/api/admin-graphql#status_and_error_codes for more information.
 */
export type AdminApiResponsePartial<DataGeneric> =
  | AdminApiResponseOkPartial<DataGeneric>
  | AdminApiResponseError;
export {};
