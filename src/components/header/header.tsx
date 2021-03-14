import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import classes from './header.module.scss';
import defaultAvatar from '../../img/user_avatar.svg';

interface HeaderProps {
    currUser: {
        username: string,
        image: string | null
    } | null,
    onLogout: () => void
}

const Header:React.FC<HeaderProps> = ({currUser, onLogout}) => {

    const userBlock = currUser ?
        <>
            <Link to={`/`} className={classes["profile-block__create_article"]}>Create article</Link>
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