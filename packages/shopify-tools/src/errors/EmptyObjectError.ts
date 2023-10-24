import { BulkOperationFragment } from '../types/graphql';

export class EmptyBulkError extends Error {
  bulk: BulkOperationFragment;

  constructor(bulk: BulkOperationFragment, message = 'Bulk is empty.') {
    super(message);
    this.name = 'EmptyObjectError';
    this.bulk = bulk;
  }

  override toString(): string {
    return `${this.name}: ${this.message} (Bulk ID: ${this.bulk.id}) (Bulk Status|Error|Object: ${
      this.bulk.status ?? '-'
    }/${this.bulk.errorCode ?? '-'}/${this.bulk.rootObjectCount ?? '-'})`;
  }
}
