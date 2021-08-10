import React, {ChangeEvent, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import ApiService from "../../services/api-service";
import {Redirect} from 'react-router';
import {IArticle, IArticleFormInput} from '../../types';
import { ParamTypes } from './types';
import ArticleForm from "../article-form";
import {initialContent, initialTags} from "./initial";
import RouteService from '../../services/route-service';

const EditArticle:React.FC = () => {
    const { slug } = useParams<ParamTypes>();

    const getArticle = (slug: string) => {
        ApiService.getArticle(slug)
            .then(data => {
                setContent(data.article);

                const {
                    tagList,
                } = data.article;

                const formatTaglist = tagList.map((el:string, index:number) => {
                    return {
                        id: index,
                        value: el
                    }
                });

                setTags(formatTaglist);
                setIsLoading(false);
            })
            .catch(error => {
                //setHasError(true);
            });
    }

    const [formIsSending, setFormIsSending] = useState(false);
    const [tags, setTags] = useState(initialTags);
    const [titleState, setTitleState] = useState('');
    const [descrState, setDescrState] = useState('');
    const [bodyState, setBodyState] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState<IArticle>(initialContent);

    useEffect(function (){
        getArticle(slug);
    }, [slug]);

    const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setTitleState(value);
    }

    const onChangeDescription = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setDescrState(value);
    }

    const onChangeBodyText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        setBodyState(value);
    }

    if(isRedirect){
        return <Redirect to={RouteService.mainRouteLink} />
    }

    const onSubmit = async (formData: IArticleFormInput) => {

        if(formIsSending) return;

       const tagList:string[] = tags.reduce((acc:string[], el: {id:number, value:string}) => [...acc, el.value], []);
        const dataToSend = {
            title: formData.title,
            description: formData.description,
            body: formData.body,
            tagList
        };

        setFormIsSending(true);

        ApiService.updateArticle(dataToSend, slug)
            .then(data => {
                setIsRedirect(true);
            })
            .catch(error => {
                alert('Error');
            })
            .finally(() => {
                setFormIsSending(false);
            })
    }

    const addTag = () => {
        const maxId = tags.reduce((acc, el) => el.id, 0);
        setTags([
            ...tags,
            {
                id: maxId + 1,
                value: ''
            }
        ]);
    }

    const deleteTag = (id: number) => {
        setTags(tags.filter(el => el.id !== id));
    }

    const tagSet = (e: React.FormEvent<HTMLInputElement>, id: number) => {
        const value = e.currentTarget.value;
        setTags(tags.map(el => {
            if(el.id === id){
                el.value = value;
            }

            return el;
        }));
    }

    return <ArticleForm
            pageTitle="Edit article"
            onSubmit={onSubmit}
            tags={tags}
            addTag={addTag}
            deleteTag={deleteTag}
            tagSet={tagSet}
            formIsSending={formIsSending}
            content={content}
            titleState={titleState}
            onChangeTitle={onChangeTitle}
            isLoading={isLoading}
            descrState={descrState}
            onChangeDescription={onChangeDescription}
            bodyState={bodyState}
            onChangeBodyText={onChangeBodyText}/>
}

export default EditArticle;