import React, { useEffect, useState } from 'react';
import Session from '../../utils/session';
import { useHistory } from 'react-router-dom';
import httpClient from '../../services/http';
import { Loader, ErrorToast, SuccessToast } from '../../utils/common';
import $ from 'jquery';
import Contract from "../../utils/contract";
import Web3 from 'web3';
import { Icon } from '@iconify/react';

// solana dependency
import { useSelector } from 'react-redux';
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
const TokenInstructions = require("@project-serum/serum").TokenInstructions;
const anchor = require("@project-serum/anchor");
const serumCmn = require("@project-serum/common");
const prgId = new anchor.web3.PublicKey("AeMuiVsa2oNGf7tnpb2dcY9wj791svsgHGiQXzscCvVT");
let mint = new anchor.web3.PublicKey("FZjx1MYgGoPWaDCZhsLRhb1tKYkMHmfHSDV6Di5qv2wN");
let god = new anchor.web3.PublicKey("2DAWEZ5FEo8qaMJXbMxXvLv2r9F1m1EVc2qMCLQRPVp5");
let registrarKey = new anchor.web3.PublicKey("7xyAFmkmiNABzBHAhgpJGTwrct9gugNpN2gYctHCn5vp");
let rewardVault = new anchor.web3.PublicKey("62rXYgV5H6teuSbNZz55MmX34zdZgBSE3n3873iTN6Xd");
let registrarSigner = new anchor.web3.PublicKey("J6eSbGh8KBCUdshxpFZMb1zeRBzMnRTZ85pkRWqCHrqd");
let poolMint = new anchor.web3.PublicKey("5aH5PiVrXfy4hv9xGwjZsYfMGHfk6rX8SusFjbomM8a8");
let treasuryVault = new anchor.web3.PublicKey("Ece61k12xyNWCcHHDS33w4rSE7RWgFQJepfZdmtPvrmz");
let TOKEN_DECIMAL_OFFSET = new anchor.BN(1000_000_000);
const decimalVal = new anchor.BN(1000000000);


