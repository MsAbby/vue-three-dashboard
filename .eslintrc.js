module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
      'plugin:vue/essential',
      'eslint:recommended',
      '@vue/typescript/recommended'
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser",
      ecmaVersion: 2020
    },
    rules: {
      '@typescript-eslint/no-var-requires': 0,
      "@typescript-eslint/no-explicit-any":['off'],
      "semi": [0],
      "linebreak-style": "off",
      "eqeqeq": "off",
      "require-jsdoc": "off",
      "jsdoc/check-param-names": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-returns-description": "off",
      "jsdoc/require-returns-type": "off",
      "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  }
  
  