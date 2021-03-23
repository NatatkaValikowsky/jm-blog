import React, {ChangeEvent, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {connect} from 'react-redux';
import classes from './edit-article.module.scss';
import {useParams} from 'react-router-dom';
import ApiService from "../../services/api-service";
import {IAppState} from "../../store/types";
import {Redirect} from 'react-router';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import classnames from "classnames";

interface EditArticleProps{
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
    body: string
}

const EditArticle:React.FC<EditArticleProps> = ({currUser}) => {
    const { register, errors, handleSubmit} = useForm<IFormInput>();
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
    const [titleState, setTitleState] = useState('');
    const [descrState, setDescrState] = useState('');
    const [bodyState, setBodyState] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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

    const [content, setContent] = useState<ArticleInterface>({
        title: "",
        slug: "",
        author: {
            username: "",
            image: ""
        },
        description: "",
        favoritesCount: 0,
        createdAt: "",
        tagList: [],
        body: ""
    });

    interface ParamTypes {
        slug: string
    }

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

    useEffect(function (){
        getArticle(slug);
    }, [slug]);

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

    const {
        title,
        description,
        body,
    } = content;

    return isLoading ?
        <div className={classes["loading-block"]}>
            <Spin indicator={antIcon}/>
        </div> :
        <div className={classes["edit-article__body"]}>
            <h1 className={classes["edit-article__title"]}>Edit article</h1>
            <form className={classes["edit-article__form"]} onSubmit={handleSubmit(onSubmit)}>

                <div className={classes["edit-article__form-group"]}>
                    <label className={classes["edit-article__label"]} htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        className={classes["edit-article__input"]}
                        type="text"
                        placeholder="Title"
                        ref={register(
                            {
                                required: {
                                    value: true,
                                    message: "Title is required"
                                }
                            })}
                        value={titleState !== '' ? titleState : title}
                        onChange={onChangeTitle}/>
                    <span className={classes["edit-article__error"]}>{errors.title?.message}</span>
                </div>

                <div className={classes["edit-article__form-group"]}>
                    <label className={classes["edit-article__label"]} htmlFor="description">Short description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className={classes["edit-article__input"]}
                        placeholder="Description"
                        ref={register(
                            {
                                required: {
                                    value: true,
                                    message: "Description is required"
                                }
                            })}
                        value={descrState !== '' ? descrState : description}
                        onChange={onChangeDescription}/>
                    <span className={classes["edit-article__error"]}>{errors.description?.message}</span>
                </div>

                <div className={classes["edit-article__form-group"]}>
                    <label className={classes["edit-article__label"]} htmlFor="body">Text</label>
                    <textarea
                        name="body"
                        id="body"
                        cols={30}
                        rows={10}
                        placeholder="Text"
                        className={classes["edit-article__textarea"]}
                        ref={register(
                            {
                                required: {
                                    value: true,
                                    message: "Text is required"
                                }
                            })}
                        value={bodyState !== '' ? bodyState : body}
                        onChange={onChangeBodyText}/>
                    <span className={classes["edit-article__error"]}>{errors.body?.message}</span>
                </div>

                <div className={classes["edit-article__form-group"]}>
                    <label className={classes["edit-article__label"]} htmlFor="text">Tags</label>
                    {
                        tags.map((el, index) => {
                            const addBtn = index === tags.length - 1 ?
                                <button
                                    type="button"
                                    className={classes["edit-article__add-tag"]}
                                    onClick={addTag}>Add tag</button> :
                                null;

                            return (
                                <div key={el.id} className={classes["edit-article__tag-group"]}>
                                    <input
                                        type="text"
                                        name={`tag-${el.id}`}
                                        onChange={(e) => tagSet(e, el.id)}
                                        value={el.value}
                                        className={classes["edit-article__tag-input"]}/>
                                    <button
                                        type="button"
                                        className={classes["edit-article__delete-tag"]}
                                        onClick={() => {
                                            deleteTag(el.id)
                                        }}>Delete
                                    </button>
                                    {addBtn}
                                </div>
                            )
                        })
                    }
                </div>

                <button type="submit"
                        className={classnames(classes["edit-article__btn"], {[classes["edit-article__btn--is-sending"]]: formIsSending})}>
                    {formIsSending ?
                        <Spin indicator={antIcon}/> :
                        `Send`}
                </button>
            </form>
        </div>;
}

const mapStateToProps = (state: IAppState) => ({
    currUser: state.currUserInfo
});

export default connect(mapStateToProps)(EditArticle);