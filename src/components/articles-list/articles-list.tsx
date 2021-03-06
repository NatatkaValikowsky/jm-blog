import React from "react";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import classnames from "classnames";

import likeIcon from '../../img/like-icon.svg';
import classes from "./articles-list.module.scss";

interface ArticlesListProps {
    articles: Array<any>
}

const ArticlesList:React.FC<ArticlesListProps> = ({articles}) => {

    const renderTag = (element: string) => {
        return (
            <li key={element} className={classes["tags-block__tag"]}>{element}</li>
        )
    };

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
        tagList: Array<string>
    }

    const renderArticles = ({
                                title,
                                slug,
                                author,
                                description,
                                favoritesCount,
                                createdAt,
                                tagList}: ArticleInterface) => {

        return (
            <li key={slug} className={classnames(classes["articles-list__item"], classes["article-item"])}>
                <Link to={`/articles/${slug}`} className={classes["article-item__title"]}>{title}</Link>
                <div className={classnames(classes["article-item__like-block"], classes["like-block"])}>
                    <img className={classes["like-block__icon"]} src={likeIcon} alt="Like icon"/>
                    <span className={classes["like-block__count"]}>{favoritesCount}</span>
                </div>
                <ul className={classnames(classes["article-item__tags-list"], classes["tags-list"])}>
                    {
                        tagList.map(el => renderTag(el))
                    }
                </ul>
                <h4 className={classes["article-item__author-name"]}>{author.username}</h4>
                <span className={classes["article-item__publication-date"]}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
                <img src={author.image} alt="John Doe Avatar" className={classes["article-item__author-avatar"]}/>
                <p className={classes["article-item__introtext"]}>
                    {description}
                </p>
            </li>
        )
    }

    return (
        <ul className={classes["articles-list"]}>
            {
                articles.map(el => renderArticles(el))
            }
        </ul>
    );
}

export default ArticlesList;