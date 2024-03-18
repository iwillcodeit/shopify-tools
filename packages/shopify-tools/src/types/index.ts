import { BulkOperation as BaseBulkOperation } from './api';

export type Mutable<T> = { -readonly [k in keyof T]: T[k] };

export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? Array<DeepMutable<U>> : DeepMutable<T[P]>;
};

export type Batched<T extends Record<string, any>> = T;

export type BulkOperation = { __typename: 'BulkOperation' } & Pick<
  BaseBulkOperation,
  'id' | 'status' | 'errorCode' | 'url' | 'objectCount' | 'rootObjectCount'
>;