const PostAttributes = (props) => {


    // solana
    const wallet = useSelector(state => state.wallet);
    let mainwallet = null;

    const history = useHistory();
    let element = props.postData;
    let [transferTokenValue, setTransferTokenValue] = useState(null);
    let [isPromoted, setPromoted] = useState(false);
    let [isLike, setIsLike] = useState(false);
    let [isDisLike, setIsDisLike] = useState(false);
    let [likesCount, setLikesCount] = useState(0);
    let [dislikesCount, setDisLikesCount] = useState(0);
    let [userData, setUserData] = useState(null);
    var likeCount = 0;
    var dislikeCount = 0;

    useEffect(() => {

        let user = Session.getSessionData();
        if (user == null) {
        }
        else {
            // console.log("Session");
            // console.log(user);
            setUserData(user);
        }

        if (element !== null) {
            if (element.likes !== null) {
                for (var i = 0; i < element.likes.length; i++) {
                    if (element.likes[i].status == true) {
                        likeCount++;
                    } else {
                        dislikeCount++;
                    }

                    if (user !== null) {
                        if (user.id === element.likes[i].likedBy.id) {
                            if (element.likes[i].status == true) {
                                document.getElementById("likes" + element.id).classList.add('active');
                            }
                            else {
                                document.getElementById("dislikes" + element.id).classList.add('active');;
                            }
                        }
                    }

                }

                setLikesCount(likeCount);
                setDisLikesCount(dislikeCount);
                likeCount = 0;
                dislikeCount = 0;

            }
        }


    }, []);



    const toggleLike = (event, postId) => {
        Loader(true);

        event.preventDefault();
        let user = Session.getSessionData();
        if (user === null) {
            history.push("/auth/login");
        }
        else {

            let formData = {
                "postId": postId,
                "status": true
            }
            httpClient.call("like-post", formData, { method: 'POST' }).then(function (response) {
                if (response.success) {
                    SuccessToast(response.result.message);
                    setIsLike(!isLike);
                    setIsDisLike(false);
                    let responseData = response.result.data
                    setLikesCount(responseData.totalLikes);
                    setDisLikesCount(responseData.totalDisLikes);
                    document.getElementById("likes" + postId).classList.add('active');
                    document.getElementById("dislikes" + postId).classList.remove('active');
                    Loader(false);

                }
                else {
                    Loader(false);

                    ErrorToast(response.result.message);
                }

            }, function (error) {
                Loader(false);

                console.log(error);
            })

        }


    }
    const toggleDisLike = (event, postId) => {
        Loader(true);

        event.preventDefault();
        console.log("dislike post id" + postId);
        let user = Session.getSessionData();
        if (user === null) {
            history.push("/auth/login");
        }
        else {

            let formData = {
                "postId": postId,
                "status": false
            }
            httpClient.call("dislike-post", formData, { method: 'POST' }).then(function (response) {
                if (response.success) {
                    SuccessToast(response.result.message);
                    setIsLike(false);
                    setIsDisLike(!isDisLike)
                    let responseData = response.result.data
                    setLikesCount(responseData.totalLikes);
                    setDisLikesCount(responseData.totalDisLikes);
                    document.getElementById("likes" + postId).classList.remove('active');
                    document.getElementById("dislikes" + postId).classList.add('active');
                    Loader(false);

                }
                else {
                    Loader(false);

                    ErrorToast(response.result.message);
                }

            }, function (error) {
                Loader(false);

                console.log(error);
            })

        }

    }

    let likeClass = isLike ? 'active' : null;
    let disLikeClass = isDisLike ? 'active' : null;



    const pageDetails = (event, name) => {

        event.preventDefault();
        const id = element.id;
        let user = Session.getSessionData();
        if (user == null) {
            history.push('/auth/login');
        }
        else {
            /*  history.push({
                 pathname: '/post-details/' + id,
                 state: { detail: id }
             }); */


            name = name.replace(/ /g, "_");
            sessionStorage.setItem("POSTDETAILSID", id);
            history.push('/post-details/' + name);
        }
    }


    const savedPost = (event, postId) => {

        Loader(true);
        event.preventDefault();
        // console.log(postId);
        let user = Session.getSessionData();
        if (user == null) {

            history.push('/auth/login');
            return null;
        }

        let formData = {
            "id": postId
        }

        httpClient.call("saved-post", formData, { method: 'POST' }).then(function (response) {
            Loader(false);
            if (response.success) {
                SuccessToast(response.result.message);
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    }


    const promotePost = (event, postId) => {
        console.log("--save promote post 0 -");
        Loader(true);
        event.preventDefault();
        //console.log(postId);
        let user = Session.getSessionData();
        if (user == null) {

            history.push('/auth/login');
            return null;
        }

        let formData = {
            "postId": postId
        }

        httpClient.call('check-promote-post', formData, { method: 'POST' }).then(function (response) {
            if (response.success == true) {
                initDepositToTreasury(postId, 0 , true);
            }
            else {
                Loader(false);
                ErrorToast(response.result.message);
            }

        }, function (error) {
            Loader(false);
            ErrorToast(error.message);
            console.log(error);
        })
    }


    const savePromotePostData = (postId, transactionHash) => {
        console.log("--save promote post 2 -");
        let formData = {
            "postId": postId,
            "transactionHash": transactionHash
        }
        httpClient.call('promote-post', formData, { method: 'POST' }).then(function (response) {
            Loader(false);
            if (response.success) {
                SuccessToast(response.result.message);
            }
            else {
                ErrorToast(response.result.message);
            }

        }, function (error) {
            Loader(false);
            ErrorToast(error.message);
        })

    }

    const giveAward = (event, postId) => {

        Loader(true);
        event.preventDefault();
        let token = $("#transfertokenvalue").val();
        if (token <= 0) {
            ErrorToast("Invalid value");
            return false;
        }
        setPromoted(false);
        initDepositToTreasury(postId, token,false);
    }

    const saveGiveRewardData = (postId, transactionHash) => {
        let token = $("#transfertokenvalue").val();
        let formData = {};
        formData =
        {
            "postId": postId,
            "tokens": token,
            "transactionHash": transactionHash
        }

        httpClient.call('give-reward', formData, { method: 'POST' }).then(function (response) {
            Loader(false);
            if (response.success) {
                $("#transfertokenvalue").val(0);
                SuccessToast("Sending " + token + " USN to creator, please wait a moment.");
                document.getElementById('modal-closed').click();
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            ErrorToast(error.message);
            console.log(error);
        });
    }




    const initDepositToTreasury = async (postId, token,isStatus) => {
        //console.log(mainwallet);
        // console.log(wallet);
        mainwallet = wallet.walletObj;
        let opts = {
            preflightCommitment: 'recent',
            commitment: 'recent',
        };
        let connection = new Connection("https://api.devnet.solana.com", opts.preflightCommitment);
        let provider = new Provider(connection, mainwallet, opts);
        const registry = new Program(idl, prgId, provider);
        //console.log("before token account");
        // console.log(provider);
        // console.log(provider.wallet.publicKey.toString());

        let receiverIdoToken = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mint,
            provider.wallet.publicKey
        );
        // console.log("after token account");


        //  console.log(receiverIdoToken.toString());
        //  console.log("god treasury= " + provider.wallet.publicKey.toString());
        //  console.log("treasury= " + treasuryVault);
        //  console.log("provider= " + provider.wallet.publicKey.toString());

        let amt = 1;
        if (token <= 0) {
            amt = 1;
        }
        else {
            amt = token;
        }

        const depositAmount = new anchor.BN(amt * decimalVal);
        let txn = await registry.rpc.depositTreasury(depositAmount, {
            accounts: {
                registrar: registrarKey,
                treasuryVault: treasuryVault,
                depositor: receiverIdoToken,
                depositorAuthority: provider.wallet.publicKey,
                tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
            },
        });
        // console.log("Txn infomation " + txn.toString());
        let transactionHash = txn.toString();

        if (txn.toString() !== null) {


            if (isStatus) {
                console.log("--save promote post 1 -");
                savePromotePostData(postId, transactionHash);
            }
            else {
                console.log("--save reward post 1 -");
                saveGiveRewardData(postId, transactionHash);
            }
        }
    };


    return (
        <>
            <div className="container">
                <div className="modal" id="myModal1">
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-header">
                                <h4 className="modal-title">Awards</h4>
                                <button type="button" id="modal-closed" className="btn btn-danger close" data-dismiss="modal">&times;</button>
                                {/*     <button type="button" className="close" data-dismiss="modal">&times;</button>
                           */}  </div>


                            <div className="modal-body">

                                <div className="text-center">
                                    <img src="img/award.jpg" className="img-fluid" alt="Responsive image"

                                        style={{ width: "100px", height: "100px" }}
                                    />
                                </div>

                                <div className="text-center">
                                    USN &nbsp;Token

                                    <div className="d-flex justify-content-center" >
                                        <div className="pf-lr-part">
                                            <input type="number" className="form-control"
                                                max="50" id="transfertokenvalue" required

                                            />

                                        </div>
                                    </div>



                                </div><br />



                                <div className="text-center">
                                    <button type="button" id="giverewardbutton" className="btn btn-danger"
                                        onClick={(event) => { giveAward(event, element.id) }}
                                    >Give Award</button>
                                </div>

                            </div>


                            <div className="modal-footer">
                                <button hidden type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div className="post-crud-wrap max-520 d-flex justify-content-between">
                <ul className="p-curd-left likeUnlike-wrap">

                    <li>
                        <button id={"likes" + element.id} className={"action-type-one " + likeClass} onClick={(event) => { toggleLike(event, element.id) }}><span className="like"><i
                            className="fal fa-arrow-alt-up"></i></span>{likesCount}</button></li>
                    <li><button id={"dislikes" + element.id} className={"action-type-one " + disLikeClass} onClick={(event) => { toggleDisLike(event, element.id) }}><span className="unlike"><i
                        className="fal fa-arrow-alt-down"></i></span>{dislikesCount}</button></li>

                </ul>
                <ul className="p-curd-right">
                    <li><span style={{ color: '#FF416C' }}>{element.commentCount}</span> &nbsp;<button data-bs-toggle="collapse" data-bs-target="#comment-1"
                        onClick={(event) => { pageDetails(event, element.name) }}
                    ><img src="img/sms.svg" alt="" /></button></li>

                    {userData !== null ?
                        <li>  <button data-toggle="modal" data-target="#myModal1">  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ color: '#FF416C' }} fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
                            <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                        </svg></button></li>
                        : <></>
                    }



                    <li><button onClick={(event) => promotePost(event, element.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ color: '#FF416C' }} fill="currentColor" className="bi bi-graph-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                        </svg>
                    </button></li>

                    {
                        element.nsfw == true ? <li ><Icon icon="uil:18-plus" color="#ff416c" width="20" height="20" /> </li> : null
                    }



                    {/*    <li ><button onClick={(event) => { savedPost(event, element.id) }}  ><img src="img/badge.svg" alt="" /></button></li>
               */}

                </ul>
            </div>
            {/* <div className="post-crud-wrap max-520 d-flex justify-content-between">
                <ul className="p-curd-left">
                    <li><button className="action-type-one"><span className="like"><i className="fal fa-arrow-alt-up"></i></span> {element.totalLikes}</button></li>
                    <li><button className="action-type-one"><span className="unlike"><i className="fal fa-arrow-alt-down"></i></span> {element.totalDislikes} </button></li>
                </ul>
                <ul className="p-curd-right">
                    <li><button data-bs-toggle="collapse" data-bs-target={"#comment-" + element.postId}><img src="img/sms.svg" alt="" />{element.totalComments}</button></li>
                    <li><button><img src="img/star.svg" alt="" /></button></li>
                    <li><button><img src="img/share.png" alt="" /></button></li>
                    <li hidden><button><img src="img/badge.svg" alt="" /></button></li>
                </ul>
            </div> */}

            <form className="post-coment-form max-520 collapse" id={"comment-" + element.postId}>
                <div className="input-wrapper">
                    <input type="text" className="form-control ht-50 design-2 design-3"
                        placeholder="Add new comment" />
                </div>
                <div className="submit-comment">
                    <p>Receive comment notifications</p>
                    <button className="btn gradient-bg-one radius-30 f-bold post-comment">Post
                        Comment</button>
                </div>
            </form>
        </>
    );
}

export default PostAttributes;
