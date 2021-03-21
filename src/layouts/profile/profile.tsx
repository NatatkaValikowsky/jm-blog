import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ApiService from '../../services/api-service';
import {
    updateCurrentUser as updateCurrentUserAction
} from '../../store/actions';

import classes from "./profile.module.scss";
import { IAppState } from '../../store/reducers/types';
import classnames from "classnames";

interface IFormInput {
    username: string,
    email: string,
    password?: string,
    image?: string
}

interface ProfileProps{
    currUser: {
        username: string,
        email: string,
        bio: string | null,
        image: string | null
    },
    updateCurrentUser: (data: any) => void
}

const Profile:React.FC<ProfileProps> = ({currUser, updateCurrentUser}) => {
    const { register, errors, handleSubmit } = useForm<IFormInput>();
    const [cookies,] = useCookies(['Token']);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [formIsSending, setFormIsSending] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const onChangeUsername = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setUsername(value);
    };

    const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setEmail(value);
    }

    const onSubmit = async (formData: IFormInput) => {

        if(formIsSending) return;

        const dataToSend:IFormInput = {
            username: formData.username,
            email: formData.email
        };

        if(formData.password !== ''){
            dataToSend.password = formData.password;
        }

        if(formData.image !== ''){
            dataToSend.image = formData.image;
        }

        setFormIsSending(true);

        ApiService.updateUserData(dataToSend, cookies.Token)
            .then(data => {
                updateCurrentUser(data);
            })
            .catch(error => {
                alert('Error');
            })
            .finally(() => {
                setFormIsSending(false);
            });
    }

    return (
        <div className={classes["profile__body"]}>
            <h1 className={classes["profile__title"]}>Edit Profile</h1>
            <form className={classes["profile__form"]} onSubmit={handleSubmit(onSubmit)}>

                <div className={classes["profile__form-group"]}>
                    <label className={classes["profile__label"]} htmlFor="username">Username</label>
                    <input
                        name="username"
                        id="username"
                        className={classes["profile__input"]}
                        type="text"
                        placeholder="Username"
                        ref={register(
                            { required: {
                                    value: true,
                                    message: "Username can't be empty"
                                },
                                maxLength : {
                                    value: 20,
                                    message: 'Your username needs to be maximum 20 characters.'
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Your username needs to be at least 3 characters.'
                                }
                            })}
                    value={
                        username !== '' ?
                            username :
                            currUser ? currUser.username : ''
                    }
                    onChange={onChangeUsername}/>
                    <span className={classes["profile__error"]}>{errors.username?.message}</span>
                </div>

                <div className={classes["profile__form-group"]}>
                    <label className={classes["profile__label"]} htmlFor="email">Email address</label>
                    <input
                        name="email"
                        id="email"
                        className={classes["profile__input"]}
                        type="email"
                        placeholder="Email address"
                        ref={register(
                            {
                                required: {
                                    value: true,
                                    message: "Email can't be empty"
                                },
                                pattern: {
                                    value: /.+@.+\..+/i,
                                    message: "Invalid Email address"
                                }
                            }
                        )}
                        value={
                            email !== '' ?
                                email :
                                currUser ? currUser.email : ''
                        }
                        onChange={onChangeEmail}/>
                    <span className={classes["profile__error"]}>{errors.email?.message}</span>
                </div>

                <div className={classes["profile__form-group"]}>
                    <label className={classes["profile__label"]} htmlFor="password">New password</label>
                    <input
                        name="password"
                        id="password"
                        className={classes["profile__input"]}
                        type="password"
                        placeholder="New password"
                        ref={register(
                            {
                                validate: {
                                    matches: value => {
                                        if(value === '') return true;
                                        return (value.length > 5 && value.length < 41);
                                    },
                                }
                            }
                        )}/>
                    <span className={classes["profile__error"]}>{errors.password && `Password must have from 6 to 40 symbols`}</span>
                </div>

                <div className={classes["profile__form-group"]}>
                    <label className={classes["profile__label"]} htmlFor="image">Avatar image (url)</label>
                    <input
                        name="image"
                        id="image"
                        className={classes["profile__input"]}
                        type="text"
                        placeholder="Avatar image"
                        ref={register(
                            {
                                validate: {
                                    matches: value => {
                                        if(value === '') return true;
                                        const objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
                                        return objRE.test(value);
                                    },
                                }
                            }
                        )}/>
                    <span className={classes["profile__error"]}>{errors.image && `Invalid url`}</span>
                </div>

                <button type="submit"
                        className={classnames(classes["profile__btn"], {[classes["profile__btn--is-sending"]]: formIsSending})}>
                        {formIsSending ?
                            <Spin indicator={antIcon} /> :
                            `Save`}
                </button>
            </form>
        </div>
    );
}

const mapStateToProps = (state: IAppState) => ({
    currUser: state.currUserInfo
});

const mapDispatchToProps = {
    updateCurrentUser: updateCurrentUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);