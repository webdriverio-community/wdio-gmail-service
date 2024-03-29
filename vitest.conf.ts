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
            enabled: false,
            exclude: ['**/build/**', '**/__fixtures__/**', '**/*.test.ts'],
            lines: 100,
            functions: 100,
            branches: 100,
            statements: 100
        }
    }
})