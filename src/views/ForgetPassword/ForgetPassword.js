import React, { useEffect, useRef, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from "react-router-dom";
import httpClient from '../../services/http';



const ForgetPassword = (props) => {

    let [email, setEmail] = useState();


    const doForgetPassword = (event) => {
        Loader(true);

        event.preventDefault();
        let formData = {
            email: email
        }
        httpClient.call("forget-password", formData, { method: 'POST' }).then(function (response) {
            SuccessToast(response.result.message);
        }, function (error) {
            ErrorToast(error.result.message);
        })
    }




    return (
        <div className="login-wrapper">
            <div className="access-top-part">

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
                                <input type="email" name="email" className="form-control"

                                    onChange={(event) => { setEmail(event.target.value) }}
                                />

                            </div>
                            <button type="submit" className="btn gradient-bg-one radius-30 login"
                                onClick={(event) => { doForgetPassword(event) }}

                                disabled={!email}
                            >Forget Password</button>

                            {/* <div className="input-wrapper">
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" className="form-control"
                                />

                            </div> */}
                        </div>
                        <div className="login-left flex">
                            <div className="ask-user">Already Account ? <a href="/" className="theme-color" >Login & Registration </a>
                            </div>
                        </div>
                        {/* <div className="login-right">
                            <div className="twin-btn d-flex align-items-center justify-content-between">
                                <a href="/"
                                    className="btn bg-transparent border border-primary radius-30 forgot-password">Forget
                                    Password</a>

                            </div>
                        </div> */}
                    </form>
                </div>

            </div>
            <div className="access-bottom-part">
                <div className="policy-link">By signing up, you agree to our <a href="/" className="link theme-color">Terms</a> and
                    that you have read our <a href="/" className="link theme-color">Privacy Policy</a> and <a href="/"
                        className="link theme-color">Content Policy</a>.</div>
            </div>
        </div>
    );
}

export default ForgetPassword;
