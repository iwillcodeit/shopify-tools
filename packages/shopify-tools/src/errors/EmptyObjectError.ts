import { BulkOperationFragment } from '../types/graphql';

export class BulkError extends Error {
  bulk: BulkOperationFragment;

  constructor(bulk: BulkOperationFragment, message: string) {
    super(message);
    this.name = 'BulkError';
    this.bulk = bulk;
  }

  override toString(): string {
    return `${this.name}: ${this.message} (Bulk ID: ${this.bulk.id}) (Bulk Status|Error|Object: ${
      this.bulk.status ?? '-'
    }/${this.bulk.errorCode ?? '-'}/${this.bulk.rootObjectCount ?? '-'})`;
  }
}

export class EmptyBulkError extends BulkError {
  constructor(bulk: BulkOperationFragment, message = 'Bulk is empty.') {
    super(bulk, message);
    this.name = 'EmptyObjectError';
  }
}
