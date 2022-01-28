import React, { useEffect, useRef, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from "react-router-dom";
import Web3 from 'web3';
import Contractcustom from "../../utils/contract";
import detectEthereumProvider from '@metamask/detect-provider'
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import httpClient from '../../services/http';
import { useDispatch } from 'react-redux';
import { AddWalletObject } from '../Registration/action';

const Login = (props) => {

    const dispatch = useDispatch();
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

    //connectivity with solana code


    const navigate = (event) => {
        event.preventDefault()
    }

    const home = (event) => {
        event.preventDefault();
        history.push('/');
    }

    const registrationpage = (event) => {
        event.preventDefault();
        history.push('/auth/signup');
    }

    const wallet = useWallet();
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    // let fullWallet = null;


    useEffect(() => {
        console.log(wallet)
        if (wallet?.publicKey) {
            // console.log(wallet.publicKey.toString());
            dispatch(AddWalletObject(wallet));

            let user = {
                walletAddress: wallet.publicKey.toString()

            }
            // setFullWallet(wallet);
            //console.log("fullwallet:");
            //console.log(wallet);
            doSignin(user.walletAddress);


        }
    }, [wallet.publicKey])


    const doSignin = (walletAddress) => {

        Loader(true);
        console.log("wallet login block calling");
        if (walletAddress === null) {
            getLoginAccount();
            ErrorToast("Please connect to wallet");
            Loader(false);
            return null;
        }

        let formData = {
            "wallet": walletAddress
        }
        Loader(false);
        httpClient.call("signin", formData, { method: 'POST' }).then(function (response) {

            if (response.success) {
                let authData = response;
                Session.setSessionData(authData.result.data);
                SuccessToast(response && response.result && response.result.message ? response.result.message : "");
                SetSassion(authData.result.data);
                setIsLoginSubmit(false);
                history.push('/')
            }
            else {

                ErrorToast(response && response.result && response.result.message ? response.result.message : "");

            }
        }, function (error) {
            ErrorToast(error.result.message);
            console.log('MetaMask is not installed!');
            return null;
        });
    }



    /* useEffect(() => {
        Loader(props.requestProcess);
        if (isLoginSubmit && props.loginData && props.loginData.statuscode === 200 && props.loginData.success) {
            let authData = props.loginData;
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
    }, [props.loginData, props.signupData]) */




    useEffect(() => {
        Loader(props.requestProcess);
        if (isLoginSubmit && props.loginData && props.loginData.statuscode === 200 && props.loginData.success) {
            let authData = props.loginData;
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
        if (typeof window.ethereum !== 'undefined') {

            console.log('MetaMask is installed!');
            const web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");
            var account = web3.currentProvider.selectedAddress
            if (account === null) {
                getLoginAccount();
                ErrorToast("Please unlock metamask");
                return null;
            }
            Loader(true);
            setIsLoginSubmit(true);
            // props._doLogin({ wallet: account });
            //
            let formData = {
                "wallet": account
            }
            httpClient.call("signin", formData, { method: 'POST' }).then(function (response) {

                if (response.success) {
                    let authData = response;
                    Session.setSessionData(authData.result.data);
                    SuccessToast(response && response.result && response.result.message ? response.result.message : "");
                    SetSassion(authData.result.data);
                    setIsLoginSubmit(false);
                    history.push('/')
                }
                else {

                    ErrorToast(response && response.result && response.result.message ? response.result.message : "");
                    // return null;
                }
            }, function (error) {
                ErrorToast(error.result.message);
                console.log('MetaMask is not installed!');
                return null;
            });
        }
        else {
            ErrorToast("MetaMask is not installed!");
            console.log('MetaMask is not installed!');
            return null;
        }
    }


    /* const doLogin = (walletAddress) => {
        Loader(true);
        console.log("wallet login block calling");
        if (wallet === null) {
            getLoginAccount();
            ErrorToast("Please connect to wallet");
            Loader(false);
            return null;
        }

        let formData = {
            "wallet": walletAddress
        }
        Loader(false);
        httpClient.call("signin", formData, { method: 'POST' }).then(function (response) {

            if (response.success) {
                let authData = response;
                Session.setSessionData(authData.result.data);
                SuccessToast(response && response.result && response.result.message ? response.result.message : "");
                SetSassion(authData.result.data);
                setIsLoginSubmit(false);
                history.push('/')
            }
            else {

                ErrorToast(response && response.result && response.result.message ? response.result.message : "");
                return null;
            }
        }, function (error) {
            ErrorToast(error.result.message);
            console.log('MetaMask is not installed!');
            return null;
        });
    } */










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

        /*  <div className="lgn-registration-wrapper"  >
             <div className="lgn-rgn-g-wrapper">
                 <div className="lgn-rgn-left">
                     <a href="#" className="lgn-logo"><img className="img-fluid w-100" src="img/lgn-logo.png" alt="" /></a>
                     <h1 style={{ color: "black" }}><b >Welcome Back !</b></h1><br /><br />
                     <div className="twin-btn d-flex align-items-center justify-content-between">
                         <a href="/" onClick={(event) => { doLogin(event) }} className="btn style-2 forgot-password">Connect To Metamask  &nbsp;&nbsp;&nbsp;&nbsp;<img src="img/meta.png" style={{ height: "30px", width: "30px" }} /></a>
                     </div>
                     <br /><br />
                     <div className="ask-user"><b style={{ color: "black" }}>Don't have an Account? </b>
                         <a href="/" className="theme-color" onClick={(event) => { registrationpage(event) }} >Register Now</a>
                         <br />
                         <b style={{ color: "black" }}>Visit Upsocial ? </b>&nbsp;
                         <a href="/" className="theme-color" onClick={(event) => { home(event) }} >Home</a>
                     </div>
                 </div>
                 <div className="lgn-rgn-right">
     
                     <div className="twin-btn d-flex align-items-center">
                         <img style={{ height: "450px", width: "450px" }} src="img/connect_metamask.png" />
                     </div>
                 </div>
             </div>
     
         </div> */


        <div className="login-wrapper text-center">
            <div className="access-top-part">

                <div className="login-part" id="login-content">
                    <br /><br /> <br /><br />
                    <div className="login-g-wrapper">
                        <div className="login-left">
                            <h3><img style={{ height: "35px", width: "auto" }} src="img/Upsocial_logo.png" /></h3><br /><br />
                            <h1 style={{ color: "black" }}><b >Welcome Back !</b></h1><br /><br />
                            <div className='d-flex justify-content-center'>
                                {/*   <a href="#" onClick={(event) => { doLogin(event) }} className="btn style-2 forgot-password">Connect To Metamask  &nbsp;&nbsp;&nbsp;&nbsp;<img src="img/meta.png" style={{ height: "30px", width: "30px" }} /></a>
                                */}
                                <div>
                                    <WalletMultiButton logo="https://scontent.fbom19-1.fna.fbcdn.net/v/t39.30808-6/240833546_146369280983379_5424852521300066332_n.png?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=wJLQUV80qbIAX8iQNmk&_nc_ht=scontent.fbom19-1.fna&oh=00_AT_lJ4wNCAoG-rz4FjBDMknXzTbsJDaaRN2QNNGQozLWLA&oe=61E67C72" className="btn design-10" /></div>
                            </div>
                            <br /><br />
                            <div className="ask-user"><b style={{ color: "black" }}>Don't have an Account? </b>
                                <a href="/" className="theme-color" onClick={(event) => { registrationpage(event) }} /* onClick={(event) => { event.preventDefault(); setIsLogin(false) }} */>Register Now</a>
                                <br />
                                <b style={{ color: "black" }}>Visit Upsocial ? </b>&nbsp;
                                <a href="/" className="theme-color" onClick={(event) => { home(event) }} >Home</a>
                            </div>
                        </div>
                        <div className="login-right">
                            {/*  <img style={{ height: "500px", width: "300px" }} src="img/connect_metamask.png" /> */}

                            <div className="twin-btn d-flex align-items-center">
                                <img style={{ height: "450px", width: "450px" }} src="img/connect_metamask.png" />
                            </div>

                        </div>
                        {/* <div className="login-left flex">

                    </div> */}
                        {/* <div className="login-right">
                    </div> */}
                    </div>
                </div>
            </div>
            {/* <div className="access-bottom-part">
            <div className="policy-link">By signing up, you agree to our <a href="https://upsocial.network/terms-of-service/" className="link theme-color" target="_blank">Terms</a> and
                that you have read our <a href="https://upsocial.network/privacy-policy/" className="link theme-color" target="_blank">Privacy Policy</a> and <a href="https://upsocial.network/privacy-policy/"
                    target="_blank" className="link theme-color">Content Policy</a>.</div>
        </div> */}
        </div>














    );
}

export default Login;
