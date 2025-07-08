import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    ignores: ['node_modules/', 'dist', 'build'],
  },
  pluginReact.configs.flat.recommended,
  stylistic.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      js,
      '@stylistic': stylistic,
    },
    extends: [
      js.configs.recommended,
    ],

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-empty': 'error',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
  },
])
