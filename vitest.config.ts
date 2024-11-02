/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        include: ['tests/**/*.test.ts'],
        /**
         * not to ESM ported packages
         */
        exclude: [
            'dist', '.idea', '.git', '.cache',
            '**/node_modules/**'
        ],
        coverage: {
            enabled: true,
            provider: 'v8',
            exclude: [
                'build',
                '__fixtures__',
                '**/*.test.ts',
                'vitest.config.ts',
                '.eslintrc.cjs',
                'src/cjs',
            ],
            include: ['src/**/*.ts'],
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100
            }
        }
    }
})
