import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import ApiService from '../../services/api-service';
import { useCookies } from 'react-cookie';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classes from './create-article.module.scss';
import {IAppState} from "../../store/types";
import classnames from "classnames";

interface CreateArticleProps{
    currUser: {
        username: string,
        email: string,
        bio: string | null,
        image: string | null
    }
}

interface IFormInput {
    title: string,
    description: string,
    body: string,
    tags: Array<{
        id: number,
        value: string
    }>
}

const CreateArticle:React.FC<CreateArticleProps> = ({currUser}) => {
    const { register, errors, handleSubmit} = useForm<IFormInput>();
    const [cookies,] = useCookies(['Token']);
    const [isRedirect, setIsRedirect] = useState(false);
    const [formIsSending, setFormIsSending] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [tags, setTags] = useState([
        {
            id: 1,
            value: ''
        },
        {
            id: 2,
            value: ''
        }
    ]);

    if(!currUser){
        return (
            <Redirect to="/sign-up" />
        );
    }

    if(isRedirect){
        return <Redirect to="/" />
    }

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

        ApiService.createArticle(dataToSend, cookies.Token)
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

    return (
        <div className={classes["create-article__body"]}>
            <h1 className={classes["create-article__title"]}>Create new article</h1>
            <form className={classes["create-article__form"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes["create-article__form-group"]}>
                    <label className={classes["create-article__label"]} htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        className={classes["create-article__input"]}
                        type="text"
                        placeholder="Title"
                        ref={register(
                            { required: {
                                    value: true,
                                    message: "Title is required"
                                }
                            })}/>
                    <span className={classes["create-article__error"]}>{errors.title?.message}</span>
                </div>

                <div className={classes["create-article__form-group"]}>
                    <label className={classes["create-article__label"]} htmlFor="description">Short description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className={classes["create-article__input"]}
                        placeholder="Description"
                        ref={register(
                            { required: {
                                    value: true,
                                    message: "Description is required"
                                }
                            })}/>
                    <span className={classes["create-article__error"]}>{errors.description?.message}</span>
                </div>

                <div className={classes["create-article__form-group"]}>
                    <label className={classes["create-article__label"]} htmlFor="body">Text</label>
                    <textarea
                        name="body"
                        id="body"
                        cols={30}
                        rows={10}
                        placeholder="Text"
                        className={classes["create-article__textarea"]}
                        ref={register(
                            { required: {
                                    value: true,
                                    message: "Text is required"
                                }
                            })}/>
                    <span className={classes["create-article__error"]}>{errors.body?.message}</span>
                </div>

                <div className={classes["create-article__form-group"]}>
                    <label className={classes["create-article__label"]} htmlFor="text">Tags</label>
                    {
                        tags.map((el, index) => {
                            const addBtn = index === tags.length - 1 ?
                                <button
                                    type="button"
                                    className={classes["create-article__add-tag"]}
                                    onClick={addTag}>Add tag</button> :
                                null;

                            return (
                                <div key={el.id} className={classes["create-article__tag-group"]}>
                                    <input
                                        type="text"
                                        name={`tag-${el.id}`}
                                        onChange={(e) => tagSet(e, el.id)}
                                        value={el.value}
                                        className={classes["create-article__tag-input"]}/>
                                    <button
                                        type="button"
                                        className={classes["create-article__delete-tag"]}
                                        onClick={() => {deleteTag(el.id)}}>Delete</button>{addBtn}
                                </div>
                            )
                        })
                    }
                </div>
                <button type="submit"
                        className={classnames(classes["create-article__btn"], {[classes["create-article__btn--is-sending"]]: formIsSending})}>

                        {formIsSending ?
                            <Spin indicator={antIcon} /> :
                            `Send`}
                </button>
            </form>
        </div>
    );
}

const mapStateToProps = (state: IAppState) => ({
    currUser: state.currUserInfo
});

export default connect(mapStateToProps)(CreateArticle);