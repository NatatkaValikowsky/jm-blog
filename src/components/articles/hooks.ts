import { useState, useEffect } from "react";
import {ArticleDTO} from "../../services/types";

const useHooks = (getArticles: (pageNum:number) => void) => {

    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState<ArticleDTO[]|[]>([]);
    const [articlesCount, setArticlesCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(function (){
        getArticles(page);
    }, []);

    return {
        page, setPage,
        articles, setArticles,
        articlesCount, setArticlesCount,
        isLoading, setIsLoading,
        hasError, setHasError
    }
}

export default useHooks;