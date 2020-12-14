import React, { useEffect, useState, useRef, useCallback, useReducer, memo } from 'react';
import TrForTicTacToe from './TrForTicTacToe';

const TableForTicTacToe = memo(({ tableEvent, tableData, dispatch, winner }) => {

    return(
        <table onClick={tableEvent}>
            <tbody>
            {Array(tableData.length).fill().map((tr, i) => {
                return <TrForTicTacToe key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} winner={winner} />
            })}
            </tbody>
        </table>
    );
});

export default TableForTicTacToe;