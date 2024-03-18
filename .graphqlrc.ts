import { ApiType, pluckConfig, preset } from '@shopify/api-codegen-preset';
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
      extensions: {
        codegen: {
          // Enables support for `#graphql` tags, as well as `/* GraphQL */`
          pluckConfig,
          generates: {
            './packages/shopify-tools/src/types/admin.types.d.ts': {
              plugins: ['typescript'],
            },
            './packages/shopify-tools/src/types/admin.generated.d.ts': {
              preset,
              presetConfig: {
                apiType: ApiType.Admin,
              },
            },
          },
        } as CodegenConfig,
      },
    },

    // default: shopifyApiProject({
    //   apiType: ApiType.Admin,
    //   apiVersion: '2024-01',
    //   documents: [`./packages/shopify-tools/src/**/*.{js,ts,jsx,tsx}`],
    //   outputDir: `./packages/shopify-tools/src/types`,
    // }),
  },
};
