import React, { PureComponent } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    바위: 1,
    가위: 0,
    보: -1
};

class RSPForClass extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            resultMSG: '',
            imgCoord: rspCoords.가위,
            score: 0
        };
    }

    interval;

    componentDidMount() {
        this.interval = setInterval(() => {
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
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => {

    };

    render() {
        const { imgCoord, resultMSG, score } = this.state;

        return(
          <>
              <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}/>
              <div>
                  <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                  <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                  <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
              </div>
              <div>{resultMSG}</div>
              <div>점수 : {score}</div>
          </>
        );
    }
}

export  default RSPForClass;
