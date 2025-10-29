import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'],
    rules: {
      'quotes': ['error', 'single'], // força aspas simples
      'semi': ['error', 'never'],    // remove ponto e vírgula

    },
    languageOptions: { globals: globals.node }
  },
  tseslint.configs.recommended,
])
