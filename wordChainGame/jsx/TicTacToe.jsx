import React, { useEffect, useState, useRef, useCallback, useReducer, memo } from 'react';
import TableForTicTacToe from './TableForTicTacToe';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    recentCell: [-1, -1]
};

export const SET_WINNER = 'SET_WINNER';
export const CELL_CLICK = 'CELL_CLICK';
export const RESET_GAME = 'RESET_GAME';
export const CHANGE_TURN = 'CHANGE_TURN';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            debugger;
            return {
                ...state,
                winner: action.winner
            };
        case CELL_CLICK:
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;

            return {
                ...state,
                tableData: tableData,
                recentCell: [action.row, action.cell]
            };
        case RESET_GAME:
            return {
                winner: '',
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                recentCell: [-1, -1]
            }
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O'
            }
    }
};

const TicTacToe = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, winner, turn, recentCell } = state;

    const onClickTable = useCallback(() => {
        console.log('2212');
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if(row < 0) return;

        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        console.log(win, row, cell, tableData, turn);

        if(win) {
            dispatch({type: SET_WINNER, winner: turn});
            dispatch({type: RESET_GAME});
        } else {
            dispatch({ type: CHANGE_TURN });
        }

    }, [recentCell]);

    return(
        <>
            <TableForTicTacToe onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}의 승리입니다.</div>}
        </>
    )
});

export default TicTacToe;
