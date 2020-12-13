import React, { useEffect, useState, useRef, useCallback, useReducer, memo } from 'react';
import TrForTicTacToe from './TrForTicTacToe';

const TableForTicTacToe = memo(({ tableData, dispatch }) => {

    return(
        <table>
            <tbody>
            {Array(tableData.length).fill().map((tr, i) => {
                return <TrForTicTacToe key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} />
            })}
            </tbody>
        </table>
    );
});

export default TableForTicTacToe;