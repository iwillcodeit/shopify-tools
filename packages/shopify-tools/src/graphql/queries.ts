export const BULK_OPERATION_FRAGMENT = /* GraphQL */ `
  fragment BulkOperation on BulkOperation {
    __typename
    id
    status
    errorCode
    url
    objectCount
    rootObjectCount
  }
`;

export const CREATE_STAGED_UPLOAD = /* GraphQL */ `
  mutation CreateStagedUpload($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      userErrors {
        field
        message
      }
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
    }
  }
`;

export const BULK_MUTATION = /* GraphQL */ `
  ${BULK_OPERATION_FRAGMENT}

  mutation RunBulkMutation($mutation: String!, $stagedUploadPath: String!) {
    bulkOperationRunMutation(mutation: $mutation, stagedUploadPath: $stagedUploadPath) {
      bulkOperation {
        ...BulkOperation
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const BULK_QUERY = /* GraphQL */ `
  ${BULK_OPERATION_FRAGMENT}

  mutation RunBulkQuery($query: String!) {
    bulkOperationRunQuery(query: $query) {
      bulkOperation {
        ...BulkOperation
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const GET_BULK_STATUS = /* GraphQL */ `
  ${BULK_OPERATION_FRAGMENT}

  query GetBulkStatus($id: ID!) {
    node(id: $id) {
      __typename
      ... on BulkOperation {
        ...BulkOperation
      }
    }
  }
`;
