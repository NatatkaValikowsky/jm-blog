import React from "react";
import Article from "../article";
import classes from "./articles-list.module.scss";

import { ArticleInterface, ArticlesListProps } from '../../types';

const ArticlesList:React.FC<ArticlesListProps> = ({articles}) => {

    return (
        <ul className={classes["articles-list"]}>
            { articles.map((el:ArticleInterface) => <Article key={el.slug} {...el}/>) }
        </ul>
    );
}

export default ArticlesList;