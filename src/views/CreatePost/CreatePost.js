import { useEffect, useState } from 'react';
import { Loader, ErrorToast, SuccessToast } from '../../utils/common';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import httpClient from '../../services/http';
import { useHistory } from 'react-router-dom';
import Session from '../../utils/session';
import Contract from "../../utils/contract";
import Web3 from 'web3';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

//
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

const CreatePost = (props) => {

    // solana
    const wallet = useSelector(state => state.wallet);
    let mainwallet = null;

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setData(currentContentAsHTML);
    }

    const createMarkup = (html) => {

        return {
            __html: DOMPurify.sanitize(html)
        }
    }


    //
    const history1 = useHistory();

    useEffect(() => {
        let userData = Session.isLoggedIn();
        if (!userData) {
            history1.push('/auth/login');
        }
    }, []);

    let [id, setId] = useState(0);
    let [title, setTitle] = useState();
    let [isAdult, setAdult] = useState(false);
    let [data, setData] = useState();
    let [isText, setText] = useState(false);
    let [dataType, setDataType] = useState();
    let [postType, setPostType] = useState();



    const savePost = (event) => {
        Loader(true);
        event.preventDefault();
        let fd = {};
        // console.log(data);
        if (isText) {
            console.log("text block calling");
            initDepositToTreasury(0);
        }
        else {
            console.log("image block calling");
            const formData = new FormData();
            formData.append('file', data);
            httpClient.call('upload-media', formData, { method: 'POST' }).then(function (response) {
                if (response.success) {
                    let userData = response.result.data;
                    console.log(userData)
                    setId(userData.id);
                    setText(false);
                    initDepositToTreasury(userData.id);
                }
                else {
                    Loader(false);
                    ErrorToast(response.result.message);
                }
            }, function (error) {
                Loader(false);
                ErrorToast(error.message);
            })
        }
    }


    const initDepositToTreasury = async (postid) => {
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

        if (txn.toString() !== null) {

            if (isText == true) {
                console.log("text block calling 1");
                uploadTimelinePost();
            }
            else {
                console.log("image block calling 2");
                console.log("id is" + postid);
                uploadPost(postid);
            }
        }
    };


    const uploadTimelinePost = () => {
        let fd = {
            "type": "text",
            "name": title,
            "data": data,
            "dataType": ".txt",
            "nsfw": isAdult

        };
        httpClient.call('upload-timline-post', fd, { method: 'POST' }).then(function (response) {
            Loader(false);
            if (response.success) {
                SuccessToast(response.result.message);
                history1.push("/");
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            ErrorToast(error.message);
        })
    }

    const uploadPost = (postid) => {

        let fd = {
            "id": postid,
            "type": postType,
            "name": title,
            "dataType": dataType,
            "nsfw": isAdult

        };

        httpClient.call('upload-post', fd, { method: 'POST' }).then(function (response) {
            Loader(false);
            if (response.success) {
                SuccessToast(response.result.message);
                history1.push("/");
            }
            else {
                ErrorToast(response.result.message);
            }

        }, function (error) {
            Loader(false);
            ErrorToast(error.message);
        })

    }


    const compressString = (str = '') => {
        let res = '';
        let count = 1;
        for (let i = 0; i < str.length; i++) {
            let cur = str[i];
            let next = str[i + 1];
            if (cur === next) {
                count++;
            } else {
                res += cur + String(count);
                count = 1;
            };
        }
        return res.length < str.length ? res : str;
    };


    const convertFileToBase64 = (data) => {
        Loader(true);
        const reader = new FileReader();
        reader.onloadend = function () {
            var b64 = reader.result.replace(/^data:.+;base64,/, '');
            setData(data);
            let postType = data.type.substring(0, 5);
            if (postType === "image") {
                //set value
                document.getElementById("image-prev").src = reader.result;
                document.getElementById('image-prev').style.display = 'inline';
                //reset value
                document.getElementById('video-prev').style.display = 'none';
                document.getElementById('audio-prev').style.display = 'none';
                document.getElementById("video-prev").value = "";
                document.getElementById("audio-prev").value = "";
                Loader(false);
            } else if (postType === "video") {
                //set value
                document.getElementById("video-prev").src = reader.result;
                document.getElementById('video-prev').style.display = 'inline';
                //reset value
                document.getElementById('image-prev').style.display = 'none';
                document.getElementById('audio-prev').style.display = 'none';
                document.getElementById("image-prev").value = "";
                document.getElementById("audio-prev").value = "";
                Loader(false);
            } else {

                //set value
                document.getElementById("audio-prev").src = reader.result;
                document.getElementById('audio-prev').style.display = 'inline';

                //reset value
                document.getElementById('video-prev').style.display = 'none';
                document.getElementById('image-prev').style.display = 'none';
                document.getElementById("video-prev").value = "";
                document.getElementById("image-prev").value = "";
                Loader(false);
            }


            console.log("file converted successfully");
        };
        reader.readAsDataURL(data);
    }

    const convertFile = (file) => {
        if (typeof (file) != "undefined") {
            //setSelectedFile(file);
            var size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
            let postType = file.type.substring(0, 5);
            if (size > 200) {
                ErrorToast('File should not be greater than 200 MB');
                return null;
            }
            convertFileToBase64(file);
            if (postType === "image") {
                // console.log(postType);
                setDataType(".jpg");
                setPostType("image");
            } else if (postType === "video") {
                ///  console.log(postType);
                setDataType(".mp4");
                setPostType("video");
            } else {
                // console.log(postType);
                setDataType(".mp3");
                setPostType("audio");
            }

        }
        else {
            ErrorToast('File should not be greater than 200 MB');
            return null;
        }

    }


    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <form action="#" className="create-post-form">
                    <h3 className="tertiary-title position-relative">Create A Post</h3>
                    {/*  <div className="post-writter d-flex justify-content-between" >
                        <div className="user">
                            <div className="avater">
                                <img className="img-fluid" src="img/user.png" alt="" />
                            </div>
                            <h5><a href="#" className="d-inline-block">u/GalaGames</a>
                            </h5>
                        </div>
                        <button type="button" className="tooltip-btn" data-bs-toggle="tooltip" data-bs-html="true"
                            title="<p>Lorem ipsum dolor sit amet sojeljfla aofdifelfoa dlfjdfowef.</p>">
                            <img src="img/info-icon.svg" alt="" />
                        </button>
                    </div> */}

                    <div className="post-contents">
                        <ul className="nav nav-tabs types" id="createPost" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="link-tab" data-bs-toggle="tab" data-bs-target="#link"
                                    type="button" role="tab" aria-controls="home" aria-selected="true"
                                    onClick={() => { setText(false) }}
                                >Media</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="text-tab" data-bs-toggle="tab" data-bs-target="#text"
                                    type="button" role="tab" aria-controls="text" aria-selected="false"
                                    onClick={() => { setText(true) }}
                                >Text</button>
                            </li>
                        </ul>


                        <div className="tg-grid">
                            <div className="tab-content" id="createPost">
                                <div className="tab-pane fade show active" id="link" role="tabpanel"
                                    aria-labelledby="nav-link-tab">
                                    <div className="tb-content">
                                        <div className="text-content-wrap">
                                            <div className="post-title-eidit">
                                                <input type="text" className="form-control" placeholder="Title"
                                                    maxLength="300"
                                                    onChange={(event) => { setTitle(event.target.value) }}

                                                />
                                            </div>


                                            {/* <div className="text-editor-wrapper">
                                                <div className="input-wrapper type-2">
                                                    <label htmlFor="">Attach File</label>
                                                    <div className="user-name-change-input">
                                                        <input className="file" type="file" name="file"

                                                            onChange={(event) => { convertFile(event.target.files[0]) }}
                                                        />
                                                    </div>
                                                </div> */}




                                            {/* </div> */}







                                            <div className="text-editor-wrapper">
                                                <div className="input-wrapper type-2">
                                                    <label htmlFor="">Attach File</label>
                                                    <div className="drag-and-drop-div">
                                                        <img src="img/drag-and-drop.png" alt="" />
                                                        <label htmlFor="drag" className="drag-and-drop">
                                                            <input type="file" name="file" id="drag"

                                                                onChange={(event) => { convertFile(event.target.files[0]) }}
                                                            />
                                                            Choose File
                                                        </label>
                                                    </div>
                                                </div>

                                                <div style={{ marginTop: 30 }}>
                                                    <img src="img/dol-1.png" alt="" id="image-prev" width="100%" height="300px"
                                                        style={{ display: 'none' }}

                                                    />
                                                    <video controls width="100%" height="300px" id="video-prev" style={{ display: 'none' }} >
                                                        <source src="" type="video/MP4" />
                                                    </video>
                                                    <audio controls id="audio-prev" width="100%" height="300px" style={{ display: 'none' }}>
                                                        <source src="" type="audio/mpeg" />
                                                    </audio>
                                                </div>
                                            </div>

                                        </div>

                                        <br />
                                        <div className="text-content-wrap" >
                                            <label className="radioBox checkBox">
                                                <p><span className="nsfw">NSFW</span></p>
                                                <input type="checkbox" name="checkbox" onChange={() => { setAdult(!isAdult) }} defaultChecked={isAdult} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="text" role="tabpanel" aria-labelledby="nav-text-tab">
                                    <div className="tb-content">
                                        <div className="text-content-wrap">
                                            <div className="post-title-eidit">
                                                <input type="text" className="form-control" placeholder="Title"
                                                    maxLength="300" onChange={(event) => { setTitle(event.target.value) }}
                                                />
                                            </div>
                                            {/* <div className="text-editor-wrapper">
                                                <div id="txtEditor">
                                                    <ReactQuill onChange={(value) => { setData(value) }} />
                                                </div>
                                                
                                            </div> */}
                                            <div style={{ border: "1px solid lightgray", borderRadius: 10, padding: '2px', minHeight: '300px' }}>
                                                <Editor
                                                    // onChange={(editorState) => { setData(editorState) }}
                                                    editorState={editorState}
                                                    onEditorStateChange={handleEditorChange}
                                                    wrapperClassName="wrapper-class"
                                                    editorClassName="editor-class"
                                                    toolbarClassName="toolbar-class"
                                                />
                                            </div>
                                            <div hidden className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>


                                        </div><br />
                                        <div className="text-content-wrap" >

                                            <label className="radioBox checkBox">
                                                <p><span className="nsfw">NSFW</span></p>
                                                <input type="checkbox" name="checkbox" onChange={() => { setAdult(!isAdult) }} defaultChecked={isAdult} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* <div className="tg-g-right">
                                <div className="input-wrapper type-2">
                                    <label htmlFor="">Attach File</label>
                                    <div className="drag-and-drop-div">
                                        <img src="img/drag-and-drop.png" alt="" />
                                        <label htmlFor="drag" className="drag-and-drop">
                                            <input type="file" name="" id="drag" />
                                            Choose File
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <div className="cmn-rw in-create-post-filed">
                            <label htmlFor="check-1" className="check-box">
                                {/* <input id="check-1" type="checkbox" />
                                <div className="checkbox"><img src="img/checkbox.png" alt="" />
                                    <img className="check-ok" src="img/check-ok.png" alt="" />
                                </div>
                                <p>Send replies to my inbox</p> */}
                            </label>

                            <div className="twin-btn d-flex align-items-center justify-content-between">

                                <button type="submit" className="btn primary-bg ms-3 proxima-bold" disabled={!(title && data
                                )}
                                    onClick={(event) => { savePost(event) }}
                                >Post Now</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/*  <ul className="nav nav-tabs" id="myTab" role="tablist" >
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                        role="tab" aria-controls="home" aria-selected="false">Popular</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                        role="tab" aria-controls="profile" aria-selected="false">Recommended</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-linFk" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                        role="tab" aria-controls="contact" aria-selected="true">All</button>
                </li>
            </ul> */}
            {/* <div className="tab-content  mb-4" id="myTabContent" >
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <PostList type={'POPULAR'} postlist={pt} />
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <PostList type={'RECOMMENDED'} postlist={pt} />
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <PostList type={'ALL'} postlist={pt} />
                </div>
            </div> */}
        </main>
    );
}

export default CreatePost;
