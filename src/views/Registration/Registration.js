import React, { useEffect, useRef, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from "react-router-dom";
import Web3 from 'web3';
import Contractcustom from "../../utils/contract";
import httpClient from '../../services/http';
import detectEthereumProvider from '@metamask/detect-provider';
import { useDispatch, useSelector } from 'react-redux';


import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import appConfig from '../../config';
import {
    getAssociatedTokenAddress,
    createAssociatedTokenAccount,
} from '@project-serum/associated-token';
import { Program, Provider, BN } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '../../idl/registry';
import { Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { AddWalletObject } from './action';
const TokenInstructions = require("@project-serum/serum").TokenInstructions;
const anchor = require("@project-serum/anchor");
// const utils = require('../../services/utils');
const serumCmn = require("@project-serum/common");

const prgId = new anchor.web3.PublicKey("AeMuiVsa2oNGf7tnpb2dcY9wj791svsgHGiQXzscCvVT");

let mint = new anchor.web3.PublicKey("FZjx1MYgGoPWaDCZhsLRhb1tKYkMHmfHSDV6Di5qv2wN");
let god = null;
let registrarKey = new anchor.web3.PublicKey("7xyAFmkmiNABzBHAhgpJGTwrct9gugNpN2gYctHCn5vp");
let rewardVault = new anchor.web3.PublicKey("62rXYgV5H6teuSbNZz55MmX34zdZgBSE3n3873iTN6Xd");
let registrarSigner = new anchor.web3.PublicKey("J6eSbGh8KBCUdshxpFZMb1zeRBzMnRTZ85pkRWqCHrqd");
let poolMint = new anchor.web3.PublicKey("5aH5PiVrXfy4hv9xGwjZsYfMGHfk6rX8SusFjbomM8a8");
let treasuryVault = new anchor.web3.PublicKey("Ece61k12xyNWCcHHDS33w4rSE7RWgFQJepfZdmtPvrmz");
let TOKEN_DECIMAL_OFFSET = new anchor.BN(1000_000_000);


const Regitration = (props) => {

    // const assert = require("assert");


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

    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const wallet = useWallet();

    useEffect(() => {

        (async () => {
            if (wallet?.publicKey) {
                console.log("hit");
                console.log(publicKey.toString());
                setWalletAddress(publicKey.toString());
                setFullWallet(wallet);
                dispatch(AddWalletObject(wallet))

            }
        })();
    }, [wallet.publicKey]);


    const signingSolana = (event) => {

        event.preventDefault();

        // createTokenActIfNotExist();
        // return null;
        Loader(true);
        let formData = {
            userName: signupUserName,
           /*  email: signupEmail, */
            wallet: walletAddress,
        };


        httpClient.call('signup', formData, { method: 'POST' }).then(function (response) {
            Loader(false);
            if (response.success == true) {
                SuccessToast(response.result.message);

                createTokenActIfNotExist();

                //  


            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })

    }


    let [memberAccount, setMemberAccount] = useState(null);
    let [fullWallet, setFullWallet] = useState(null);

    // create token 
    const createTokenActIfNotExist = async () => {
        let opts = {
            preflightCommitment: 'recent',
            commitment: 'recent',
        };
        let connection = new Connection("https://api.devnet.solana.com", opts.preflightCommitment);
        let provider = new Provider(connection, fullWallet, opts);
        const registry = new Program(idl, prgId, provider);
        console.log(provider);
        console.log("------------------------");

        let receiverIdoToken = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mint,
            provider.wallet.publicKey
        );

        const receiverAccount = await provider.connection.getAccountInfo(receiverIdoToken);


        if (receiverAccount === null) {
            console.log("new receiverAccount: ");
            let newTokenAccIx = await createAssociatedTokenAccount(
                provider.wallet.publicKey,
                provider.wallet.publicKey,
                mint,
            )
            let newTokenAccTx = new anchor.web3.Transaction().add(newTokenAccIx);

            const signature = await provider.send(newTokenAccTx);
            console.log('SIGNATURE-create', signature);

            god = await Token.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                mint,
                provider.wallet.publicKey
            );
            console.log("new receiverIdoToken: " + receiverIdoToken);

            initWithdraw();
        }
        else {
            god = receiverIdoToken;
            initWithdraw();
        }
    }


    // withdraw
    const initWithdraw = async () => {

        let opts = {
            preflightCommitment: 'recent',
            commitment: 'recent',
        };
        let connection = new Connection("https://api.devnet.solana.com", opts.preflightCommitment);
        let provider = new Provider(connection, fullWallet, opts);
        const registry = new Program(idl, prgId, provider);

        console.log("god withdraw = " + god);
        const txn = await registry.rpc.withdraw({
            accounts: {
                registrar: registrarKey,
                userVault: god,
                poolMint: poolMint,
                rewardVault: rewardVault,
                tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
                registrarSigner,
            }
        });
        console.log("txn = " + txn.toString());
        history.push('/auth/login');

        // const tokenAct = await serumCmn.getTokenAccount(
        //     provider,
        //     god
        // );

        // console.log("tokenAct = " + tokenAct.amount);

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
                        {/* <li className="d-block" >
                            <a href="#"  onClick={(event) => { addPolygonTestnetNetwork(event) }} className="shadow-10">
                                <div className="rgn-singlelinks-g">
                                    <div className="rgn-single-icon">
                                        <img className="img-fluid" src="img/meta-to-binance.png" alt="" />
                                    </div>
                                    <p>Connect Solana <br /> To TestNet?</p>
                                    
                                </div>
                            </a>
                        </li> */}

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
                        {/* <li className="d-block" >
                            <a href="#"  onClick={(event) => { addTokenInMetamask(event) }} className="shadow-10">
                                <div className="rgn-singlelinks-g">
                                    <div className="rgn-single-icon">
                                        <img className="img-fluid" src="img/import-token.png" alt="" />
                                    </div>
                                    <p>Add UpSocial Tokens To MetaMask</p>
                                    
                                </div>
                            </a>
                        </li> */}
                    </ul>
                </div>
                <div className="lgn-rgn-right">
                    <div className="rgn-form">
                        <h1>Welcome!</h1>
                        <div className="input-inside">
                            <input className="form-control design-10 shadow-10" type="text" placeholder="Username"

                                onChange={(event) => { setSignupUserName(event.target.value) }}
                                onBlur={() => validator.current.showMessageFor('userName')} />
                            {validator.current.message('userName', signupUserName, 'required')}
                        </div>

                        {/* <div className="input-inside">
                            <input className="form-control design-10 shadow-10" type="text" placeholder="Email"
                                onChange={(event) => { setSignupEmail(event.target.value) }}
                                onBlur={() => validator.current.showMessageFor('email')} />
                            {validator.current.message('email', signupEmail, 'required|email')}
                        </div> */}


                        <div className='d-flex justify-content-center align-items-center' style={{ gap: "10px" }}>
                            <div>
                                <WalletMultiButton className="btn design-10" logo="https://scontent.fbom19-1.fna.fbcdn.net/v/t39.30808-6/240833546_146369280983379_5424852521300066332_n.png?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=wJLQUV80qbIAX8iQNmk&_nc_ht=scontent.fbom19-1.fna&oh=00_AT_lJ4wNCAoG-rz4FjBDMknXzTbsJDaaRN2QNNGQozLWLA&oe=61E67C72" />
                            </div>
                            <div>
                                <button type="submit" className="btn design-10" disabled={!(/* signupEmail && */ signupUserName)} onClick={(event) => { signingSolana(event) }}>Register Now</button>
                            </div>
                        </div>


                        <p className="alternative">Already have an Account? <a href="#" onClick={(event) => { loginPage(event) }}  >Login Now</a></p>
                        <b hidden><p style={{ fontWeight: "500" }}>Token Address <span className="color-red">0x5818209Fb829311B438431cB1111dA7a3d9B04FB </span></p></b>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Regitration;