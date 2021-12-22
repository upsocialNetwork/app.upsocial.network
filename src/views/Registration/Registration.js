import React, { useEffect, useRef, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from "react-router-dom";
import Web3 from 'web3';
import Contractcustom from "../../utils/contract";
import httpClient from '../../services/http';
const Regitration = (props) => {


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
    let [walletAddress, setWalletAddress] = useState(null);
    const navigate = (event) => {
        event.preventDefault()
    }

    const loginPage = (event) => {
        event.preventDefault();
        history.push('/auth/login');
    }


    const connectMetamask = (event) => {
        event.preventDefault();
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            getAccount();
        }
        else {
            ErrorToast("MetaMask is not installed!");
            console.log('MetaMask is not installed!');
            //  setMatamask(false);
            return null;
        }
    }

    async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (account == null) {
            setWalletAddress(null);
            console.log("NO wallet");
        }
        else {
            sessionStorage.setItem("walletno", account);
            setWalletAddress(account);
            console.log("Wallet No", account);
            signingMetamask();
        }
    }


    const signingMetamask = () => {

        const web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");
        var account = web3.currentProvider.selectedAddress
        web3.eth.personal.sign("Sign this message to prove you have access to this wallet and we will sign you in.This won't cost you any Ether", account, "test password!").then(
            function (res) {
                if (account === null) {
                    ErrorToast("Please unlock metamask");
                    return null;
                }
                Loader(true);
                let formData = {
                    userName: signupUserName,
                    email: signupEmail,
                    wallet: account,
                };

                httpClient.call('signup', formData, { method: 'POST' }).then(function (response) {
                    Loader(false);
                    if (response.success == true) {
                        SuccessToast(response.result.message);
                        history.push('/auth/login');

                    }
                    else {
                        ErrorToast(response.result.message);
                    }
                }, function (error) {
                    Loader(false);
                    console.log(error);
                })

            }, function (error) {
                console.log("error signing process");
                console.log("false");
                console.log(error);
            });

    }



    return (

        <div className="lgn-registration-wrapper" style={{ backgroundImage: 'url(img/rgn-lgn-bg.png)' }}  >
            <div className="lgn-rgn-g-wrapper">
                <div className="lgn-rgn-left">
                    <a href="#" className="lgn-logo"><img className="img-fluid w-100" src="img/lgn-logo.png" alt="" /></a>
                    <div className="lgn-left-ttl-content">
                        <h3>Sign Up to be a <span className="text-uppercase color-red">Beta User</span><span
                            className="small-to-compare">and claim your 100 UPST</span></h3>
                        <p>Please follow these steps to start <br /> posting on UpSocial.</p>
                    </div>

                    <ul className="rgn-others-links">
                        <li className="d-block">
                            <a href="https://www.youtube.com/watch?v=PrWt6oQaay0" target="_blank" className="shadow-10">
                                <div className="rgn-singlelinks-g">
                                    <div className="rgn-single-icon">
                                        <img className="img-fluid" src="img/import-token.png" alt="" />
                                    </div>
                                    <p>Import Token?</p>
                                </div>
                            </a>
                        </li>

                        <li className="d-block">
                            <a href="https://www.youtube.com/watch?v=PrWt6oQaay0" target="_blank" className="shadow-10">
                                <div className="rgn-singlelinks-g">
                                    <div className="rgn-single-icon">
                                        <img className="img-fluid" src="img/install-metamask.png" alt="" />
                                    </div>
                                    <p>Install <br /> MeatMask Wallet?</p>

                                    <span className="ply-btn"><i className="far fa-play-circle"></i></span>
                                </div>
                            </a>
                        </li>
                        <li className="d-block">
                            <a href="https://www.youtube.com/watch?v=eK0FszE-vyc" target="_blank" className="shadow-10">
                                <div className="rgn-singlelinks-g">
                                    <div className="rgn-single-icon">
                                        <img className="img-fluid" src="img/meta-to-binance.png" alt="" />
                                    </div>
                                    <p>Connect MetaMask <br /> To Binance TestNet?</p>
                                    <span className="ply-btn"><i className="far fa-play-circle"></i></span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="lgn-rgn-right">
                    <form action="#" className="rgn-form">
                        <h1>Welcome!</h1>
                        <div className="input-inside">
                            <input className="form-control design-10 shadow-10" type="text" placeholder="Username"

                                onChange={(event) => { setSignupUserName(event.target.value) }}
                                onBlur={() => validator.current.showMessageFor('userName')} />
                            {validator.current.message('userName', signupUserName, 'required')}
                        </div>

                        <div className="input-inside">
                            <input className="form-control design-10 shadow-10" type="text" placeholder="Email"
                                onChange={(event) => { setSignupEmail(event.target.value) }}
                                onBlur={() => validator.current.showMessageFor('email')} />
                            {validator.current.message('email', signupEmail, 'required|email')}
                        </div>

                        <button type="submit" className="btn design-10" disabled={!(signupEmail && signupUserName)} onClick={(event) => { connectMetamask(event) }}>Register Now</button>
                        <p className="alternative">Already have an Account? <a href="#" onClick={(event) => { loginPage(event) }}  >Login Now</a></p>
                    </form>
                </div>
            </div>

        </div>

    )
}

export default Regitration;