const React = require('react');
const { Component } = React;

class WordChainGame extends Component {
    state = {
        text: 'Hello, Webpack'
    };

    render() {
        return(
            <h1>{this.state.text}</h1>
        )
    }
}

module.exports = WordChainGame;