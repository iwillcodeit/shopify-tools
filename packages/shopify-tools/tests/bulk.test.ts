import { describe, expect } from 'vitest';
import { prepareBulkOperation } from '../src';

describe('prepareBulkOperation', () => {
  it('no argument', () => {
    const queryStr = /** GraphQL */ `
      query {
        orders {
          id
          price
          customer {
            name
            email
          }
        }
      }
    `;

    const query = prepareBulkOperation(queryStr);

    expect(query).toEqual(queryStr);
  });
  it('with arguments but missing variables', () => {
    const queryStr = /** GraphQL */ `
      query test($id: ID!) {
        order(id: $id) {
          id
          price
          customer {
            name
            email
          }
        }
      }
    `;

    expect(() => prepareBulkOperation(queryStr)).toThrow('Missing variables: id');
  });
  it('with variables but missing argument', () => {
    const queryStr = /** GraphQL */ `
      query test {
        order(id: "foo") {
          id
          price
          customer {
            name
            email
          }
        }
      }
    `;

    expect(() =>
      prepareBulkOperation(queryStr, {
        id: 'bar',
      })
    ).toThrow('Unused variables: id');
  });
  it('with arguments default values but without provided values', () => {
    const queryStr = /** GraphQL */ `
      query test($id: ID! = "foo") {
        order(id: $id) {
          id
          price
          customer {
            name
            email
          }
        }
      }
    `;

    const result = prepareBulkOperation(queryStr);

    expect(result).toEqual(`query test {
  order(id: "foo") {
    id
    price
    customer {
      name
      email
    }
  }
}`);
  });
  it('with arguments default values and with provided values', () => {
    const queryStr = /** GraphQL */ `
      query test($id: ID! = "foo") {
        order(id: $id) {
          id
          price
          customer {
            name
            email
          }
        }
      }
    `;

    const result = prepareBulkOperation(queryStr, {
      id: 'bar',
    });

    expect(result).toEqual(`query test {
  order(id: "bar") {
    id
    price
    customer {
      name
      email
    }
  }
}`);
  });
  it('with arguments and provided values', () => {
    const queryStr = /** GraphQL */ `
      query test($id: ID!) {
        order(id: $id) {
          id
          price
          customer {
            name
            email
          }
        }
      }
    `;

    const result = prepareBulkOperation(queryStr, {
      id: 'bar',
    });

    expect(result).toEqual(`query test {
  order(id: "bar") {
    id
    price
    customer {
      name
      email
    }
  }
}`);
  });
});
