const React = require('react');
const { useState, useRef, useEffect, memo } = React;
const LottoBall = require('./LottoBall');

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

const LottoResultForHooks = memo(() => {
    const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState('');
    const [redo, setRedo] = useState(false);
    const timeout = useRef([]);

    useEffect(() => {
        console.log('useEffect');
        for(let i = 0; i < winNumbers.length - 1; i++) {
            timeout.current[i] = setTimeout(() => {
                setWinBalls((prevWinBall) => { return [...prevWinBall, winNumbers[i]] });
            }, (i + 1) * 1000);
        }

        timeout.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        return () => {
            console.log('call componentWillUnmount');
            timeout.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeout.current]);

    const reStart = () => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus('');
        setRedo(false);

        timeout.current = [];
    };



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
                {redo ? <button onClick={reStart}>한 번 더 !</button> : null}
            </div>
        </>
    )

});

module.exports = LottoResultForHooks;

