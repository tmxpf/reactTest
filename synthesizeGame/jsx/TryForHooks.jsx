const React = require('react');
const { useState, useRef } = React;

const TryForHooks = ({ tryInfo }) => {
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}

module.exports = TryForHooks;
