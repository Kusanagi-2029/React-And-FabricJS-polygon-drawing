module.exports = {
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'consistent-return': 'off', // Отключение правила, которое требует возвращаемого значения
    'no-useless-return': 'off', // Отключение правила, предупреждающего о ненужных return
    'no-plusplus': 'off',
  },
};
