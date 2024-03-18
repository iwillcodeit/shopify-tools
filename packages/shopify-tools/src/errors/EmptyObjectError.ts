import { BulkOperation } from '../types/index';

export class BulkError extends Error {
  bulk: BulkOperation;

  constructor(bulk: BulkOperation, message: string) {
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
  constructor(bulk: BulkOperation, message = 'Bulk is empty.') {
    super(bulk, message);
    this.name = 'EmptyObjectError';
  }
}
