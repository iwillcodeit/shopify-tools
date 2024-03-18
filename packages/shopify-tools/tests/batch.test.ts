import { describe, expect } from 'vitest';
import { prepareBatchMutation } from '../src';

const query1 = /* GraphQL */ `
  mutation updateTags($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) {
      userErrors {
        message
      }
    }
  }
`;

const query2 = /* GraphQL */ `
  mutation updateTags($someId: ID!, $tags: [String!]!) {
    tagsAdd(id: $someId, tags: $tags) {
      userErrors {
        message
      }
    }
  }
`;

describe('prepareBatchMutation', () => {
  it('Multiple batches', () => {
    const queries1 = prepareBatchMutation(query1, [
      { id: 'id1', tags: ['abc', 'def'] },
      { id: 'id2', tags: ['abc', 'def'] },
    ]);

    expect(queries1.name).toBe('updateTags');
    expect(queries1.queries.length).toBe(1);
    expect(Object.keys(queries1.queries[0].variables).length).toBe(4);

    const queries2 = prepareBatchMutation(query1, [
      { id: 'id1', tags: ['abc', 'def'] },
      { id: 'id2', tags: ['abc', 'def'] },
    ]);

    expect(queries2.name).toBe('updateTags');
    expect(queries2.queries.length).toBe(1);
    expect(Object.keys(queries2.queries[0].variables).length).toBe(4);
  });

  it('Different argument names', () => {
    const queries = prepareBatchMutation(query2, [
      { someId: 'id1', tags: ['abc', 'def'] },
      { someId: 'id2', tags: ['abc', 'def'] },
    ]);

    console.dir(queries, { depth: null });
  });
});
