import React, { memo, useContext } from 'react';
import { TableContext } from './MineSearch';
import MineSearchTd from "./MineSearchTd";

const MineSerachTr = memo(({ rowIndex }) => {
    const { tableData } = useContext(TableContext);

    return(
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((td, i) => {
                return <MineSearchTd key={rowIndex + ',' + i} rowIndex={rowIndex} cellIndex={i} data={tableData[rowIndex][i]}/>
            })}
        </tr>
    )
});

export default MineSerachTr;