const React = require('react');
const ReactDom = require('react-dom');

// const WordChainGame = require('./WordChainGame');
// import NumberBaseBallForClass from './NumberBaseBallForClass';
// const NumberBaseBallForHooks = require('./NumberBaseBallForHooks');
// import ResponseCheckForClass from './ResponseCheckForClass';
const ResponseCheckForHooks = require('./ResponseCheckForHooks');

ReactDom.render(<ResponseCheckForHooks/>, document.querySelector('#root'));