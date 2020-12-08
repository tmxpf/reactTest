import React, { PureComponent, createRef } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1
};

class RSPForClass extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            resultMSG: '',
            imgCoord: rspCoords.가위,
            score: 0,
            sendLock: false
        };
    }

    interval;
    TIME = 100;

    componentDidMount() {
        this.interval = setInterval(this.callTimer, this.TIME);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => {
        const { imgCoord } = this.state;
        const myScore = scores[choice];
        const cpuScore = scores[this.computerChoice(imgCoord)];
        const diff =myScore - cpuScore;

        clearInterval(this.interval);

        if(diff === 0) {
            this.setState({
                resultMSG: '비겼습니다!',
                sendLock: true
            });
        }

        if([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    resultMSG: '이겼습니다',
                    score: prevState.score + 1,
                    sendLock: true
                };
            });
        }

        if([-2, 1].includes(diff)) {
            this.setState((prevState) => {
                return {
                    resultMSG: '졌습니다.',
                    score: prevState.score - 1,
                    sendLock: true
                };
            });
        }

        setTimeout(() => {
            this.interval = setInterval(this.callTimer, this.TIME);
            this.setState({
                sendLock: false
            })
        }, 1000);
    };

    callTimer = () => {
        const { imgCoord } = this.state;

        if(imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위
            });
        } else if(imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보
            });
        } else if(imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위
            });
        }
    };

    computerChoice = (imgCoord) => {
        return Object.entries(rspCoords).find((v) => {
            return v[1] === imgCoord
        })[0];
    };

    render() {
        const { imgCoord, resultMSG, score, sendLock } = this.state;

        return (
          <>
              <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}/>
              <div>
                  <button id="scissor" disabled={sendLock} className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                  <button id="rock" disabled={sendLock} className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                  <button id="paper" disabled={sendLock} className="btn" onClick={() => this.onClickBtn('보')}>보</button>
              </div>
              <div>{resultMSG}</div>
              <div>점수 : {score}</div>
          </>
        );
    }
}

export  default RSPForClass;
