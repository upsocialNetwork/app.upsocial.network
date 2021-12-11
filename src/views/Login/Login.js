import React, { useEffect, useRef, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from "react-router-dom";
import Web3 from 'web3';
import Contractcustom from "../../utils/contract";
import detectEthereumProvider from '@metamask/detect-provider'

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
    let [walletAddress, setWalletAddress] = useState(null);
    const navigate = (event) => {
        event.preventDefault()
    }

    useEffect(() => {
        Loader(props.requestProcess);
        if (isLoginSubmit && props.loginData && props.loginData.statuscode === 200 && props.loginData.success) {

            let authData = props.loginData;
            //  console.log(authData);
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
            //transeferRegistrationToken();
            // let authData = props.signupData;
            //  console.log(authData);
            /* Session.setSessionData(authData.result.data);
            SuccessToast(props.signupData && props.signupData.result && props.signupData.result.message ? props.signupData.result.message : "");
            SetSassion(authData.result.data);
            setIsLoginSubmit(false);
            history.push('/') */
        } else if (isSignupSubmit && props.signupData) {

            setIsSignupSubmit(false);
            ErrorToast(props.signupData && props.signupData.result && props.signupData.result.message ? props.signupData.result.message : "");
            // transeferRegistrationToken();
        }
    }, [props.loginData, props.signupData])

    useEffect(() => {
        let isLoggedIn = Session.isLoggedIn();
        if (isLoggedIn) {
            history.push('/')
        }
    })


    const transeferRegistrationToken = () => {
        console.log("calling for false token");
        // code 1
        var Contract = require('web3-eth-contract');
        Contract.setProvider(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");

        window.ethereum.enable();
        var contract = new Contract(Contractcustom.contract_abi, Contractcustom.contract_address);
        contract.methods.transfer("0x1d987C54473298677b1Dde9611DE8025B8C4c5E0", "100000000000000000000").send({ from: "0x33fbfEA30c6d70b468daa48220DcF920404DC4eA" })
            .then(function (receipt) {
                console.log(receipt);
                return null;
                let transaction = {
                    "_blockNumber": receipt.blockNumber,
                    "_cumulativeGasUsed": receipt.cumulativeGasUsed,
                    "_from": receipt.from,
                    "_gasUsed": receipt.gasUsed,
                    "_status": receipt.status,
                    "_to": receipt.to,
                    "_transactionHash": receipt.transactionHash,
                    "_transactionIndex": receipt.transactionIndex,
                    "_blockHash": receipt.blockHash,
                    "_contractAddress": Contract.contract_address
                }
            }, function (error) {
                Loader(false);
                ErrorToast(error.message);
                console.log(error);
            });

    }

    const doLogin = (event) => {

        event.preventDefault();
        if (typeof window.ethereum !== 'undefined') {

            console.log('MetaMask is installed!');
            const web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");
            var account = web3.currentProvider.selectedAddress
            if (account === null) {
                getLoginAccount();
                // ErrorToast("Please unlock metamask");
                return null;
            }
            Loader(true);
            setIsLoginSubmit(true);
            props._doLogin({ wallet: account });
        }
        else {
            ErrorToast("MetaMask is not installed!");
            console.log('MetaMask is not installed!');
            return null;
        }
    }

    const userSignup = () => {
        // event.preventDefault();

        //Loader(true);
        //setIsSignupSubmit(true);
        //console.log(signupUserName);
        //console.log(signupEmail);
        //console.log(walletAddress);
        //console.log(signupPassword);

        /*  return null;
         props._doSignup({
             userName: signupUserName,
             email: signupEmail,
             wallet: walletAddress,
             password: signupPassword
         }); */

    }


    const signingMetamask = () => {

        const web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");
        var account = web3.currentProvider.selectedAddress
        web3.eth.personal.sign("Sign this message to prove you have access to this wallet and we will sign you in.This won't cost you any Ether", account, "test password!").then(
            function (res) {
                console.log("true");
                console.log(res);

                if (account === null) {
                    ErrorToast("Please unlock metamask");
                    return null;
                }
                Loader(true);
                setIsSignupSubmit(true);
                console.log("calling api");
                props._doSignup({
                    userName: signupUserName,
                    email: signupEmail,
                    wallet: account,
                });
            }, function (error) {
                console.log("error signing process");
                console.log("false");
                console.log(error);
            });

    }

    const forgetPassword = (event) => {
        event.preventDefault();
        history.push('/auth/import-token');
    }

    const home = (event) => {
        event.preventDefault();
        history.push('/');
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

    async function getLoginAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log(account);
        return account;
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

                                <h6>UPSOCIAL !</h6>
                                <h1>WELCOME </h1>
                                <h1 className="opacity-one-times">WELCOME </h1>
                                <h1 className="opacity-two-times">WELCOME </h1>
                                <h5>Sign up to be a
                                    BETA USER and claim your 100 UPST <br />
                                    <a href="/" className="theme-color" onClick={(event) => { forgetPassword(event) }} target="_blank">Import Token</a></h5>
                                <p>Free your mind and get paid for creating content, driving traffic and referring friends.
                                    A place to have open conversations and bring people together.</p>
                            </div>
                            <div className="login-right">
                                {/* <div className="input-wrapper">
                                    <label htmlFor=""> Name</label>
                                    <input type="text" name="firstName" className="form-control input-sm"
                                        onChange={(event) => { setSignupFirstName(event.target.value) }}
                                        onBlur={() => validator.current.showMessageFor('firstName')} />
                                    {validator.current.message('firstName', signupFirstName, 'required')}
                                </div> */}
                                {/* <div className="input-wrapper">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" name="lastName" className="form-control input-sm"
                                        onChange={(event) => { setSignupLastName(event.target.value) }}
                                        onBlur={() => validator.current.showMessageFor('lastName')} />
                                    {validator.current.message('lastName', signupLastName, 'required')}
                                </div> */}
                                <div className="input-wrapper">
                                    <label htmlFor="">Username</label>
                                    <input type="text" name="userName" className="form-control input-sm"
                                        onChange={(event) => { setSignupUserName(event.target.value) }}
                                        onBlur={() => validator.current.showMessageFor('userName')} />
                                    {validator.current.message('userName', signupUserName, 'required')}
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="">Email</label>
                                    <input type="email" name="email" className="form-control input-sm"
                                        onChange={(event) => { setSignupEmail(event.target.value) }}
                                        onBlur={() => validator.current.showMessageFor('email')} />
                                    {validator.current.message('email', signupEmail, 'required|email')}
                                </div>
                                {/*  <div className="input-wrapper">
                                    <label htmlFor="">Password</label>
                                    <input type="password" name="password" className="form-control input-sm"
                                        onChange={(event) => { setSignupPassword(event.target.value) }}
                                        onBlur={() => validator.current.showMessageFor('password')} />
                                    {validator.current.message('password', signupPassword, 'required')}
                                </div> */}

                                {/* <div className="input-wrapper">
                                    <label htmlFor="">Connect Wallet</label>
                                    {walletAddress === null ?
                                        <a href="#" onClick={(event) => { connectMetamask(event) }} >  <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'black' }} width="30px" height="30px" fill="currentColor" className="bi bi-wallet2" viewBox="0 0 16 16">
                                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                                        </svg></a>
                                        : <input type="text" className="form-control input-sm" value={walletAddress} />}
                                </div> */}
                                <div className="text-right">
                                    <button

                                        disabled={!(signupEmail && signupUserName)}

                                        type="submit" onClick={(event) => { connectMetamask(event) }} className="btn gradient-bg-one radius-30 register">Register Now</button>

                                </div>




                            </div>
                            <div className="login-left flex">
                                <div className="ask-user">Already have an Account ? <a href="/" className="theme-color" onClick={(event) => { event.preventDefault(); setIsLogin(true) }}>Login
                                    Now</a>
                                </div>
                            </div>
                            <div className="login-right">
                                <div className="text-right">
                                    {/*  <button

                                        disabled={!(walletAddress && signupEmail && signupPassword && signupUserName)}

                                        type="submit" onClick={(event) => { userSignup(event) }} className="btn gradient-bg-one radius-30 register">Register Now</button> */}

                                </div>
                            </div>
                        </form>
                    </div>
                    :
                    <div className="login-part" id="login-content">
                        <form action="#" className="login-g-wrapper">
                            <div className="login-left">
                                <h6>Hi There!</h6>
                                <h1>WELCOME BACK</h1>
                                <h1 className="opacity-one-times">WELCOME BACK</h1>
                                <h1 className="opacity-two-times">WELCOME BACK</h1>
                            </div>
                            <div className="login-right">

                                <div className="text-right"><br /><br /><br />
                                    <button

                                        /*  disabled={!(signupEmail && signupUserName)} */

                                        type="submit" onClick={(event) => { doLogin(event) }} className="btn gradient-bg-one radius-30 register">Connect To Wallet</button>

                                </div>
                                {/* <div className="input-wrapper">
                                    <label htmlFor="">Email</label>
                                    <input type="text" name="email"


                                        className="form-control"
                                        onChange={(event) => { setEmail(event.target.value) }}
                                        onBlur={() => validatorLogin.current.showMessageFor('email')} />
                                    {validatorLogin.current.message('email', email, 'required|email')}
                                </div> */}

                                {/*  <div className="input-wrapper">
                                    <label htmlFor="">Password</label>
                                    <input type="password" name="password" className="form-control"
                                        onChange={(event) => { setPassword(event.target.value) }}
                                        onBlur={() => validatorLogin.current.showMessageFor('password')} />
                                    {validatorLogin.current.message('password', password, 'required')}
                                </div> */}
                            </div>
                            <div className="login-left flex">
                                <div className="ask-user">Don't have an Account? <a href="/" className="theme-color" onClick={(event) => { event.preventDefault(); setIsLogin(false) }}>Register Now</a>
                                    <br /><br />
                                    Visit Upsocial? &nbsp;
                                    <a href="/" className="theme-color" onClick={(event) => { home(event) }}>Home</a>

                                </div>



                            </div>

                            <div className="login-right">
                                {/* <div className="twin-btn d-flex align-items-center justify-content-between">

                                    <button type="submit" disabled={!(email && password)} className="btn gradient-bg-one radius-30 login" onClick={(event) => { doLogin(event) }}>Login Now</button>
                                    <button type="submit" className="btn gradient-bg-one radius-30 login" onClick={(event) => { forgetPassword(event) }}>Forgot Password</button>

                                </div> */}
                            </div>
                        </form>
                    </div>
                }
            </div>
            {/* <div className="access-bottom-part">
                <div className="policy-link">By signing up, you agree to our <a href="#" onClick={(event) => navigate(event)} className="link theme-color">Terms</a> and
                    that you have read our <a href="#" onClick={(event) => navigate(event)} className="link theme-color">Privacy Policy</a> and <a href="#" onClick={(event) => navigate(event)}
                        className="link theme-color">Content Policy</a>.</div>
            </div> */}
        </div>



    );
}

export default Login;
