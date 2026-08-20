import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import astro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '.vercel/**',
      'public/**',
      'src/assets/**',
      'src/data/steam-games.json',
      'package-lock.json',
      'skills-lock.json',
    ],
  },

  js.configs.recommended,

  {
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },

  ...tseslint.configs['flat/recommended'],
  ...tseslint.configs['flat/stylistic'],

  ...astro.configs['flat/recommended'],

  eslintConfigPrettier,
];