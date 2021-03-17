import React from "react";
import { useCookies } from 'react-cookie';
import Article from "../article";
import classes from "./articles-list.module.scss";

interface ArticlesListProps {
    articles: Array<any>
}

const ArticlesList:React.FC<ArticlesListProps> = ({articles}) => {

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

    return (
        <ul className={classes["articles-list"]}>
            {
                articles.map((el:ArticleInterface) => <Article key={el.slug} {...el}/>)
            }
        </ul>
    );
}

export default ArticlesList;