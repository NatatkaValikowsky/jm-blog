import React, {ChangeEvent} from "react";
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import ApiService from "../../services/api-service";
import {IAppState} from "../../store/types";
import {Redirect} from 'react-router';
import { IArticleFormInput } from '../../types';
import { EditArticleProps, ParamTypes } from './types';
import useHooks from "./hooks";
import ArticleForm from "../article-form";

const EditArticle:React.FC<EditArticleProps> = ({currUser}) => {
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

    const {
        formIsSending, setFormIsSending,
        tags, setTags,
        titleState, setTitleState,
        descrState, setDescrState,
        bodyState, setBodyState,
        isRedirect, setIsRedirect,
        isLoading, setIsLoading,
        content, setContent
    } = useHooks(getArticle, slug);

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

    if(!currUser){
        return (
            <Redirect to="/sign-up" />
        );
    }

    if(isRedirect){
        return <Redirect to="/" />
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

const mapStateToProps = (state: IAppState) => ({
    currUser: state.currUserInfo
});

export default connect(mapStateToProps)(EditArticle);