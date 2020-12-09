const React = require('react');
const { useState, useRef, memo, useEffect } = React;

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

const RSPForHooks = memo(() => {
    const [resultMSG, setResultMSG] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.가위);
    const [score, setScore] = useState(0);
    const [sendLock, setSendLock] = useState(false);
    const interval = useRef();
    const TIME = 50;

    useEffect(() => {
        interval.current = setInterval(callTimer, TIME);
        return () => {
            clearInterval(interval.current);
        };
    }, [imgCoord]);

    const onClickBtn = (choice) => () => {
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        clearInterval(interval.current);

        if (diff === 0) {
            setResultMSG('비겼습니다!');
        }

        if ([-1, 2].includes(diff)) {
            setResultMSG('이겼습니다.');
            setScore((prevState) => {
                return prevState + 1;
            });
        }

        if ([-2, 1].includes(diff)) {
            setResultMSG('졌습니다.');
            setScore((prevState) => {
                return prevState - 1;
            });
        }

        setSendLock(true);

        setTimeout(() => {
            interval.current = setInterval(callTimer, TIME);
            setSendLock(false);
        }, 1000);
    };

    const computerChoice = (imgCoord) => {
        return Object.entries(rspCoords).find((v) => {
            return v[1] === imgCoord
        })[0];
    };

    const callTimer = () => {
        if(imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if(imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if(imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    };

    return(
      <>
          <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}/>
          <div>
              <button id="scissor" disabled={sendLock} className="btn" onClick={onClickBtn('가위')}>가위</button>
              <button id="rock" disabled={sendLock} className="btn" onClick={onClickBtn('바위')}>바위</button>
              <button id="paper" disabled={sendLock} className="btn" onClick={onClickBtn('보')}>보</button>
          </div>
          <div>{resultMSG}</div>
          <div>점수 : {score}</div>
      </>
    );
});

module.exports = RSPForHooks;