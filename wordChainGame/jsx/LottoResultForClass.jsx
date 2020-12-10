import React, { PureComponent } from "react";
import LottoBall from './LottoBall';

function getWinNumbers() {
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

class LottoResultForClass extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: '',
            redo: false
        };
    }

    timeout = [];

    runTimeOut = () => {
        const { winNumbers } = this.state;

        for(let i = 0; i < winNumbers.length - 1; i++) {
            this.timeout[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]]
                    };
                });
            }, (i + 1) * 1000);
        }

        this.timeout[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true
            });
        }, 7000);
    };

    reStart = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: '',
            redo: false
        });

        this.timeouts = [];
    };

    componentDidMount() {
        console.log('call componentDidMount and runTimeOut');
        this.runTimeOut();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('call componentDidUpdate');
        const { winNumbers, winBalls } = this.state;

        if (winBalls.length === 0) {
            this.runTimeOut();
        }
        if (prevState.winNumbers !== winNumbers) {
            console.log('로또 숫자를 생성합니다.');
        }
    }

    componentWillUnmount() {
        console.log('call componentWillUnmount');
        this.timeout.map((v) => {
            clearTimeout(v);
        });
    }

    render() {
        const { bonus, winBalls, redo } = this.state;
        console.log('call render');

        return(
          <>
              <div>당첨 숫자</div>
              <div id="result">
                  {winBalls.map((v, i) => {
                      return <LottoBall key={v + i} number={v}/>;
                  })}
              </div>
              <div>보너스!</div>
              <div>
                  {bonus !== '' ? <LottoBall key={bonus + 6} number={bonus}/> : null}
                  {redo ? <button onClick={this.reStart}>한 번 더 !</button> : null}
              </div>
          </>
        );
    }
}

export default LottoResultForClass;