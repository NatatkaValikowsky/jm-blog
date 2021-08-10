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

import { IArticle } from '../../types';
import RouteService from '../../services/route-service';

const Article:React.FC<IArticle> = (props) => {

    const [cookies,] = useCookies(['Token']);
    const [isRedirect, setIsRedirect] = useState(false);
    const [content, setContent] = useState(props);

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
            ApiService.favouriteArticle(content.slug)
                .then(data => setContent(data.article))
                .catch(error => alert('Error'));
        } else{
            ApiService.unfavouriteArticle(content.slug)
                .then(data => setContent(data.article))
                .catch(error => alert('Error'));
        }

    }

    if(isRedirect) return <Redirect to={RouteService.signInLink}/>

    const avatar = content.author.image ? content.author.image : `https://static.productionready.io/images/smiley-cyrus.jpg`;

    return (
        <li key={content.slug} className={classnames(classes["articles-list__item"], classes["article-item"])}>
            <Link to={RouteService.articleLink(content.slug)} className={classes["article-item__title"]}>{cutWords(content.title, 30)}</Link>
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
            <img src={avatar} alt="John Doe Avatar" className={classes["article-item__author-avatar"]}/>
            <p className={classes["article-item__introtext"]}>
                {content.description}
            </p>
        </li>
    );
}

export default Article;