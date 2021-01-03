import React, { memo, useContext } from 'react';
import { TableContext } from './MineSearch';
import MineSearchTr from "./MineSearchTr";

const MineSerachTable = memo(() => {
    const { tableData } = useContext(TableContext);

    return(
        <table>
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => {
                    return <MineSearchTr key={i} rowIndex={i} />;
                })}
            </tbody>
        </table>
    )
});

export default MineSerachTable;