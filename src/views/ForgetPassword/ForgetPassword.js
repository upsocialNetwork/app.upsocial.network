import React, { useEffect, useRef, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from "react-router-dom";


const ForgetPassword = (props) => {



    return (
        <div className="login-wrapper">
            <div className="access-top-part">

                <div className="registration-part" id="register-content">
                    <div className="registration-title text-center">
                        <h6>Register</h6>
                        <button className="close-registraion-screen" >
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.0001 29.3333C23.3639 29.3333 29.3334 23.3638 29.3334 16C29.3334 8.63616 23.3639 2.66663 16.0001 2.66663C8.63628 2.66663 2.66675 8.63616 2.66675 16C2.66675 23.3638 8.63628 29.3333 16.0001 29.3333Z"
                                    stroke="#AFB9C2" strokeWidth="2.66667" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path d="M20 12L12 20" stroke="#AFB9C2" strokeWidth="2.66667" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path d="M12 12L20 20" stroke="#AFB9C2" strokeWidth="2.66667" strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>

                        </button>
                    </div>
                    <form action="#" className="login-g-wrapper">
                        <div className="login-left">
                            <h5>Sign up to get your own <br />
                                personalized Upsocial experience!</h5>

                            <p>By having a Upsocial account, you can subscribe, <br />
                                vote, and comment on all your favorite Reddit <br />
                                content. Sign up in just seconds.</p>
                        </div>
                        <div className="login-right">
                            <div className="input-wrapper">
                                <label htmlFor="">First Name</label>
                                <input type="text" name="firstName" className="form-control" />

                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="">Last Name</label>
                                <input type="text" name="lastName" className="form-control" />

                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="">Username</label>
                                <input type="text" name="userName" className="form-control"
                                />

                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="">Email</label>
                                <input type="email" name="email" className="form-control"
                                />

                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" className="form-control"
                                />

                            </div>
                        </div>
                        <div className="login-left flex">
                            <div className="ask-user">Already have an Account ? <a href="/" className="theme-color" >Login
                                Now</a>
                            </div>
                        </div>
                        <div className="login-right">
                            <div className="text-center">
                                <button type="submit" className="btn gradient-bg-one radius-30 register">Register Now</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="login-part" id="login-content">
                    <form action="#" className="login-g-wrapper">
                        <div className="login-left">
                            <h6>Hi There !</h6>
                            <h1>WELCOME BACK</h1>
                            <h1 className="opacity-one-times">WELCOME BACK</h1>
                            <h1 className="opacity-two-times">WELCOME BACK</h1>
                        </div>
                        <div className="login-right">
                            <div className="input-wrapper">
                                <label htmlFor="">Email</label>
                                <input type="text" name="email" className="form-control"
                                />

                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" className="form-control"
                                />

                            </div>
                        </div>
                        <div className="login-left flex">
                            <div className="ask-user">Dont have an Account ? <a href="/" className="theme-color" >Register Now</a>
                            </div>
                        </div>
                        <div className="login-right">
                            <div className="twin-btn d-flex align-items-center justify-content-between">
                                <a href="/"
                                    className="btn bg-transparent border border-primary radius-30 forgot-password">Forget
                                    Password</a>
                                <button type="submit" className="btn gradient-bg-one radius-30 login" >Login Now</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
            <div className="access-bottom-part">
                <div className="policy-link">By signing up, you agree to our <a href="/"  className="link theme-color">Terms</a> and
                    that you have read our <a href="/"  className="link theme-color">Privacy Policy</a> and <a href="/" 
                        className="link theme-color">Content Policy</a>.</div>
            </div>
        </div>
    );
}

export default ForgetPassword;
