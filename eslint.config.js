import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // We intentionally co-locate hooks/constants with components (e.g. the
      // store provider + useStore, Icon + ICON_NAMES). This rule only affects
      // dev-time fast-refresh granularity, not a shipped multi-page SPA.
      'react-refresh/only-export-components': 'off',
      // Allow the unused error binding in catch blocks (degrade-silently).
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
])
