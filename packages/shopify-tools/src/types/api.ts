export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  ARN: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  Decimal: { input: any; output: any };
  FormattedString: { input: any; output: any };
  HTML: { input: any; output: any };
  JSON: { input: any; output: any };
  Money: { input: any; output: any };
  StorefrontID: { input: any; output: any };
  URL: { input: any; output: any };
  UnsignedInt64: { input: any; output: any };
  UtcOffset: { input: any; output: any };
};

/**
 * An object with an ID field to support global identification, in accordance with the
 * [Relay specification](https://relay.dev/graphql/objectidentification.htm#sec-Node-Interface).
 * This interface is used by the [node](https://shopify.dev/api/admin-graphql/unstable/queries/node)
 * and [nodes](https://shopify.dev/api/admin-graphql/unstable/queries/nodes) queries.
 *
 */
export type Node = {
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
};

/**
 * An asynchronous long-running operation to fetch data in bulk or to bulk import data.
 *
 * Bulk operations are created using the `bulkOperationRunQuery` or `bulkOperationRunMutation` mutation. After
 * they are created, clients should poll the `status` field for updates. When `COMPLETED`, the `url` field contains
 * a link to the data in [JSONL](http://jsonlines.org/) format.
 *
 * Refer to the [bulk operations guide](https://shopify.dev/api/usage/bulk-operations/imports) for more details.
 *
 */
export type BulkOperation = Node & {
  __typename?: 'BulkOperation';
  /** When the bulk operation was successfully completed. */
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  /** When the bulk operation was created. */
  createdAt: Scalars['DateTime']['output'];
  /** Error code for failed operations. */
  errorCode?: Maybe<BulkOperationErrorCode>;
  /** File size in bytes of the file in the `url` field. */
  fileSize?: Maybe<Scalars['UnsignedInt64']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /**
   * A running count of all the objects processed.
   * For example, when fetching all the products and their variants, this field counts both products and variants.
   * This field can be used to track operation progress.
   *
   */
  objectCount: Scalars['UnsignedInt64']['output'];
  /**
   * The URL that points to the partial or incomplete response data (in [JSONL](http://jsonlines.org/) format) that was returned by a failed operation.
   * The URL expires 7 days after the operation fails. Returns `null` when there's no data available.
   *
   */
  partialDataUrl?: Maybe<Scalars['URL']['output']>;
  /** GraphQL query document specified in `bulkOperationRunQuery`. */
  query: Scalars['String']['output'];
  /**
   * A running count of all the objects that are processed at the root of the query.
   * For example, when fetching all the products and their variants, this field only counts products.
   * This field can be used to track operation progress.
   *
   */
  rootObjectCount: Scalars['UnsignedInt64']['output'];
  /** Status of the bulk operation. */
  status: BulkOperationStatus;
  /** The bulk operation's type. */
  type: BulkOperationType;
  /**
   * The URL that points to the response data in [JSONL](http://jsonlines.org/) format.
   * The URL expires 7 days after the operation completes.
   *
   */
  url?: Maybe<Scalars['URL']['output']>;
};

/** The valid values for the status of a bulk operation. */
export enum BulkOperationStatus {
  /** The bulk operation has been canceled. */
  Canceled = 'CANCELED',
  /**
   * Cancelation has been initiated on the bulk operation. There may be a short delay from when a cancelation
   * starts until the operation is actually canceled.
   *
   */
  Canceling = 'CANCELING',
  /** The bulk operation has successfully completed. */
  Completed = 'COMPLETED',
  /** The bulk operation has been created. */
  Created = 'CREATED',
  /** The bulk operation URL has expired. */
  Expired = 'EXPIRED',
  /**
   * The bulk operation has failed. For information on why the operation failed, use
   * [BulkOperation.errorCode](https://shopify.dev/api/admin-graphql/latest/enums/bulkoperationerrorcode).
   *
   */
  Failed = 'FAILED',
  /** The bulk operation is runnning. */
  Running = 'RUNNING',
}

/** Error codes for failed bulk operations. */
export enum BulkOperationErrorCode {
  /**
   * The provided operation `query` returned access denied due to missing
   * [access scopes](https://shopify.dev/api/usage/access-scopes).
   * Review the requested object permissions and execute the query as a normal non-bulk GraphQL request to see more details.
   *
   */
  AccessDenied = 'ACCESS_DENIED',
  /**
   * The operation resulted in partial or incomplete data due to internal server errors during execution.
   * These errors might be intermittent, so you can try performing the same query again.
   *
   */
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  /**
   * The operation resulted in partial or incomplete data due to query timeouts during execution.
   * In some cases, timeouts can be avoided by modifying your `query` to select fewer fields.
   *
   */
  Timeout = 'TIMEOUT',
}

/** The valid values for the bulk operation's type. */
export enum BulkOperationType {
  /** The bulk operation is a mutation. */
  Mutation = 'MUTATION',
  /** The bulk operation is a query. */
  Query = 'QUERY',
}
