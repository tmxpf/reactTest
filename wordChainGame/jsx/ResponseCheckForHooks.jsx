const React = require('react');
const { useState, useRef, memo } = React;

const ResponseCheckForHooks = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if(state === 'waiting') {
            setState('ready');
            setMessage('기다리세요. 곧 시작합니다.');

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');

                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        }

        if(state === 'ready') {
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('준비상태에서 클릭하시면 안됩니다!');
            setTimeout(() => {
                setMessage('클릭해서 시작하세요.');
            }, 1000);
        }

        if(state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current]
            });

            console.log(endTime.current - startTime.current);
        }
    };

    const onButtonClick = () => {
        if(timeout.current) {
            clearTimeout(timeout.current);
        }
        setState('waiting');
        setMessage('클릭해서 시작하세요.');
        setResult([]);
    };

    const renderAverage = () => {
        return (result.length === 0) ? null : <><div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div><button onClick={onButtonClick}>리셋</button></>;
    };

    return(
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    );
};

module.exports = ResponseCheckForHooks;
