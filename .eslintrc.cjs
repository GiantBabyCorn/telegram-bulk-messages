module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    FB: false,
    ga: false,
    gtag: false,
    createjs: false,
  },
  plugins: [
    'flowtype',
  ],
  rules: {
    'func-names': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'no-bitwise': 0,
    'prefer-promise-reject-errors': 0,
    'object-curly-newline': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'no-extraneous-dependencies': 0,
    'no-async-promise-executor': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    // 'import/extensions': ['error', 'always', {
    //   js: 'never',
    // }],
    'no-param-reassign': ['error', {
      props: false,
    }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
  },
};
