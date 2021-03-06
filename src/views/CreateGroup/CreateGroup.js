//import React from 'react';
import { Loader, ErrorToast, SuccessToast } from '../../utils/common';
import { useEffect, useState } from "react";
import Session from "../../utils/session";
import Contract from "../../utils/contract"
import { useHistory } from "react-router-dom";
import ReactQuill from 'react-quill'; // ES6
import httpClient from '../../services/http';
import Web3 from 'web3';
// solana code
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


const Community = (props) => {


    const wallet = useSelector(state => state.wallet);
    let mainwallet = null;
    const history = useHistory();
    let [name, setName] = useState(null);
    let [type, setType] = useState(null);
    let [isAdult, setAdult] = useState(true);
    let [about, setAbout] = useState(null);
    let [image, setImage] = useState(null);

    useEffect(() => {
        let userData = Session.isLoggedIn();
        if (!userData) {
            history.push('/auth/login');
        }
    }, []);

    async function createGroup(event) {
        event.preventDefault();
        console.log("calling method");
        Loader(true);
        let formData = {
            "name": name
        }
        event.preventDefault();
        httpClient.call('check-group-name', formData, { method: 'POST' }).then(function (response) {
            if (response.success === true) {

                initDepositToTreasury();
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

    const initDepositToTreasury = async () => {
        console.log(mainwallet);
        console.log(wallet);
        mainwallet = wallet.walletObj;
        let opts = {
            preflightCommitment: 'recent',
            commitment: 'recent',
        };
        let connection = new Connection("https://api.devnet.solana.com", opts.preflightCommitment);
        let provider = new Provider(connection, mainwallet, opts);
        const registry = new Program(idl, prgId, provider);
        console.log("before token account");
        console.log(provider);
        console.log(provider.wallet.publicKey.toString());

        let receiverIdoToken = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mint,
            provider.wallet.publicKey
        );
        console.log("after token account");


        console.log(receiverIdoToken.toString());
        console.log("god treasury= " + provider.wallet.publicKey.toString());
        console.log("treasury= " + treasuryVault);
        console.log("provider= " + provider.wallet.publicKey.toString());
        const depositAmount = new anchor.BN(1 * decimalVal);
        let txn = await registry.rpc.depositTreasury(depositAmount, {
            accounts: {
                registrar: registrarKey,
                treasuryVault: treasuryVault,
                depositor: receiverIdoToken,
                depositorAuthority: provider.wallet.publicKey,
                tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
            },
        });
        console.log("Txn infomation " + txn.toString());
        let transactionHash=txn.toString();

        if (txn.toString() !== null) {
            saveGroupData(transactionHash);
        }
    };



    const saveGroupData = (transactionHash) => {
        let formData = {
            "name": name,
            "description": about,
            "type": type,
            "nsfw": isAdult,
            "image": image,
            "transactionHash":transactionHash
        }

        httpClient.call('create-group', formData, { method: 'POST' }).then(function (response) {
            Loader(false);
            if (response.success) {
                SuccessToast(response.result.message);
                history.push("/user/my-groups");
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            console.log(error);
            Loader(false);
            ErrorToast(error.message);
        })
    }





    const convertFileToBase64 = (data) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            var b64 = reader.result.replace(
                /^data:.+;base64,/, '');
            document.getElementById("profileimage").src = reader.result;
            // $("#profileimage").attr('src', reader.result);
            setImage(b64);
            console.log("file converted successfully");
        };
        reader.readAsDataURL(data);
    }

    const convertFile = (file) => {
        if (typeof (file) != "undefined") {
            var size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
            let postType = file.type.substring(0, 5);
            if (size > 2) {
                ErrorToast('Please select file size less than 2 MB');
                return null;
            }
            if (postType === "image") {
                convertFileToBase64(file);
            } else {
                ErrorToast('Please select file size less than 2 MB');
                return null;
            }
        }
        else {
            ErrorToast('Please select file size less than 2 MB');
            return null;
        }

    }



    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <form action="#" className="create-post-form create-group">
                    <h3 className="tertiary-title color-primary position-relative">Create A Group</h3>
                    <div className="create-group-content position-relative">


                        <div className="user-name">
                            <h5>Name <span style={{ color: 'red' }}> * </span></h5>
                            <p>
                                Group name should include only alphabets

                            </p>
                        </div>

                        <div className="user-name-change-input">
                            <input type="text" className="form-control" placeholder=""
                                maxLength="300"
                                onChange={(event) => { setName(event.target.value) }}

                            />
                        </div>
                        <div className="customize-pf-g-wrap">
                            <div className="pf-lf-part">
                                <h5>Group Avatar <span style={{ color: 'red' }}> * </span></h5>
                            </div>
                            <div className="pf-lr-part grid">
                                <div className="profile-avater size-big position-relative">

                                    <img className="avater-image img-fluid" src="img/dol-1.png" alt="" id="profileimage"

                                    />

                                </div>

                                <div className="upload-banner-img">
                                    <label className="upload type-2">
                                        <input type="file" name="" id="" accept="image/jpg, image/jpeg"
                                            onChange={(event) => { convertFile(event.target.files[0]) }}
                                        />
                                        <img src="img/plus-5.svg" alt="" />
                                    </label>
                                    <p>Drag and Drop or Upload Banner Image </p>
                                </div>

                                <div className="restiction">
                                    <p>Image should be less than 2 MB</p>
                                </div>
                            </div>
                        </div>


                        {/* <div className="post-type-selection">
                            <h4>Group Avtar</h4>
                            <div className="drag-and-drop-div">
                                <img src="img/drag-and-drop.png" alt="" />
                                <label htmlFor="drag" className="drag-and-drop"> 
                            <input className="form-control" type="file" name="file" accept="image/*"

                                onChange={(event) => { convertFile(event.target.files[0]) }}
                            />
                            Choose File 
                             </label>
                            </div> 
                        </div>*/}

                        <div className="post-type-selection">
                            <h4>Group type <span style={{ color: 'red' }}> * </span></h4>
                            <select className="form-control select2" onChange={(event) => { setType(event.target.value) }}>
                                <option defaultValue>Open this select menu</option>
                                <option value="Public" >Public ( Anyone can view, post, and comment to this group )</option>
                                {/*       <option value="Restricted">Restricted ( Anyone can view this group, but only approved users can post)</option>
                                <option value="Private">Private ( Anyone can view, post, and comment to this group)</option>
                          */}   </select>
                        </div>
                        <div className="post-type-selection" hidden>
                            <h4>NSFW</h4>
                            <label className="radioBox checkBox">
                                <p>{/* <span className="nsfw">NSFW</span> */} 18+ year old Group</p>
                                <input type="checkbox" name="checkbox" onChange={() => { setAdult(!isAdult) }} defaultChecked={isAdult} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="post-type-selection">

                            <h4>Description <span style={{ color: 'red' }}> * </span></h4>
                            <div className="pf-lr-part">
                                <div className="text-editor-wrapper">

                                    <ReactQuill onChange={(value) => { setAbout(value) }} value={about} />
                                </div>
                            </div>
                        </div>


                        <div className="cmn-rw in-create-post-filed justify-content-end">
                            <div className="twin-btn d-flex align-items-center justify-content-end">
                                {/* <a href="#" className="btn style-2 transparent-bg proxima-bold">Cancel</a> */}
                                <button type="submit" onClick={(event) => { createGroup(event) }} className="btn primary-bg ms-3 proxima-bold"

                                    disabled={!(name && type && image && about)}
                                >Create Group</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </main>
    );
}

export default Community;
