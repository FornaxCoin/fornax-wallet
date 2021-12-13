module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // Use Array<> and ReadonlyArray<> syntax in types.
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
        readonly: 'generic',
      },
    ],

    // Mandatory return types clutters the code too much.
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Allow empty interfaces, since a lot of components don't require props.
    '@typescript-eslint/no-empty-interface': 'off',

    // var-require is used when importing assets.
    '@typescript-eslint/no-var-requires': 'off',

    // Always use strict comparisons.
    eqeqeq: 'error',

    // Use fat arrow function style.
    'func-style': 'error',

    // Forbid reassigning parameters.
    'no-param-reassign': 'error',

    // Do not allow unused expressions.
    'react-native/no-inline-styles': 'off',
    'no-unused-expressions': ['error', { enforceForJSX: true }],

    // Prefer const over let.
    'prefer-const': 'error',

    // Prefer template strings over concatenating with plus.
    'prefer-template': 'error',

    // Allow unescaped single and double quotes.
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
  },
};
