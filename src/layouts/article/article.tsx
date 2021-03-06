import React, {useEffect, useState} from 'react';
import ApiService from '../../services/api-service';
import { useParams } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import classes from "./article.module.scss";
import likeIcon from "../../img/like-icon.svg";
const { format: formatDate} = require('date-fns');

const Article = () => {

    interface ArticleInterface {
        title: string,
        slug: string,
        author: {
            username: string,
            image: string
        },
        description: string,
        favoritesCount: number,
        createdAt: string,
        tagList: Array<string>,
        body: string
    }

    const [content, setContent] = useState<ArticleInterface>({
        title: "",
        slug: "",
        author: {
            username: "",
            image: ""
        },
        description: "",
        favoritesCount: 0,
        createdAt: "",
        tagList: [],
        body: ""
    });
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    interface ParamTypes {
        slug: string
    }

    const { slug } = useParams<ParamTypes>();

    const renderTag = (element: string) => {
        return (
            <li key={element} className={classes["tags-list__tag"]}>{element}</li>
        )
    };

    const getArticle = (slug: string) => {
        ApiService.getArticle(slug)
            .then(data => {
                setContent(data.article);
            })
            .catch(error => {
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(function (){
        setIsLoading(true);
        setHasError(false);
        getArticle(slug);
    }, [slug]);

    const {
        title,
        favoritesCount,
        tagList,
        author,
        createdAt,
        description,
        body
    } = content;

    function parseISOString(s: string) {
        if(s.length === 0) return new Date();
        return new Date(s);
    }

    const error = hasError ?
        <div className={classes["error-block"]}>
            <Alert
                message="Ошибка подключения к API"
                description="Попробуйте позднее"
                type="error"
                closable
            />
        </div> : null;

    const contentBody = isLoading ?
        <div className={classes["loading-block"]}>
            <Spin indicator={antIcon} />
        </div> :
        <div className={classes["article-body"]}>
            <div className={classes["article-header"]}>
                <h1 className={classes["article-title"]}>{title}</h1>
                <div className={classes["like-block"]}>
                    <img className={classes["like-block__icon"]} src={likeIcon} alt="Like icon"/>
                    <span className={classes["like-block__count"]}>{favoritesCount}</span>
                </div>

                <ul className={classes["tags-list"]}>
                    {
                        tagList.map(el => renderTag(el))
                    }
                </ul>
                <h4 className={classes["author-name"]}>{author.username}</h4>
                <span className={classes["publication-date"]}>{formatDate(parseISOString(createdAt), 'MMMM dd, yyyy')}</span>
                <img src={author.image} alt="John Doe Avatar" className={classes["author-avatar"]}/>
                <p className={classes["introtext"]}>
                    {description}
                </p>
            </div>
            <div className={classes["article-text"]}>
                <ReactMarkdown>
                    {body}
                </ReactMarkdown>
            </div>
        </div>;

    return (
        <>
            {error}
            {contentBody}
        </>
    );
}

export default Article;