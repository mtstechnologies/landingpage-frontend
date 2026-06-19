import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/features/**', 'src/lib/**'],
      exclude: [
        'src/shared/api/generated/**',
        'src/shared/api/model/**',
        'src/components/ui/**',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 30,
        functions: 30
      },
    },
  },
})
