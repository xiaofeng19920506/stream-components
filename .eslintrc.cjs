module.exports = {
  root: true,
  env: { browser: true, node: true, es2021: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: false,
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.base.json', './packages/*/tsconfig.json'],
      },
    },
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y',
    'import',
    'unused-imports',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/interactive-supports-focus': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/order': 'off',
      },
    },
  ],
  ignorePatterns: [
    'dist',
    '**/dist/**',
    '**/*.d.ts',
    '**/*.css',
    'node_modules',
  ],
};
