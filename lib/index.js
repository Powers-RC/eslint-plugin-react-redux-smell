/**
 * @fileoverview Identify known redux anti-patterns
 * @author Cameron Powers
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

// import plugin config options
module.exports.configs = {
  recommended: require('./config/recommended'),
}

// import processors
module.exports.processors = {
  // add your processors here
};

