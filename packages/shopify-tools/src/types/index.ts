import type { BulkOperationFragment } from './admin.types';

export type Mutable<T> = { -readonly [k in keyof T]: T[k] };

export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? Array<DeepMutable<U>> : DeepMutable<T[P]>;
};

export type BulkOperation = BulkOperationFragment;
