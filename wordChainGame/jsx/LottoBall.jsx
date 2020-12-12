//class사용할때 import 사용하기
// import React, { memo } from 'react';

//Hooks사용할때 const 사용하기
const React = require('react');
const { memo } = React;

const LottoBall = memo(({number}) => {
    let background;

    if(number <= 10) background = 'red';
    else if(number <= 20) background = 'orange';
    else if(number <= 30) background = 'yellow';
    else if(number <= 40) background = 'blue';
    else background = 'green';

    return(
        <>
            <div className="ball" style={{ background }}>{number}</div>
        </>
    )
});

//class사용할때 export default 사용하기
// export default LottoBall;

//Hooks사용할때 module.exports 사용하기
module.exports = LottoBall;