const React = require('react');
const { useState, useRef, memo } = React;

const TryForHooks = memo(({ tryInfo }) => {
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
});

module.exports = TryForHooks;
