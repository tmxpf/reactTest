import React, { memo, useContext, useCallback, useMemo } from 'react';
import { TableContext, CODE, EVENT_TYPE } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444'
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white'
            };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'red'
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow'
            };
        default:
            return {
                background: 'white'
            };
    }
}

const getTdText = (code) => {
    console.log('getTdText');

    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return code || '';
    }
}

const MineSerachTd = memo(({ rowIndex, cellIndex, data }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    //마우스 클릭
    const onClickTd = useCallback(() => {
        if(halted) return;  //게임 종료면 더이상 작동 하지 못하도록

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
                dispatch({type: EVENT_TYPE.OPEN_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.MINE:
                dispatch({type: EVENT_TYPE.CLICK_MINE, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    //마우스 우클릭
    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if(halted) return;  //게임 종료면 더이상 작동 하지 못하도록

        switch(tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type: EVENT_TYPE.FLAG_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({type: EVENT_TYPE.QUESTION_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({type: EVENT_TYPE.NORMARLIZE_CELL, row: rowIndex, cell: cellIndex});
                return;
        }

    }, [tableData[rowIndex][cellIndex], halted]);

    return (
        <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={data}/>
    )

    // return useMemo(() => (
    //     <td style={getTdStyle(data)} onClick={onClickTd} onContextMenu={onRightClickTd}>
    //         {getTdText(data)}
    //     </td>
    // ), [tableData[rowIndex][cellIndex]]);
});

const RealTd = memo(({onClickTd, onRightClickTd, data}) => {
    console.log('real td render')
    return (
        <td style={getTdStyle(data)} onClick={onClickTd} onContextMenu={onRightClickTd}>
            {getTdText(data)}
        </td>
    );
});

export default MineSerachTd;