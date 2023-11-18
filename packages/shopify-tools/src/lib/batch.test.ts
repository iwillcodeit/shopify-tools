import { expect, test } from 'vitest';
import { prepareBatchMutation } from './batch';

export const query1 = /* GraphQL */ `
  mutation updateTags($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) {
      userErrors {
        message
      }
    }
  }
`;

test('prepareBatchMutation', () => {
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
