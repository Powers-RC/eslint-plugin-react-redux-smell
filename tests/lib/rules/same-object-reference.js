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
        code:  'let nestedState = { ...state.nestedStateProperty}',
        options: []
      }
  ],
  invalid: [
    {
      code:  'let nestedState = state.nestedStateProperty;\n' + 
      'nestedState.nestedField = action.data;',
      errors: [
        {
          message: 'This assingment directly mutates a state object.',
          suggestions: [{
            desc: 'Replace referenced variable with new object.',
            output: 'let nestedState = { ...state.nestedStateProperty };\n' +
            'nestedState.nestedField = action.data;'
          }]
        },
      ],
    },
    {
    code:  'let nestedState = state.nestedStateProperty;\n' +
          'const actionData = action.data.info;\n' + 
          'nestedState.nestedField = actionData;',
    errors: [
      {
        message: 'This assingment directly mutates a state object.',
        suggestions: [{
          desc: 'Replace referenced variable with new object.',
          output: 'let nestedState = { ...state.nestedStateProperty };\n' + 
          'const actionData = action.data.info;\n' + 
          'nestedState.nestedField = actionData;'
        }]
      },
    ],
    }
  ],
});
