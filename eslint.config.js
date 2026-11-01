import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '.ssr', 'node_modules', 'src/generated', 'studio/dist', 'studio/.sanity', 'studio/node_modules', 'test-results', 'playwright-report']),
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' }],
    },
  },
  { files: ['scripts/**/*.mjs', 'tests/**/*.mjs', '*.{js,mjs}', 'studio/**/*.{js,mjs}'],
    languageOptions: { globals: globals.node, ecmaVersion: 'latest', sourceType: 'module' },
    rules: js.configs.recommended.rules,
  },
])
