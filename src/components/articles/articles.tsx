import React from 'react';
import ApiService from '../../services/api-service';
import 'antd/dist/antd.css';
import { Pagination, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import ArticlesList from "../articles-list";
import useHooks from "./hooks";

import classes from './articles.module.scss';
import './articles.css';

const Articles= () => {

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const getArticles = (pageNum: number) : void => {
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

    const {
        page, setPage,
        articles, setArticles,
        articlesCount, setArticlesCount,
        isLoading, setIsLoading,
        hasError, setHasError
    } = useHooks(getArticles);

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