import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import classes from './header.module.scss';

const Header:React.FC = () => (
    <header className={classes["header"]}>
        <div className={classes["logo"]}>
            <Link to={`/`} className={classes["logo__link"]}>
                Realworld Blog
            </Link>
        </div>

        <div className={ classnames(classes["header__profile-block"], classes["profile-block"]) }>
            <Link to={`/sign-in`} className={classes["profile-block__sign-in"]}>Sign In</Link>
            <Link to={`/sign-up`} className={classes["profile-block__sign-up"]}>Sign Up</Link>
        </div>
    </header>
);

export default Header;