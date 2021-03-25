import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ApiService from '../../services/api-service';
import classnames from "classnames";
import { Redirect } from 'react-router';
import { useCookies } from 'react-cookie';
import { Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classes from './sign-up.module.scss';

import { IFormInput, IServerErrors } from './types';

const SignUp = () => {
    const { register, errors, handleSubmit, getValues } = useForm<IFormInput>();
    const [isRedirect, setRedirect] = useState(false);
    const [, setSignedUp] = useCookies(['Signed-up']);
    const [formIsSending, setFormIsSending] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [serverErrors, setServerErrors] = useState<IServerErrors>({
        email: null,
        username: null
    });

    const onSubmit = async (formData: IFormInput) => {
        if(formIsSending) return;
        setFormIsSending(true);
        const dataToSend = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        ApiService.createUser(dataToSend)
            .then(data => {
                if(data && data.user){
                    setSignedUp('SignedUp', true);
                    setRedirect(true);
                    setFormIsSending(false);
                    return;
                }

                if(data && data.errors){
                    setServerErrors(data.errors);
                }
            })
            .catch(error => {
                console.log('error', error);
            })
            .finally(() => {
                setFormIsSending(false);
            });

    }

    if(isRedirect) return <Redirect to='/sign-in'/>

    const emailErrors = serverErrors.email ?
        serverErrors.email.map(el => <Alert
            key={el}
            message={`Email ${el}`}
            type="error"
            closable
        />) : null;


    const usernameErrors = serverErrors.username ?
        serverErrors.username.map(el => <Alert
            key={el}
            message={`Username ${el}`}
            type="error"
            closable
        />) : null;

    return (
        <>
            <div className={classes["server-errors-block"]}>
                { emailErrors }
                { usernameErrors }
            </div>
            <div className={classes["sign-up__body"]}>
                <h1 className={classes["sign-up__title"]}>Create new account</h1>
                <form className={classes["sign-up__form"]} onSubmit={handleSubmit(onSubmit)}>

                    <div className={classes["sign-up__form-group"]}>
                        <label className={classes["sign-up__label"]} htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            className={classnames(classes["sign-up__input"], errors.username ? classes["sign-up__input-error"] : '')}
                            type="text"
                            placeholder="Username"
                            ref={register(
                                { required: {
                                        value: true,
                                        message: "Username is required"
                                    },
                                    maxLength : {
                                        value: 20,
                                        message: 'Your username needs to be maximum 20 characters.'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Your username needs to be at least 3 characters.'
                                    }
                                })}/>
                        <span className={classes["sing-up__error"]}>{errors.username?.message}</span>
                    </div>

                    <div className={classes["sign-up__form-group"]}>
                        <label className={classes["sign-up__label"]} htmlFor="email">Email address</label>
                        <input
                            name="email"
                            id="email"
                            className={classnames(classes["sign-up__input"], errors.email ? classes["sign-up__input-error"] : '')}
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
                        <span className={classes["sing-up__error"]}>{errors.email?.message}</span>
                    </div>

                    <div className={classes["sign-up__form-group"]}>
                        <label className={classes["sign-up__label"]} htmlFor="password">Password</label>
                        <input
                            name="password"
                            id="password"
                            className={classnames(classes["sign-up__input"], errors.password ? classes["sign-up__input-error"] : '')}
                            type="password"
                            placeholder="Password"
                            ref={register(
                                {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Your password needs to be at least 8 characters."
                                    },
                                    maxLength: {
                                        value: 40,
                                        message: "Your password needs to be maximum 40 characters."
                                    }
                                }
                            )}/>
                        <span className={classes["sing-up__error"]}>{errors.password?.message}</span>
                    </div>

                    <div className={classes["sign-up__form-group"]}>
                        <label className={classes["sign-up__label"]} htmlFor="repeat-password">Repeat Password</label>
                        <input
                            name="repeat-password"
                            id="repeat-password"
                            className={classes["sign-up__input"]}
                            type="password"
                            placeholder="Password"
                            ref={register(
                                {
                                    validate: {
                                        matches: value => getValues("password") === value,
                                    }
                                }
                            )}/>
                        <span className={classes["sing-up__error"]}>{errors["repeat-password"] && "Passwords must match."}</span>
                    </div>

                    <div className={classes["sign-up__agreement"]}>
                        <input
                            name="agreement"
                            id="agreement_checkbox"
                            type="checkbox"
                            className={classes["sign-up__checkbox"]}
                            ref={register(
                                {
                                    required: {
                                        value: true,
                                        message: "Must be checked."
                                    }
                                }
                            )}
                            onChange={()=>{}}/>
                        <label className={classes["sign-up__agreement-label"]} htmlFor="agreement_checkbox">I agree to the processing of my personal information</label>
                        <span className={classes["sing-up__error"]}>{errors.agreement?.message}</span>
                    </div>

                    <button type="submit" className={classnames(classes["sign-up__btn"], {[classes["sign-up__btn--is-sending"]]: formIsSending})}>
                        {formIsSending ?
                            <Spin indicator={antIcon} /> :
                            `Create`}
                    </button>
                    <span className={classes["sign-up__sign-in-text"]}>Already have an account? <Link to={`/sign-in`} className={classes["sign-up__sign-in-link"]}>Sign In.</Link></span>
                </form>
            </div>
        </>

    );
}

export default SignUp;