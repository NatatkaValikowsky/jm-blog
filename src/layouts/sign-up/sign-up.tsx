import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ApiService from '../../services/api-service';
import classnames from "classnames";
import { Redirect } from 'react-router';
import { useCookies } from 'react-cookie';

import classes from './sign-up.module.scss';

interface IFormInput {
    username: string,
    email: string,
    password: string,
    ["repeat-password"]: string,
    agreement: boolean,
}

const SignUp = () => {
    const { register, errors, handleSubmit, getValues } = useForm<IFormInput>();
    const [isRedirect, setRedirect] = useState(false);
    const [, setCookie] = useCookies(['Token']);

    const onSubmit = async (formData: IFormInput) => {

        const data = await ApiService.createUser(formData);
        if(data.user){
            const userInfo = data.user;
            await ApiService.loginUser({
                email: userInfo.email,
                password: formData.password
            });
            setCookie('Token', userInfo.token);
            setRedirect(true);
            return;
        }

    }

    if(isRedirect) return <Redirect to='/sign-in'/>

    return (
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
                        checked
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

                <button type="submit" className={classes["sign-up__btn"]}>Create</button>
                <span className={classes["sign-up__sign-in-text"]}>Already have an account? <Link to={`/sign-in`} className={classes["sign-up__sign-in-link"]}>Sign In.</Link></span>
            </form>
        </div>
    );
}

export default SignUp;