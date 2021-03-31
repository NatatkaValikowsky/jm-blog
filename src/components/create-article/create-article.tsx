import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import ApiService from '../../services/api-service';
import ArticleForm from "../article-form";

import {IAppState} from "../../store/types";

import { CreateArticleProps, IFormInput } from './types';
import useHooks from "./hooks";


const CreateArticle:React.FC<CreateArticleProps> = ({currUser}) => {
    const {
        isRedirect, setIsRedirect,
        formIsSending, setFormIsSending,
        tags, setTags
    } = useHooks();

    if(!currUser) return <Redirect to="/sign-up" />
    if(isRedirect)return <Redirect to="/" />

    const onSubmit = async (formData: IFormInput) => {

        if(formIsSending) return;

        const tagList:string[] = tags.reduce((acc:string[], el: {id:number, value:string}) => [...acc, el.value], []);
        const dataToSend = {
            title: formData.title,
            description: formData.description,
            body: formData.body,
            tagList
        };

        setFormIsSending(true);

        ApiService.createArticle(dataToSend)
            .then(() => {
                setIsRedirect(true);
            })
            .catch(() => {
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
            pageTitle="Create new article"
            onSubmit={onSubmit}
            tags={tags}
            addTag={addTag}
            deleteTag={deleteTag}
            tagSet={tagSet}
            formIsSending={formIsSending}
            content={{}}/>
}

const mapStateToProps = (state: IAppState) => ({
    currUser: state.currUserInfo
});

export default connect(mapStateToProps)(CreateArticle);