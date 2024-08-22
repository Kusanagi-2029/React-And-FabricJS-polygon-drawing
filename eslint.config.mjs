import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Применение к файлам с расширениями JavaScript и TypeScript
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      prettier: prettierPlugin,
      react: pluginReact,
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'consistent-return': 'off', // Отключение правила, которое требует возвращаемого значения
      'no-useless-return': 'off', // Отключение правила, предупреждающего о ненужных return
      'no-plusplus': 'off',
      'no-var': 'error',
      'prefer-const': 'warn',
    },
  },

  // Базовая конфигурация JavaScript
  pluginJs.configs.recommended,

  // Конфигурация для TypeScript
  ...tseslint.configs.recommended,

  // Конфигурация для React
  pluginReact.configs.flat.recommended,

  // Конфигурация Prettier для совместимости
  prettierConfig,
];

