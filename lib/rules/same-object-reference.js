const { isNull } = require("lodash");

const report = function (context, node, variableSet) {
  context.report({
    message: 'This assingment directly mutates a state object.',
    node,
    suggest: [
      {
        desc: "Replace referenced variable with new object.",
        fix: function (fixer) {
          let fixArray = [];

          const objVarName = node.left.object.name;
          varNode = getVarRefState(objVarName, variableSet);
          if (varNode.defs.length > 0) {
            varNodeObj = varNode.defs[0].node.init;

            const assignObj = varNodeObj.object;
            const fixObject1 = fixer.insertTextBefore(assignObj, '{ ...');

            const objProperty = varNodeObj.property;
            const fixObject2 = fixer.insertTextAfter(objProperty, ' }');
            fixArray.push(fixObject1, fixObject2);
          }

          return fixArray;
        }
      }
    ]
  });
};

// Check if variable references state
function doesVarRefState(name, variables) {
  let varRefState = false
  if (variables.has(name)) {
    variable = variables.get(name);
    const initNodeObj = variable.defs[0].node && variable.defs[0].node.init
    if (!isNull(initNodeObj) && initNodeObj !== undefined) {
      const varPassedRefState = initNodeObj.object && initNodeObj.object.name === 'state'
      if (variable.name === name && varPassedRefState) {
        varRefState = true;
      }
    }
  }
  return varRefState;
}

// Check if variable references stateV
function getVarRefState(name, variables) {
  if (variables.has(name)) {
    variable = variables.get(name);
  }
  return variable;
}

module.exports = {
  meta: {
    type: "suggestion",
    hasSuggestions: true,
    schema: []
  },
  create: function (context) {
    return {
      "AssignmentExpression": function (node) {
        const objVarName = node.left.object && node.left.object.name,
          variable = context.getScope().variables[0] ?? {},
          variableSet = Object.prototype.hasOwnProperty.call(variable, 'scope') ? variable.scope.variableScope.set : new Map();

        // Check if variable name references state
        const leftNode = node.left,
          rightNode = node.right;

        let refAction = false;
        if (doesVarRefState(objVarName, variableSet)) {
          if (
            Object.prototype.hasOwnProperty.call(leftNode, 'property') &&
            rightNode
          ) {
            refAction = true;
          }
        }
        if (refAction) {
          report(context, node, variableSet);
        }
      },
    };
  }
}
