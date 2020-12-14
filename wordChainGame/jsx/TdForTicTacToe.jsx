import React, { useEffect, useState, useRef, useCallback, useReducer, memo } from 'react';
import { CELL_CLICK } from './TicTacToe';

const tdForTicTacToe = memo(({ cellIndex, dispatch, cellData, rowIndex }) => {

    const cellClick = () => {
        console.log('cellClick');
        console.log(rowIndex + ' ' + cellIndex);
        // 현재 선택한 셀에 값이 있다면 리턴.
        if(cellData) {
            return;
        }
        dispatch({type: CELL_CLICK, row: rowIndex, cell:cellIndex});
    };

    return(
        <td onClick={cellClick}>
            {cellData}
        </td>
    )
});

export default tdForTicTacToe;