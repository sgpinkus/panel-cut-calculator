// eslint.config.mjs
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/essential'],

  // .vue files: hand script blocks off to the TS parser
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // App/browser code
  {
    files: ['src/**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: { vue },
    rules: {
      'no-var': 'warn',
      'eqeqeq': 'warn',
      'handle-callback-err': 'error',
      'no-console': 'off',
      'linebreak-style': 'off',
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'semi': ['error', 'always'],
      'semi-spacing': 'error',
      'spaced-comment': ['warn', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],
      'vue/multi-word-component-names': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // Node tooling config files
  {
    files: ['vite.config.*', 'vitest.config.*', 'cypress.config.*', 'eslint.config.*'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];