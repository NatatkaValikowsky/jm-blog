import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import classes from './header.module.scss';
import defaultAvatar from '../../img/user_avatar.svg';
import createIcon from '../../img/pen.svg';

import { HeaderProps } from './types';

const Header:React.FC<HeaderProps> = ({currUser, onLogout}) => {

    const userBlock = currUser ?
        <>
            <Link to={`/new-article`} className={classes["profile-block__create_article"]}>
                <img className={classes["profile-block__create-article-icon"]} src={createIcon} alt="Create new erticle"/>
                <span className={classes["profile-block__create-article-text"]}>Create article</span>
            </Link>
            <Link to={`/profile`} className={classes["profile-block__user-info"]}>
                <span className={classes["profile-block__user-name"]}>{currUser.username}</span>
                <img className={classes["profile-block__user-image"]} src={currUser.image ? currUser.image : defaultAvatar} alt="Аватар текущего пользователя"/>
            </Link>
            <span onClick={onLogout} className={classes["profile-block__logout"]}>Log Out</span>
        </> :
        <>
            <Link to={`/sign-in`} className={classes["profile-block__sign-in"]}>Sign In</Link>
            <Link to={`/sign-up`} className={classes["profile-block__sign-up"]}>Sign Up</Link>
        </>

    return (
        <header className={classes["header"]}>
            <div className={classes["logo"]}>
                <Link to={`/`} className={classes["logo__link"]}>
                    Realworld Blog
                </Link>
            </div>

            <div className={ classnames(classes["header__profile-block"], classes["profile-block"]) }>
                {userBlock}
            </div>
        </header>
    )
};

export default Header;