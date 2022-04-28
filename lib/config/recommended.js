'use strict'

module.exports = {
    plugins: ["react-redux-smell"],
    env: ["node"],
    rules: {
        "react-redux-smell/same-object-reference": "error"
    },
    overrides: [
        {
            files: ["**/reducers/**/*Reducer*.js"]
        }
    ]
}
