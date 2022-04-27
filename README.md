# eslint-plugin-react-redux-smell

Identify known redux anti-patterns

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-react-redux-smell`:

```sh
npm install eslint-plugin-react-redux-smell --save-dev
```

## Usage

Add `react-redux-smell` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-redux-smell"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-redux-smell/rule-name": 2
    }
}
```

## Supported Rules

* [same-object-reference]() Warns the user the variable assignment created references the same object.
* [more-to-come]() More rules to follow....

