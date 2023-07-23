// We have made this a JS file to support comments
// Rules can be found at https://eslint.org/docs/rules/
module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    allowAutomaticSingleRunInference: false
  },
  rules: {
    'indent': ['off'],
    'valid-jsdoc': ['off'],
    'no-prototype-builtins': ['off'],
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    'prefer-object-spread': 'error',
    // Rules not in 'eslint:recommended'
    eqeqeq: ['error', 'smart'],
    'no-useless-return': 'error',
    'no-useless-concat': 'error',
    // 'func-style': ['error', 'declaration'],
    // Node and ES6+ rules
    'global-require': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-const': 'error',
    'prefer-destructuring': ['error', { object: true, array: true }],
    'prefer-template': 'error',
    'require-await': 'error',
    'no-return-await': 'error'
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      env: {
        es6: true,
        node: true
      },
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        ecmaVersion: '2022',
        project: true, // find the tsconfig.json nearest each source file
        allowAutomaticSingleRunInference: false
      },
      rules: {
        '@typescript-eslint/semi': ['off'],
        '@typescript-eslint/no-var-requires': ['off'],
        '@typescript-eslint/ban-ts-comment': ['off'],
        '@typescript-eslint/no-explicit-any': ['off']
      }
    }
  ]
};
