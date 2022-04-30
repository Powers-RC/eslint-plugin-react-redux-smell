const report = function (context, node) {
  context.report({
    message: 'This assingment directly mutates a state object.',
    node,
    suggest: [
      {
        desc: "Replace referenced variable with new object.",
        fix: function (fixer) {
          variables = context.getScope().variables,
          varName = node.left.object.name;

          const varNode = variables.filter((v) => v.name === varName)[0];
          const dec = varNode.defs[0].node;

          let fixArray = []

          const assignObj = dec.init && dec.init.object;
          const fixObject1 = fixer.insertTextBefore(assignObj, '{ ...');

          const objProperty = dec.init && dec.init.property;
          const fixObject2 = fixer.insertTextAfter(objProperty, ' }');
          fixArray.push(fixObject1, fixObject2);

          return fixArray;
        }
      }
    ]
  });
};

// Check if variable references stateV
function doesVarRefState(name, variables) {
  let varRefState = false
  variables.forEach(( variable ) => {
    const varPassedRefState = variable.defs[0].node.init.object.name === 'state'
    if (variable.name === name && varPassedRefState){
      varRefState = true;
    }
  });

  return varRefState;
}

module.exports = {
  meta: {
    type: "suggestion",
    hasSuggestions: true,
    schema: []
  },
  create: function (context) {
    return {
      "AssignmentExpression:exit": function(node){
        const objVarName = node.left.object.name,
          variables = context.getScope().variables;

        // Check if variable name references state
        const leftNode = node.left,
        rightNode = node.left;

        let refAction = false;
        if(doesVarRefState(objVarName, variables)){
            if (
              Object.prototype.hasOwnProperty.call(leftNode, 'property') &&
              rightNode
            ){
              refAction = true;
            }
        }
        if(refAction){
          report(context, node);
        }
      },
    };
  }
}
