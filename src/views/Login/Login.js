import React, { useEffect, useRef, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from "react-router-dom";


const Login = (props) => {

    const history = useHistory();
    const validatorLogin = useRef(new SimpleReactValidator());
    const validator = useRef(new SimpleReactValidator());

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [isLoginSubmit, setIsLoginSubmit] = useState(false)
    let [signupFirstName, setSignupFirstName] = useState('')
    let [signupLastName, setSignupLastName] = useState('')
    let [signupUserName, setSignupUserName] = useState('')
    let [signupEmail, setSignupEmail] = useState('')
    let [signupPassword, setSignupPassword] = useState('')
    let [isSignupSubmit, setIsSignupSubmit] = useState(false)
    let [isLogin, setIsLogin] = useState(true)

    const navigate = (event) => {
        event.preventDefault()
    }

    useEffect(() => {
        Loader(props.requestProcess);
        if (isLoginSubmit && props.loginData && props.loginData.statuscode === 200 && props.loginData.success) {
            let authData = props.loginData;
            console.log(authData);
            Session.setSessionData(authData.result.data);
            SuccessToast(props.loginData && props.loginData.result && props.loginData.result.message ? props.loginData.result.message : "");
            SetSassion(authData.result.data);
            setIsLoginSubmit(false);
            history.push('/')
        } else if (isLoginSubmit && props.loginData) {
            setIsLoginSubmit(false);
            ErrorToast(props.loginData && props.loginData.result && props.loginData.result.message ? props.loginData.result.message : "");
        }

        if (isSignupSubmit && props.signupData && props.signupData.statuscode === 200 && props.signupData.success) {
            SuccessToast(props.signupData && props.signupData.result && props.signupData.result.message ? props.signupData.result.message : "");
            setIsSignupSubmit(false);
            setIsLogin(true);
        } else if (isSignupSubmit && props.signupData) {
            setIsSignupSubmit(false);
            ErrorToast(props.signupData && props.signupData.result && props.signupData.result.message ? props.signupData.result.message : "");
        }
    }, [props.loginData, props.signupData])

    useEffect(() => {
        let isLoggedIn = Session.isLoggedIn();
        if (isLoggedIn) {
            history.push('/')
        }
    })


    const doLogin = (event) => {
        event.preventDefault();
        if (validatorLogin.current.allValid()) {
            setIsLoginSubmit(true);
            props._doLogin({ email, password });
        }
    }

    const userSignup = (event) => {
        event.preventDefault();
        if (validator.current.allValid()) {
            setIsSignupSubmit(true);
            props._doSignup({
                userName: signupUserName,
                firstName: signupFirstName,
                lastName: signupLastName,
                email: signupEmail,
                password: signupPassword
            });
        }
    }

    const forgetPassword = (event) => {
        event.preventDefault();
        history.push('/auth/forget-password');
    }

    const home = (event) => {
        event.preventDefault();
        history.push('/');
    }

    return (
        <div className="login-wrapper">
            <div className="access-top-part">
                {!isLogin ?
                    <div className="registration-part" id="register-content">
                        <div className="registration-title text-center">
                            <h6>Register</h6>
                            <button className="close-registraion-screen" onClick={() => { setIsLogin(true) }}>
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
                                    <input type="text" name="firstName" className="form-control"
                                        onChange={(event) => { setSignupFirstName(event.target.value) }}
                                        onBlur={() => validator.current.showMessageFor('firstName')} />
                                    {validator.current.message('firstName', signupFirstName, 'required')}
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" name="lastName" className="form-control"
                                        onChange={(event) => { setSignupLastName(event.target.value) }}
                                        onBlur={() => validator.current.showMessageFor('lastName')} />
                                    {validator.current.message('lastName', signupLastName, 'required')}
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="">Username</label>
                                    <input type="text" name="userName" className="form-control"
                                        onChange={(event) => { setSignupUserName(event.target.value) }}
                                        onBlur={() => validator.current.showMessageFor('userName')} />
                                    {validator.current.message('userName', signupUserName, 'required')}
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="">Email</label>
                                    <input type="email" name="email" className="form-control"
                                        onChange={(event) => { setSignupEmail(event.target.value) }}
                                        onBlur={() => validator.current.showMessageFor('email')} />
                                    {validator.current.message('email', signupEmail, 'required|email')}
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="">Password</label>
                                    <input type="password" name="password" className="form-control"
                                        onChange={(event) => { setSignupPassword(event.target.value) }}
                                        onBlur={() => validator.current.showMessageFor('password')} />
                                    {validator.current.message('password', signupPassword, 'required')}
                                </div>
                            </div>
                            <div className="login-left flex">
                                <div className="ask-user">Already have an Account ? <a href="/" className="theme-color" onClick={(event) => { event.preventDefault(); setIsLogin(true) }}>Login
                                    Now</a>
                                </div>
                            </div>
                            <div className="login-right">
                                <div className="text-center">
                                    <button type="submit" onClick={(event) => { userSignup(event) }} className="btn gradient-bg-one radius-30 register">Register Now</button>

                                </div>
                            </div>
                        </form>
                    </div>
                    :
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
                                        onChange={(event) => { setEmail(event.target.value) }}
                                        onBlur={() => validatorLogin.current.showMessageFor('email')} />
                                    {validatorLogin.current.message('email', email, 'required|email')}
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="">Password</label>
                                    <input type="password" name="password" className="form-control"
                                        onChange={(event) => { setPassword(event.target.value) }}
                                        onBlur={() => validatorLogin.current.showMessageFor('password')} />
                                    {validatorLogin.current.message('password', password, 'required')}
                                </div>
                            </div>
                            <div className="login-left flex">
                                <div className="ask-user">Dont have an Account ? <a href="/" className="theme-color" onClick={(event) => { event.preventDefault(); setIsLogin(false) }}>Register Now</a>
                                    <br/><br/>
                                   Visit Upsocial ? 
                                    <a href="/" className="theme-color" onClick={(event) => {home(event) }}>Home</a>

                                </div>



                            </div>

                            <div className="login-right">
                                <div className="twin-btn d-flex align-items-center justify-content-between">
                                    <a href="/" onClick={(event) => forgetPassword(event)}
                                        className="btn bg-transparent border border-primary radius-30 forgot-password">Forget
                                        Password</a>
                                    <button type="submit" className="btn gradient-bg-one radius-30 login" onClick={(event) => { doLogin(event) }}>Login Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
            </div>
            <div className="access-bottom-part">
                <div className="policy-link">By signing up, you agree to our <a href="/" onClick={(event) => navigate(event)} className="link theme-color">Terms</a> and
                    that you have read our <a href="/" onClick={(event) => navigate(event)} className="link theme-color">Privacy Policy</a> and <a href="/" onClick={(event) => navigate(event)}
                        className="link theme-color">Content Policy</a>.</div>
            </div>
        </div>
    );
}

export default Login;
