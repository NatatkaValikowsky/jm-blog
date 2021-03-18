import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import ApiService from '../../services/api-service';
import { useCookies } from 'react-cookie';
import {
    fetchCurrentUser as fetchCurrentUserAction,
} from "../../store/actions";
import { Redirect } from 'react-router';
import { Alert } from 'antd';
import { connect } from 'react-redux';

import classes from "./sign-in.module.scss";

interface IFormInput {
    email: string,
    password: string,
}

interface SignInProps{
    fetchCurrentUser: (token: string) => void,
}

const SignIn:React.FC<SignInProps> = ({fetchCurrentUser}) => {
    const { register, errors, handleSubmit } = useForm<IFormInput>();
    const [hasErrors,] = useState(false);
    const [, setCookie] = useCookies(['Token']);
    const [isRedirect, setRedirect] = useState(false);
    const [hasError, setHasError] = useState(false);

    const onSubmit = async (formData: IFormInput) => {
        setHasError(false);
        ApiService.loginUser(formData)
            .then(data => {
                if(data.user){
                    const userInfo = data.user;
                    setCookie('Token', userInfo.token);
                    fetchCurrentUser(userInfo.token);
                    setRedirect(true);
                    return;
                }
            })
            .catch(error => {
                setHasError(true);
            });
    }

    if(isRedirect) return <Redirect to='/'/>

    const error = hasError ?
        <div className={classes["error-block"]}>
            <Alert
                message="Ошибка подключения к API"
                description="Попробуйте позднее"
                type="error"
                closable
            />
        </div> : null;

    return (
        <>
            { error }
            <div className={classes["sign-in__body"]}>
                <h1 className={classes["sign-in__title"]}>Sign In</h1>
                <form className={classes["sign-in__form"]} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes["sign-in__form-group"]}>
                        <label className={classes["sign-in__label"]} htmlFor="email">Email address</label>
                        <input
                            name="email"
                            id="email"
                            className={classes["sign-in__input"]}
                            type="email"
                            placeholder="Email address"
                            ref={register(
                                {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    pattern: {
                                        value: /.+@.+\..+/i,
                                        message: "Invalid Email address"
                                    }
                                }
                            )}/>
                        <span className={classes["sing-in__error"]}>{errors.email?.message}</span>
                    </div>

                    <div className={classes["sign-in__form-group"]}>
                        <label className={classes["sign-in__label"]} htmlFor="password">Password</label>
                        <input
                            name="password"
                            id="password"
                            className={classes["sign-in__input"]}
                            type="password"
                            placeholder="Password"
                            ref={register(
                                {
                                    required: {
                                        value: true,
                                        message: "Password can't be empty"
                                    }
                                }
                            )}/>
                        <span className={classes["sing-in__error"]}>{errors.password?.message}</span>
                    </div>

                    <span className={classes["sing-in__error"]}>{hasErrors ? `Incorrect email or password.` : null}</span>

                    <button type="submit" className={classes["sign-in__btn"]}>Login</button>
                    <span className={classes["sign-in__sign-in-text"]}>Don’t have an account? <Link to={`/sign-up`} className={classes["sign-in__sign-up-link"]}>Sign Up.</Link></span>
                </form>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    fetchCurrentUser: fetchCurrentUserAction,
}

export default connect(null, mapDispatchToProps)(SignIn);