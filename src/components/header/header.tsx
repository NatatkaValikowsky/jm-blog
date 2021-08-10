import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import classes from './header.module.scss';
import defaultAvatar from '../../img/user_avatar.svg';
import createIcon from '../../img/pen.svg';

import { HeaderProps } from './types';
import RouteService from '../../services/route-service';

const Header:React.FC<HeaderProps> = ({currUser, onLogout}) => {

    const userBlock =
        <>
            <Link to={RouteService.signInLink} className={classes["profile-block__sign-in"]}>Sign In</Link>
            <Link to={RouteService.signUpLink} className={classes["profile-block__sign-up"]}>Sign Up</Link>
        </>;

    const userAuthBlock =
        <>
            <Link to={RouteService.createArticleLink} className={classes["profile-block__create_article"]}>
                <img className={classes["profile-block__create-article-icon"]} src={createIcon} alt="Create new erticle"/>
                <span className={classes["profile-block__create-article-text"]}>Create article</span>
            </Link>
            <Link to={RouteService.profileLink} className={classes["profile-block__user-info"]}>
                <span className={classes["profile-block__user-name"]}>{ currUser ? currUser.username : null}</span>
                <img className={classes["profile-block__user-image"]} src={currUser && currUser.image ? currUser.image : defaultAvatar} alt="Аватар текущего пользователя"/>
            </Link>
            <span onClick={onLogout} className={classes["profile-block__logout"]}>Log Out</span>
        </>;


    return (
        <header className={classes["header"]}>
            <div className={classes["logo"]}>
                <Link to={RouteService.mainRouteLink} className={classes["logo__link"]}>
                    Realworld Blog
                </Link>
            </div>

            <div className={ classnames(classes["header__profile-block"], classes["profile-block"]) }>
                {
                    currUser ? userAuthBlock : userBlock
                }
            </div>
        </header>
    )
};

export default Header;