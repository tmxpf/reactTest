import React, { Component } from 'react';
import TryForClass from './TryForClass';

function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];

    for(let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }

    return array;
}

class NumberBaseBallForClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            value: '',
            answer: getNumbers(),
            tries: []
        };
    }

    inputRef = (c) => {
        this.input = c;
    };

    input;

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    onSubmitForm = (e) => {
        const { value, tries, answer} = this.state;
        e.preventDefault();

        let valueStr = value || '';
        let answerStr = answer.join('');

        //홈런
        if(valueStr === answerStr) {
            this.setState((prevState) => {
                return {
                    tries: [...prevState.tries, { try: value, result: '홈런!' }]
                }
            });

            alert('게임을 다시 시작합니다.');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: []
            });
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            if(tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join('')}였습니다.`,
                    value: '',
                    answer: getNumbers(),
                    tries: []
                });
                alert('게임을 다시 시작합니다.');
            } else {
                for(let i = 0; i < 4; i++) {
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if(answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                        value: ''
                    }
                });
            }

        }

        this.input.focus();
    };

    render() {
        const { value, tries, answer, result } = this.state;

        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} ref={this.inputRef} onChange={this.onChangeInput} value={value}/>
                    <button>입력!</button>
                </form>
                <ul>
                    {tries.map((v, i) => {
                        return(
                          <TryForClass Key={`${i + 1}차 시도 :`} tryInfo={v} index={i}/>
                        );
                    })}
                </ul>
                <div>{answer}</div>
            </>
        )
    }
}

export default NumberBaseBallForClass;
