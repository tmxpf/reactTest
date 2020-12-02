const React = require('react');
const { Component } = React;

class WordChainGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '바밤바',
            inputVal: '',
            result: ''
        };
    };

    onChangeInput = (e) => {
        let val = e.target.value;

        this.setState({
            inputVal: val
        });
    };

    onSubmitForm = (e) => {
        e.preventDefault();

        let firstChar = this.state.inputVal.charAt(0);
        let lastChar = this.state.word.charAt(this.state.word.length - 1);
        let good = (preveValue) => {
            return {
                word: preveValue.inputVal,
                inputVal: '',
                result: '딩동댕!'
            };
        };
        let bad = (preveValue) => {
            return {
                word: preveValue.word,
                inputVal: '',
                result: '땡!'
            };
        };

        (firstChar === lastChar) ? this.setState(good) : this.setState(bad);

        this.input.focus();
    };

    input;

    inputRef = (c) => {
        this.input = c;
    };

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" ref={this.inputRef} onChange={this.onChangeInput} value={this.state.inputVal}/>
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    };
}

module.exports = WordChainGame;