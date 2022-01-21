//import React from 'react';
import { Loader, ErrorToast, SuccessToast } from '../../utils/common';
import { useEffect, useState } from "react";
import Session from "../../utils/session";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from 'react-quill'; // ES6
import httpClient from '../../services/http';
import Contract from "../../utils/contract";
import Web3 from 'web3';
import $ from 'jquery';

// solana import dependency
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

const EditGroup = (props) => {

    const wallet = useSelector(state => state.wallet);
    let mainwallet = null;
    const history = useHistory();
    const params = useParams();

    let [name, setName] = useState(null);
    let [type, setType] = useState(null);
    let [isAdult, setAdult] = useState(true);
    let [about, setAbout] = useState(null);
    let [image, setImage] = useState(null);
    let [previmage, setprevImage] = useState(null);

    let [id, setId] = useState(null);

    useEffect(() => {
        if (!params.groupId) {
            history.push("/auth/login");
        } else {
            getGroupDetails(params.groupId);
        }
    }, []);
    useEffect(() => {
        if (!params.groupId) {
            history.push("/auth/login");
        } else {
            getGroupDetails(params.groupId);
        }
    }, [params.groupId]);


    async function updateGroup(event) {
        Loader(true);
        event.preventDefault();
        let formData = {
            "id": id,
            "name": name,
            "description": about,
            "type": type,
            "nsfw": isAdult,
            "image": image
        }
        event.preventDefault();
        httpClient.call('check-edit-group-name', formData, { method: 'POST' }).then(function (response) {
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
            updateGroupData(transactionHash);
        }
    };
    const updateGroupData = (transactionHash) => {
        let formData = {
            "id": id,
            "name": name,
            "description": about,
            "type": type,
            "nsfw": isAdult,
            "image": image,
            "transactionHash":transactionHash
        }
        httpClient.call('update-group', formData, { method: 'PUT' }).then(function (response) {
            Loader(false);
            if (response.success) {
                SuccessToast(response.result.message);
                history.push("/user/my-groups");
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            ErrorToast(error.message);
        })
    }

    const convertFileToBase64 = (data) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            var b64 = reader.result.replace(
                /^data:.+;base64,/, '');
            document.getElementById("profile-image1").src = reader.result;
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
            $("#div1").attr("hidden", true);
            $("#div2").attr("hidden", false);
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

    const getGroupDetails = (groupid) => {
        Loader(true);
        httpClient.call("get-group-details/" + groupid, null, { method: 'GET' }).then(function (response) {
            if (response.success) {


                $("#div1").attr("hidden", false);

                let result = response && response.result && response.result.data ? response.result.data : [];
                // console.log(result);
                setId(result.id);
                setName(result.name);
                setType(result.type);
                setAbout(result.description);
                setprevImage(result.image);
                setImage(result.image);
                setAdult(result.nsfw);
                if (result.nsfw === true) {
                    $("#nsfw").prop("checked", true);
                }
                else {
                    $("#nsfw").prop("checked", false);
                }

            }
            else {

                ErrorToast(response.result.message);
                history.push("/");
            }
            Loader(false);
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    }

    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <form action="#" className="create-post-form create-group">
                    <h3 className="tertiary-title color-primary position-relative">Edit A Group</h3>
                    <div className="create-group-content position-relative">


                        <div className="user-name">
                            <h5>Name <span style={{ color: 'red' }}> * </span></h5>
                            <p>Group name should include only alphabets

                            </p>
                        </div>

                        <div className="user-name-change-input">
                            <input type="text" className="form-control" placeholder=""
                                value={name} maxLength="27"
                                onChange={(event) => { setName(event.target.value) }}

                            />
                        </div>
                        <div className="customize-pf-g-wrap">
                            <div className="pf-lf-part">
                                <h5>Group Avtar <span style={{ color: 'red' }}> * </span></h5>
                            </div>
                            <div className="pf-lr-part grid" id="div1" hidden>
                                <div className="profile-avater size-big position-relative" >
                                    <img className="avater-image img-fluid" src={"https://ipfs.io/ipfs/" + previmage} alt="" id="profile-image" />
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

                            <div className="pf-lr-part grid" id="div2" hidden>
                                <div className="profile-avater size-big position-relative" >
                                    <img className="avater-image img-fluid" src="img/dol-1.png" alt="" id="profile-image1" />
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
                            <h4>Group type<span style={{ color: 'red' }}> * </span></h4>
                            <select className="form-control select2" value={type} onChange={(event) => { setType(event.target.value) }}>
                                <option defaultValue>Open this select menu</option>
                                <option value="Public" >Public ( Anyone can view, post, and comment to this group )</option>
                                {/*       <option value="Restricted">Restricted ( Anyone can view this group, but only approved users can post)</option>
                                <option value="Private">Private ( Anyone can view, post, and comment to this group)</option>
                            */} </select>
                        </div>
                        <div className="post-type-selection" hidden>
                            <h4>NSFW</h4>
                            <label className="radioBox checkBox">
                                <p>{/* <span className="nsfw">NSFW</span> */} 18+ year old Group</p>
                                <input type="checkbox" name="checkbox" id="nsfw" onChange={() => { setAdult(!isAdult) }} defaultChecked={isAdult} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="post-type-selection">

                            <h4>Description<span style={{ color: 'red' }}> * </span></h4>
                            <div className="pf-lr-part">
                                <div className="text-editor-wrapper">

                                    <ReactQuill onChange={(value) => { setAbout(value) }} value={about} />
                                </div>
                            </div>
                        </div>


                        <div className="cmn-rw in-create-post-filed justify-content-end">
                            <div className="twin-btn d-flex align-items-center justify-content-end">
                                {/* <a href="#" className="btn style-2 transparent-bg proxima-bold">Cancel</a> */}
                                <button type="submit" onClick={(event) => { updateGroup(event) }} className="btn primary-bg ms-3 proxima-bold"

                                    disabled={!(name && type && image && about)}
                                >Update Group</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </main>
    );
}

export default EditGroup;
