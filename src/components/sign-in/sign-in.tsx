import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import ApiService from '../../services/api-service';
import { Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import {
    fetchCurrentUser as fetchCurrentUserAction,
} from "../../store/actions";
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import classes from "./sign-in.module.scss";
import classnames from "classnames";

import {IFormInput, SignInProps} from './types';
import RouteService from '../../services/route-service';
import {emailValidation, passwordValidation} from "./validationSchemas";

const SignIn:React.FC<SignInProps> = ({fetchCurrentUser}) => {
    const { register, errors, handleSubmit } = useForm<IFormInput>();
    const [, setCookie] = useCookies(['Token']);
    const [signedUp,, removeSignedUp] = useCookies(['Signed-up']);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const [hasErrors,] = useState(false);
    const [isRedirect, setRedirect] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [formIsSending, setFormIsSending] = useState(false);
    const [serverError, setServerError] = useState<null | string>(null);

    const onSubmit = async (formData: IFormInput) => {

        if(formIsSending) return;

        setHasError(false);
        setFormIsSending(true);
        ApiService.loginUser(formData)
            .then(data => {
                if(data && data.user){
                    const userInfo = data.user;
                    setCookie('Token', userInfo.token);
                    fetchCurrentUser(data.user);
                    setRedirect(true);
                    return;
                }

                if(data && data.errors){
                    setServerError('login or password is invalid');
                }
            })
            .catch(error => {
                setHasError(true);
            })
            .finally(() => {
                setFormIsSending(false);
            });
    }

    if(isRedirect) return <Redirect to={RouteService.mainRouteLink}/>

    const error = hasError ?
        <div className={classes["error-block"]}>
            <Alert
                message="Ошибка подключения к API"
                description="Попробуйте позднее"
                type="error"
                closable
            />
        </div> : null;

    const isSignedUp = signedUp.SignedUp ?
        <div className={classes["success-block"]}>
            <Alert
                message="Вы успешно зарегистрировались"
                description="Для продолжения работы нужно авторизоваться"
                type="success"
                closable
            />
        </div> : null;

    if(signedUp.SignedUp){
        removeSignedUp('SignedUp');
    }
    return (
        <>
            { isSignedUp }
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
                            ref={register(emailValidation)}/>
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
                            ref={register(passwordValidation)}/>
                        <span className={classes["sing-in__error"]}>{errors.password?.message}</span>
                    </div>
                    <span className={classes["sing-in__error"]}>{serverError}</span>
                    <span className={classes["sing-in__error"]}>{hasErrors ? `Incorrect email or password.` : null}</span>

                    <button type="submit"
                            className={classnames(classes["sign-in__btn"], {[classes["sign-in__btn--is-sending"]]: formIsSending})}>

                            {formIsSending ?
                            <Spin indicator={antIcon} /> :
                            `Login`}

                    </button>
                    <span className={classes["sign-in__sign-in-text"]}>Don’t have an account? <Link to={RouteService.signUpLink} className={classes["sign-in__sign-up-link"]}>Sign Up.</Link></span>
                </form>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    fetchCurrentUser: fetchCurrentUserAction,
}

export default connect(null, mapDispatchToProps)(SignIn);