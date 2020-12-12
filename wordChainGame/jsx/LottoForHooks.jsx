const React = require('react');
const { useState, useRef } = React;
const LottoResultForHooks = require('./LottoResultForHooks');

const LottoForHooks = () => {
    const [click, setClick] = useState(false);
    const startBtn = useRef(null);

    const startLotto = () => {
        setClick(true);

        startBtn.current.remove();
    };

    return(
        <>
            <button ref={startBtn} onClick={startLotto}>시작!</button>
            {click && <LottoResultForHooks/>}
        </>
    )

};

module.exports = LottoForHooks;



