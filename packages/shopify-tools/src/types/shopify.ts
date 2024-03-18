import type { ApiClient, AllOperations, OperationVariables } from '@shopify/graphql-client';

export type AllClientOperations<Client extends ApiClient<any, any> = ApiClient> = Client extends ApiClient<
  any,
  infer Operations
>
  ? Operations
  : AllOperations;

export type PickOperationVariables<
  Operation extends keyof Operations = string,
  Operations extends AllOperations = AllOperations
> = Operation extends keyof Operations
  ? OperationVariables<Operation, Operations> extends Record<string, never>
    ? never
    : OperationVariables<Operation, Operations>['variables']
  : Record<string, any>;
