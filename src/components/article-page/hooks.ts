import { useState, useEffect } from 'react';

import { contentInitial } from './initial';
import {ArticleInterface} from "../../types";

const useHooks = (getArticle: (slug: string) => void, slug: string) => {
    const [content, setContent] = useState<ArticleInterface>(contentInitial);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDel, setIsDel] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(function (){
        setIsLoading(true);
        setHasError(false);
        getArticle(slug);
    }, [slug]);

    return {
        content, setContent,
        isLoading, setIsLoading,
        hasError, setHasError,
        isDel, setIsDel,
        isDeleted, setIsDeleted
    }
}

export default useHooks;