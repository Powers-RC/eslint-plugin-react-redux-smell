'use strict'

module.exports = {
    plugins: ["react-redux-smell"],
    env: {
        browser: true,
        node: true,
    },
    overrides: [
        {
            files: ["**/reducers/**/*Reducer*.js"],
            rules: {
                "react-redux-smell/same-object-reference": "warn"
            },
        }
    ]
}
