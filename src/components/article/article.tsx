import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import classes from './article.module.scss';
import classnames from "classnames";
import {Link} from "react-router-dom";
import likeIcon from "../../img/like-icon.svg";
import likedIcon from "../../img/liked-icon.svg";
import {format} from "date-fns";
import ApiService from "../../services/api-service";
import {cutWords} from "../../utils";
import { Redirect } from 'react-router';

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
    favorited:boolean
}

const Article:React.FC<ArticleInterface> = ({
                     title,
                     slug,
                     author,
                     description,
                     favoritesCount,
                     favorited,
                     createdAt,
                     tagList}) => {

    const [cookies,] = useCookies(['Token']);
    const [isRedirect, setIsRedirect] = useState(false);
    const [content, setContent] = useState({
        title,
        slug,
        author,
        description,
        favoritesCount,
        favorited,
        createdAt,
        tagList});

    const renderTag = (element: string) => {
        return (
            <li key={element} className={classes["tags-block__tag"]}>{element}</li>
        )
    };

    const favouriteArticle = () =>{
        if(!cookies.Token){
            setIsRedirect(true);
            return;
        }

        if(!content.favorited){
            ApiService.favouriteArticle(slug, cookies.Token)
                .then(data => setContent(data.article))
                .catch(error => alert('Error'));
        } else{
            ApiService.unfavouriteArticle(slug, cookies.Token)
                .then(data => setContent(data.article))
                .catch(error => alert('Error'));
        }

    }

    if(isRedirect) return <Redirect to={`/sign-in`}/>

    return (
        <li key={content.slug} className={classnames(classes["articles-list__item"], classes["article-item"])}>
            <Link to={`/articles/${content.slug}`} className={classes["article-item__title"]}>{cutWords(content.title, 30)}</Link>
            <div
                className={classnames(classes["article-item__like-block"], classes["like-block"])}
                onClick={favouriteArticle}>
                <img className={classes["like-block__icon"]} src={content.favorited ? likedIcon : likeIcon} alt="Like icon"/>
                <span className={classes["like-block__count"]}>{content.favoritesCount}</span>
            </div>
            <ul className={classnames(classes["article-item__tags-list"], classes["tags-list"])}>
                {
                    content.tagList.map(el => renderTag(el))
                }
            </ul>
            <h4 className={classes["article-item__author-name"]}>{content.author.username}</h4>
            <span className={classes["article-item__publication-date"]}>{format(new Date(content.createdAt), 'MMMM dd, yyyy')}</span>
            <img src={author.image} alt="John Doe Avatar" className={classes["article-item__author-avatar"]}/>
            <p className={classes["article-item__introtext"]}>
                {content.description}
            </p>
        </li>
    );
}

export default Article;