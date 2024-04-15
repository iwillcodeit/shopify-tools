import type { CodegenConfig } from '@graphql-codegen/cli';

export default {
  // For syntax highlighting / auto-complete when writing operations
  schema: 'https://shopify.dev/admin-graphql-direct-proxy',
  documents: ['./packages/**/*.{js,ts,jsx,tsx}'],
  projects: {
    default: {
      // For type extraction
      schema: 'https://shopify.dev/admin-graphql-direct-proxy',
      documents: ['./packages/shopify-tools/src/**/*.{js,ts,jsx,tsx}'],
      // documents: ['./packages/shopify-tools/src/lib/OrderEditor.ts'],
      extensions: {
        codegen: {
          generates: {
            './packages/shopify-tools/src/types/admin.types.ts': {
              plugins: ['graphql-codegen-typescript-operation-types', 'typescript-operations'],
              config: {
                enumsAsTypes: true,
                omitObjectTypes: true,
                preResolveTypes: true,
              },
            },
          },
        } as CodegenConfig,
      },
    },
  },
};
