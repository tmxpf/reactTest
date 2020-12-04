const React = require('react');
const { useState, useRef } = React;
const TryForHooks = require('./TryForHooks');

function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];

    for(let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }

    return array;
}


const NumberBaseBallForHooks = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        let valueStr = value || '';
        let answerStr = answer.join('');

        //홈런
        if(valueStr === answerStr) {
            setTries((prevTries) => {
                return [...prevTries, { try: value, result: '홈런!' }];
            })
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            if(tries.length >= 9) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join('')}였습니다.`);
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                alert('게임을 다시 시작합니다.');
            } else {
                for(let i = 0; i < 4; i++) {
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if(answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}];
                })
                setValue('');
            }

        }

        inputRef.current.focus();
    };

    return(
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} ref={inputRef} onChange={onChangeInput} value={value}/>
                <button>입력!</button>
            </form>
            <ul>
                {tries.map((v, i) => {
                    return(
                        <TryForHooks Key={`${i + 1}차 시도 :`} tryInfo={v} index={i}/>
                    );
                })}
            </ul>
            <div>{answer}</div>
        </>
    );

}

module.exports = NumberBaseBallForHooks;