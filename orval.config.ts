import { defineConfig } from 'orval';

export default defineConfig({
  portfolio: {
    input: './.specs/openapi.yaml',
    output: {
      mode: 'tags-split',
      target: './src/shared/api/generated',
      schemas: './src/shared/api/model',
      client: 'react-query',
      httpClient: 'axios',
    },
  },
});