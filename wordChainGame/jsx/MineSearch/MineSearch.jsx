import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import Form from './Form';
import MineSearchTable from './MineSearchTable';

export const TableContext = createContext({
    tableData : [],
    halted : true,
    dispatch : () => {}
});

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0
}

export const CODE = {
   MINE: -7,    //마인
   NORMAL: -1,  //빈 값
   QUESTION: -2,    //물음표(오른쪽 마우스)
   FLAG: -3,    //깃발(오른쪽 마우스)
   QUESTION_MINE: -4,   //지뢰가 있는 곳 물음표
   FLAG_MINE: -5,   //지뢰가 있는 곳 깃발
   CLICKED_MINE: -6,    //선택된 곳 마인
   OPENED: 0    //해당 칸 오픈
};

export const EVENT_TYPE = {
    START_GAME: 'START_GAME',   //게임 시작
    OPEN_CELL: 'OPEN_CELL',         //셀 하나 오픈
    CLICK_MINE: 'CLICK_MINE',        //마인 클릭
    FLAG_CELL: 'FLAG_CELL',         //우측 마우스(깃발)
    QUESTION_CELL: 'QUESTION_CELL', //우측 마우스(물음표)
    NORMARLIZE_CELL: 'NORMARLIZE_CELL',
    INCREMENT_TIMER: 'INCREMENT_TIMER'
};

const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });

    const shuffle = [];
    while(candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for(let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
};

const reducer = (state, action) => {
    switch (action.type) {
        case EVENT_TYPE.START_GAME : {
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine
                },
                tableData : plantMine(action.row, action.cell, action.mine),
                halted: false,
                openedCount: 0,
                timer: 0,
                result: ''
            };
        }
        case EVENT_TYPE.OPEN_CELL: {
            const tableData = [...state.tableData];
            const checked = [];
            let openedCount = 0;
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });

            const checkAround = (row, cell) => {
                //검색 범위가 row, cell의 값을 벗어난다면 return
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
                    return;
                }

                //닫힌 칸만 열기(flag, question 제외)
                if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                }

                // 한 번 연칸은 무시하기
                if (checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                }

                let around = [
                    tableData[row][cell - 1], tableData[row][cell + 1]
                ];

                // 주변 지뢰개수 얻어오기.
                if(tableData[row - 1]) {
                    around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
                }
                if(tableData[row + 1]) {
                    around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
                }

                const count = around.filter((v) => {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                }).length;

                if(count === 0) {
                    if(row > -1) {
                        const near = [];
                        if(row - 1 > -1) {
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if(row + 1 < tableData.length) {
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }

                        near.forEach((n) => {
                            if(tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkAround(n[0], n[1]);
                            }
                        });
                    }
                }

                if(tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }

                console.log(`row,cell : ${row},${cell}   count : ${count}`);
                tableData[row][cell] = count;
            };

            checkAround(action.row, action.cell);

            let halted = false;
            let result = '';
            console.log(`${state.data.row * state.data.cell - state.data.mine} and ${state.openedCount} , ${openedCount}`);

            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다`;
            }

            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                result,
                halted
            };
        }
        case EVENT_TYPE.CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;

            return {
                ...state,
                tableData,
                halted: true,
                result: '게임 종료!'
            };
        }
        case EVENT_TYPE.FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if(tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else if(tableData[action.row][action.cell] !== CODE.OPENED) {
                tableData[action.row][action.cell] = CODE.FLAG;
            }

            return {
                ...state,
                tableData
            };
        }
        case EVENT_TYPE.QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if(tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }

            return {
                ...state,
                tableData
            };
        }
        case EVENT_TYPE.NORMARLIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }

            return {
                ...state,
                tableData
            };
        }
        case EVENT_TYPE.INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1
            }
        }
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    const tableContextProvider = useMemo(() => {
        return {tableData, halted, dispatch}
    }, [tableData, halted]);

    useEffect(() => {
        debugger;
        let timer;
        if(halted === false) {
            timer = setInterval(() => {
                dispatch({type : EVENT_TYPE.INCREMENT_TIMER});
            }, 1000);
        }

        return () => {
            console.log('unmount');
            clearInterval(timer);
        }
    }, [halted]);

    return(
        <TableContext.Provider value={tableContextProvider}>
            <Form />
            <MineSearchTable />
            <div>
                {result}
            </div>
        </TableContext.Provider>
    )
};

export default MineSearch;
