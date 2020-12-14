import React, { useEffect, useState, useRef, useCallback, useReducer, memo } from 'react';
import TdForTicTacToe from './TdForTicTacToe';

const TrForTicTacToe = memo(({ rowIndex, rowData, dispatch, winner }) => {

    return(
        <tr>
            {Array(rowData.length).fill().map((td, i) => {
                return <TdForTicTacToe key={i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={rowData[i]} winner={winner}/>;
            })}
        </tr>
    )
});

export default TrForTicTacToe;