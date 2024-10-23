module.exports = {
  extends: ['expo', 'prettier', 'plugin:import/recommended'],
  plugins: ['prettier', 'react', 'react-native'],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['./'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
    'import/ignore': ['react'],
  },
  rules: {
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-unused-styles': 2,
    'prettier/prettier': 'error',
    'sort-imports': [
      'error',
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^@/'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
