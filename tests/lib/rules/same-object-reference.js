const rule = require('../../../lib/rules/same-object-reference');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('same-object-reference', rule, {
  valid: [
      {
        code:  'let nestedState = { ...state.nestedState}',
        options: []
      }
  ],
  invalid: [{
    code:  'let nestedState = state.nestedState',
    errors: [
      {
        message: 'This new variable references the same object.',
        suggestions: [{
          desc: 'Replaces state reference assingment with a spread operator.',
          output: 'let nestedState = { ...state.nestedState }'
        }]
      },
    ],
  }],
});
