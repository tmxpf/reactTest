import React, { useEffect, useState, useRef, useCallback, useReducer, memo } from 'react';
import { CELL_CLICK } from './TicTacToe';

const tdForTicTacToe = memo(({ cellIndex, dispatch, cellData, rowIndex, winner }) => {

    const cellClick = () => {
        console.log('cellClick');
        console.log(rowIndex + ' ' + cellIndex);
        // 현재 선택한 셀에 값이 있다면 리턴.

        if(cellData || winner) {
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