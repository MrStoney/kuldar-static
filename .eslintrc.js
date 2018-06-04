// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // require semicolons
    'semi': ['error', 'always'],
    // allow no space before function parentheses
    'space-before-function-paren': ['error', 'never'],
    // allow async-await
    'generator-star-spacing': 0,
    // allow
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // yoda style equations
    'yoda': 0
  }
}
