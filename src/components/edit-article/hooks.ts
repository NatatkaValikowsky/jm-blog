import {useState, useEffect} from "react";
import {initialContent, initialTags} from "./initial";
import {ArticleInterface} from "../../types";

const useHooks = (getArticle: (slug: string) => void, slug: string) => {
    const [formIsSending, setFormIsSending] = useState(false);
    const [tags, setTags] = useState(initialTags);
    const [titleState, setTitleState] = useState('');
    const [descrState, setDescrState] = useState('');
    const [bodyState, setBodyState] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState<ArticleInterface>(initialContent);

    useEffect(function (){
        getArticle(slug);
    }, [slug]);

    return {
        formIsSending, setFormIsSending,
        tags, setTags,
        titleState, setTitleState,
        descrState, setDescrState,
        bodyState, setBodyState,
        isRedirect, setIsRedirect,
        isLoading, setIsLoading,
        content, setContent
    }
}

export default useHooks;