const React = require('react');
const ReactDom = require('react-dom');

// const WordChainGame = require('./WordChainGame');
// import NumberBaseBallForClass from './NumberBaseBallForClass';
// const NumberBaseBallForHooks = require('./NumberBaseBallForHooks');
// import ResponseCheckForClass from './ResponseCheckForClass';
// const ResponseCheckForHooks = require('./ResponseCheckForHooks');
// import RSPForClass from './RSPForClass';
// const RSPForHooks = require('./RSPForHooks');
// import LottoForClass from './LottoForClass';
// const LottoForHooks = require('./LottoForHooks');
import TicTacToe from "./TicTacToe";

ReactDom.render(<TicTacToe/>, document.querySelector('#root'));