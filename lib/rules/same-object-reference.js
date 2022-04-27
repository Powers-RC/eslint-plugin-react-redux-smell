const report = function (context, node) {
  context.report({
    message: 'This new variable references the same object.',
    node,
    suggest: [
      {
        desc: "Replaces state reference assingment with a spread operator.",
        fix: function (fixer) {
          const decl = node.declarations;

          let fixArray = []
          decl.forEach((dec) => {
            const assignObj = dec.init && dec.init.object;
            const fixObject1 = fixer.insertTextBefore(assignObj, '{ ...');

            const objProperty = dec.init && dec.init.property;
            const fixObject2 = fixer.insertTextAfter(objProperty, ' }');
            fixArray.push(fixObject1, fixObject2);
          })

          return fixArray;
        }
      }
    ]
  });
};

module.exports = {
  meta: {
    type: "suggestion",
    hasSuggestions: true,
    schema: []
  },
  create: function (context) {
    return {
      VariableDeclaration(node){
        node.declarations.forEach((decl) => {
          // Get the varaible assigned object
          const assignObj = decl.init && decl.init.object;
          // Get the object property accessed
          const objProperty = decl.init && decl.init.property;
          
          if (
              assignObj &&
              Object.prototype.hasOwnProperty.call(assignObj, 'name') &&
              assignObj.name === 'state' && 
              objProperty
            ){
            report(context,  node);
          }
        })
      }
    };
  }
}
