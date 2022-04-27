"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
  configs: {
    staterConfig: {
      plugins: ["react-redux-smell"],
      env: ["node"],
      rules: {
          "react-redux-smell/my-rule": "error"
      },
      overrides: [
        {
          files: ["**/reducers/**/*Reducer*.js"]
        }
      ]
    }
  }
};
