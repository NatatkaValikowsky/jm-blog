import React, {useEffect, useState} from 'react';
import ApiService from '../../services/api-service';
import 'antd/dist/antd.css';
import { Pagination, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import ArticlesList from "../articles-list";

import classes from './articles.module.scss';
import './articles.css';

import { ArticleDTO } from '../../services/types';

const Articles= () => {

    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState<ArticleDTO[]|[]>([]);
    const [articlesCount, setArticlesCount] = useState(0);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const getArticles = (pageNum: number) => {
        setIsLoading(true);
        setHasError(false);
        ApiService.getArticles(pageNum)
            .then((data) => {
                setArticles(data.articles);
                setArticlesCount(data.articlesCount);
            })
            .catch(error => {
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(function (){
        getArticles(page);
    }, []);

    const setPageNumber = (pageNum: number) => {
        setPage(pageNum);
        getArticles(pageNum);
    };

    const error = hasError ?
        <div className={classes["error-block"]}>
            <Alert
                message="Ошибка подключения к API"
                description="Попробуйте позднее"
                type="error"
                closable
            />
        </div> : null;

    const content = isLoading ?
        <div className={classes["loading-block"]}>
            <Spin indicator={antIcon} />
        </div> :
        <>
            <ArticlesList articles={articles} />
            <div className={classes["pagination-block"]}>
                <Pagination  size="small" showSizeChanger={false} total={articlesCount} current={page} onChange={setPageNumber} pageSize={ApiService.articlesOnPage}/>
            </div>
        </>;

    return (
        <>
            {error}
            {content}
        </>
    )
};

export default Articles;