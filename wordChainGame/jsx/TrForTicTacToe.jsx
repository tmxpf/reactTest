import React, { useEffect, useState, useRef, useCallback, useReducer, memo } from 'react';
import TdForTicTacToe from './TdForTicTacToe';

const TrForTicTacToe = memo(({ rowIndex, rowData, dispatch }) => {

    return(
        <tr>
            {Array(rowData.length).fill().map((td, i) => {
                return <TdForTicTacToe key={i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={rowData[i]}/>;
            })}
        </tr>
    )
});

export default TrForTicTacToe;