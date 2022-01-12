import React, { useEffect, useRef, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from "react-router-dom";
import Web3 from 'web3';
import Contractcustom from "../../utils/contract";
import httpClient from '../../services/http';
import detectEthereumProvider from '@metamask/detect-provider'
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
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
        signingMetamask();
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




    const signingMetamask = (account) => {

        const web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");
        var account = web3.currentProvider.selectedAddress
        web3.eth.personal.sign("Sign this message to prove you have access to this wallet and we will sign you in.This won't cost you any Ether", account, "test password!").then(
            function (res) {
                if (account === null) {
                    ErrorToast("Please select wallet");
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


    const addTokenInMetamask = (event) => {
        event.preventDefault();
        const tokenAddress = '0x5818209Fb829311B438431cB1111dA7a3d9B04FB';
        const tokenSymbol = 'UPST';
        const tokenDecimals = 18;
        const tokenImage = 'http://68.183.245.212:8080/Upsocial/fav.ico';

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function addPolygonTestnetNetwork(event) {
        event.preventDefault();
        console.log("calling");
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x61' }], // Hexadecimal version of 97, prefixed with 0x
            });
        } catch (error) {
            console.log(error);
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x61', // Hexadecimal version of 61, prefixed with 0x
                            chainName: "Binance Smart Chain Testnet",
                            nativeCurrency: {
                                name: "Binance Smart Chain Testnet",
                                symbol: "BNB",
                                decimals: 18,
                            },
                            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
                            blockExplorerUrls: ["https://explorer.binance.org/smart-testnet"],
                            iconUrls: [""],

                        }],
                    });
                } catch (addError) {
                    console.log('Did not add network');
                }
            }
        }
    }


    return (

        <div className="lgn-registration-wrapper" style={{ backgroundImage: 'url(img/rgn-lgn-bg.png)' }}  >
            <div className="lgn-rgn-g-wrapper">
                <div className="lgn-rgn-left">
                    <a href="#" className="lgn-logo"><img className="img-fluid w-100" src="img/lgn-logo.png" alt="" /></a>
                    <div className="lgn-left-ttl-content">
                        <h3>Sign Up to be a <span className="text-uppercase color-red">Beta User</span><span
                            className="small-to-compare">and claim your 100 UPST</span></h3>
                        <b><p><span className="color-red">Add your username and email id  </span> and then  follow below  <br /> steps to create your UpSocial Network Account </p></b>
                    </div>

                    <ul className="rgn-others-links">


                        <li className="d-block">
                            <a href="https://www.youtube.com/watch?v=PrWt6oQaay0" target="_blank" className="shadow-10">
                                <div className="rgn-singlelinks-g">
                                    <div className="rgn-single-icon">
                                        <img className="img-fluid" src="img/install-metamask.png" alt="" />
                                    </div>
                                    <p>Watch Video To  <br /> Create Your Account Wallet?</p>

                                    <span className="ply-btn"><i className="far fa-play-circle"></i></span>
                                </div>
                            </a>
                        </li>
                        <li className="d-block">
                            <a href="#" /* target="_blank" */ onClick={(event) => { addPolygonTestnetNetwork(event) }} className="shadow-10">
                                <div className="rgn-singlelinks-g">
                                    <div className="rgn-single-icon">
                                        <img className="img-fluid" src="img/meta-to-binance.png" alt="" />
                                    </div>
                                    <p>Connect MetaMask <br /> To Binance TestNet?</p>
                                   {/*  <span className="ply-btn"><i className="far fa-play-circle"></i></span> */}
                                </div>
                            </a>
                        </li>

                        {/* <li className="d-block">
                            <a href="https://www.youtube.com/watch?v=tUtC2qiglFs" target="_blank" className="shadow-10">
                                <div className="rgn-singlelinks-g">
                                    <div className="rgn-single-icon">
                                        <img className="img-fluid" src="img/import-token.png" alt="" />
                                    </div>
                                    <p>Add UpSocial Tokens To MetaMask</p>
                                    <span className="ply-btn"><i className="far fa-play-circle"></i></span>
                                </div>
                            </a>
                        </li> */}
                        <li className="d-block">
                            <a href="#" /* target="_blank" */ onClick={(event) => { addTokenInMetamask(event) }} className="shadow-10">
                                <div className="rgn-singlelinks-g">
                                    <div className="rgn-single-icon">
                                        <img className="img-fluid" src="img/import-token.png" alt="" />
                                    </div>
                                    <p>Add UpSocial Tokens To MetaMask</p>
                                   {/*  <span className="ply-btn"><i className="far fa-play-circle"></i></span> */}
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
                        {/* <WalletMultiButton className="btn design-10"  logo="https://corestarter.com/assets/img/logo.png"  /> */}
                        <button type="submit" className="btn design-10" disabled={!(signupEmail && signupUserName)} onClick={(event) => { connectMetamask(event) }}>Register Now</button>
                        <p className="alternative">Already have an Account? <a href="#" onClick={(event) => { loginPage(event) }}  >Login Now</a></p>
                        <b hidden><p style={{ fontWeight: "500" }}>Token Address <span className="color-red">0x5818209Fb829311B438431cB1111dA7a3d9B04FB </span></p></b>
                    </form>
                </div>
            </div>

        </div>

    )
}

export default Regitration;