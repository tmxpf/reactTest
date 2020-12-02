const React = require('react');
const { useState, useRef } = React;

const WordChainGame = () => {
    const [word, setWord] = useState('바밤바');
    const [inputVal, setInputVal] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setInputVal(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        let firstChar = inputVal.charAt(0);
        let lastChar = word.charAt(word.length - 1);
        let good = () => {
            setWord(inputVal);
            setInputVal('');
            setResult('딩동댕!');
        };
        let bad = () => {
            setWord(word);
            setInputVal('');
            setResult('땡!');
        };

        (firstChar === lastChar) ? good() : bad();

        inputRef.current.focus();
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input type="text" ref={inputRef} onChange={onChangeInput} value={inputVal}/>
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = WordChainGame;