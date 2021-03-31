import React, {ChangeEvent} from 'react';

import classes from './article-form.module.scss';
import classnames from "classnames";
import {Spin} from "antd";
import {useForm} from "react-hook-form";
import {IFormInput} from "../create-article/types";
import { LoadingOutlined } from '@ant-design/icons';

interface ArticleFormProps {
    pageTitle: string,
    onSubmit: (formData: IFormInput) => void,
    tags: {id: number, value: string}[],
    addTag: () => void,
    deleteTag: (id: number) => void,
    tagSet: (e: React.FormEvent<HTMLInputElement>, id: number) => void,
    formIsSending: boolean,
    isLoading?: boolean,
    content: {
        title?:string,
        description?: string,
        body?: string
    },
    titleState?: string,
    onChangeTitle?: (e: React.FormEvent<HTMLInputElement>) => void,
    descrState?: string,
    onChangeDescription?: (e: React.FormEvent<HTMLInputElement>) => void,
    bodyState?: string,
    onChangeBodyText?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
}

const ArticleForm:React.FC<ArticleFormProps> = ({
    pageTitle,
    onSubmit,
    tags,
    addTag,
    deleteTag,
    tagSet,
    formIsSending,
    isLoading,
    content,
    titleState,
    onChangeTitle,
    descrState,
    onChangeDescription,
    bodyState,
    onChangeBodyText
    }) => {
    const { register, errors, handleSubmit} = useForm<IFormInput>();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const {
        title,
        description,
        body
    } = content;

    return (
        isLoading ?
        <div className={classes["loading-block"]}>
            <Spin indicator={antIcon}/>
        </div> :
        <div className={classes["article-form__body"]}>
            <h1 className={classes["article-form__title"]}>{pageTitle}</h1>
            <form className={classes["article-form__form"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes["article-form__form-group"]}>
                    <label className={classes["article-form__label"]} htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        className={classes["article-form__input"]}
                        type="text"
                        placeholder="Title"
                        ref={register(
                            { required: {
                                    value: true,
                                    message: "Title is required"
                                }
                            })}
                        value={titleState !== '' ? titleState : title}
                        onChange={onChangeTitle}/>
                    <span className={classes["article-form__error"]}>{errors.title?.message}</span>
                </div>

                <div className={classes["article-form__form-group"]}>
                    <label className={classes["article-form__label"]} htmlFor="description">Short description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className={classes["article-form__input"]}
                        placeholder="Description"
                        ref={register(
                            { required: {
                                    value: true,
                                    message: "Description is required"
                                }
                            })}
                        value={descrState !== '' ? descrState : description}
                        onChange={onChangeDescription}/>
                    <span className={classes["article-form__error"]}>{errors.description?.message}</span>
                </div>

                <div className={classes["article-form__form-group"]}>
                    <label className={classes["article-form__label"]} htmlFor="body">Text</label>
                    <textarea
                        name="body"
                        id="body"
                        cols={30}
                        rows={10}
                        placeholder="Text"
                        className={classes["article-form__textarea"]}
                        ref={register(
                            { required: {
                                    value: true,
                                    message: "Text is required"
                                }
                            })}
                        value={bodyState !== '' ? bodyState : body}
                        onChange={onChangeBodyText}/>
                    <span className={classes["article-form__error"]}>{errors.body?.message}</span>
                </div>

                <div className={classes["article-form__form-group"]}>
                    <label className={classes["article-form__label"]} htmlFor="text">Tags</label>
                    {
                        tags.map((el, index) => {
                            const addBtn = index === tags.length - 1 ?
                                <button
                                    type="button"
                                    className={classes["article-form__add-tag"]}
                                    onClick={addTag}>Add tag</button> :
                                null;

                            return (
                                <div key={el.id} className={classes["article-form__tag-group"]}>
                                    <input
                                        type="text"
                                        name={`tag-${el.id}`}
                                        onChange={(e) => tagSet(e, el.id)}
                                        value={el.value}
                                        className={classes["article-form__tag-input"]}/>
                                    <button
                                        type="button"
                                        className={classes["article-form__delete-tag"]}
                                        onClick={() => {deleteTag(el.id)}}>Delete</button>{addBtn}
                                </div>
                            )
                        })
                    }
                </div>
                <button type="submit"
                        className={classnames(classes["article-form__btn"], {[classes["article-form__btn--is-sending"]]: formIsSending})}>

                    {formIsSending ?
                        <Spin indicator={antIcon} /> :
                        `Send`}
                </button>
            </form>
        </div>
    );
}

export default ArticleForm;