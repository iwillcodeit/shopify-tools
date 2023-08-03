import { CodegenConfig } from '@graphql-codegen/cli';
import { LATEST_API_VERSION as apiVersion } from '@shopify/shopify-api';

const config: CodegenConfig = {
  schema: `https://shopify.dev/admin-graphql-direct-proxy/${apiVersion}`,
  documents: ['packages/shopify-tools/src/**/*.{graphql,js,ts,jsx,tsx}'],
  generates: {
    'packages/shopify-tools/src/types/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        preResolveTypes: true,
        onlyOperationTypes: true,
        futureProofUnions: true,
      },
    },
  },
};

export default config;
