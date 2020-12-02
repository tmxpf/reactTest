const React = require('react');
const ReactDom = require('react-dom');

const WordChainGame = require('./WordChainGame');

ReactDom.render(<WordChainGame/>, document.querySelector('#root'));