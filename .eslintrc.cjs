module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/App.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', 'cypress/tsconfig.json'],
    parser: '@typescript-eslint/parser',
  },
  plugins: ['react-refresh'],
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'padded-blocks': ['warn', 'never'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-unreachable': ['error'],
    'no-var': ['error'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': ['error'],
    'no-unused-vars': 'off',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'prefer-destructuring': ['error', { object: true, array: false }, { enforceForRenamedProperties: false }],
    'no-mixed-spaces-and-tabs': ['error'],
    'require-jsdoc': ['warn'],
    'arrow-parens': ['error', 'as-needed'],
    'block-scoped-var': ['error'],
    'no-else-return': ['error'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'no-empty': 'warn',
    
    // TypeScript
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-type-imports': ['off', { prefer: 'type-imports' }],
    '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  }
}
