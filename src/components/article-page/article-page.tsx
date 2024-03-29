import React, {useEffect, useState} from 'react';
import ApiService from '../../services/api-service';
import { useParams } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import classes from "./article-page.module.scss";
import likeIcon from "../../img/like-icon.svg";
import likedIcon from "../../img/liked-icon.svg";
import { connect } from 'react-redux';
import {IAppState} from "../../store/types";
import { Link } from "react-router-dom";
import delImg from '../../img/del-icon.svg';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router';
import {cutWords} from "../../utils";

import {ArticleProps, ParamTypes} from './types';
import {IArticle} from "../../types";
import {contentInitial} from "./initial";
import RouteService from '../../services/route-service';

const { format: formatDate} = require('date-fns');

const ArticlePage:React.FC<ArticleProps> = ({currUser}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { slug } = useParams<ParamTypes>();
    const [cookies,] = useCookies(['Token']);

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

    const [content, setContent] = useState<IArticle>(contentInitial);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDel, setIsDel] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(function (){
        setIsLoading(true);
        setHasError(false);
        getArticle(slug);
    }, [slug]);

    const { title,
        favoritesCount,
        tagList,
        author,
        createdAt,
        description,
        body,
    } = content;

    const renderTag = (element: string) => {
        return (
            <li key={element} className={classes["tags-list__tag"]}>{element}</li>
        )
    };

    const favouriteArticle = () =>{
        if(!content.favorited){
            ApiService.favouriteArticle(slug)
                .then(data => setContent(data.article))
                .catch(error => alert('Error'));
        } else{
            ApiService.unfavouriteArticle(slug)
                .then(data => setContent(data.article))
                .catch(error => alert('Error'));
        }

    }

    function parseISOString(s: string) {
        if(s.length === 0) return new Date();
        return new Date(s);
    }

    const deleteArticle = () => {
        ApiService.deleteArticle(slug)
            .then(data => {
                setIsDeleted(true);
            })
            .catch(error => {
                alert('Error');
            });
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
                <h1 className={classes["article-title"]}>{cutWords(title, 30)}</h1>
                <div className={classes["like-block"]}
                     onClick={cookies.Token ? favouriteArticle : ()=>{}}>
                    <img className={classes["like-block__icon"]} src={content.favorited ? likedIcon : likeIcon} alt="Like icon"/>
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
                {
                    currUser && currUser.username === author.username &&
                    <div className={classes["buttons-block"]}>
                        <div className={classes["delete-btn-block"]}>
                            <button
                                className={classes["buttons-block__delete"]}
                                type="button"
                                onClick={()=>{setIsDel(true)}}>Delete</button>
                            {isDel &&
                                <div className={classes["comfirm-delete"]}>
                                    <div className={classes["comfirm-delete__wrapper"]}>
                                        <span className={classes["comfirm-delete__title"]}>
                                            <img src={delImg} alt="Delete Article"/> Are you sure to delete this article?
                                        </span>
                                        <span className={classes["buttons-block"]}>
                                            <button
                                                className={classes["buttons-block__no"]}
                                                onClick={()=>{setIsDel(false)}}>No</button>
                                            <button
                                                className={classes["buttons-block__yes"]}
                                                onClick={deleteArticle}>Yes</button>
                                        </span>
                                    </div>
                                </div>
                            }
                        </div>
                        <Link className={classes["buttons-block__edit"]} to={RouteService.editArticleLink(slug)}>Edit</Link>
                    </div>
                }
            </div>
            <div className={classes["article-text"]}>
                <ReactMarkdown>
                    {body}
                </ReactMarkdown>
            </div>
        </div>;

    if(isDeleted) return <Redirect to={RouteService.mainRouteLink}/>

    return (
        <>
            {error}
            {contentBody}
        </>
    );
}

const mapStateToProps = (state: IAppState) => ({
    currUser: state.currUserInfo
});

export default connect(mapStateToProps)(ArticlePage);