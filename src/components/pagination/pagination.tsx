import React from 'react';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

import classes from "./pagination.module.scss";

interface PaginationProps {
    onPage: number,
    count: number,
    currPage: number,
    onSetPage: (pageNum: number) => void
}

const PaginationBlock: React.FC<PaginationProps> = ({onPage, count, currPage, onSetPage}) => {
    return (
        <Pagination />
    );
}

export default PaginationBlock;