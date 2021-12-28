import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom'
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import httpClient from '../../services/http';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import Session from '../../utils/session';
import _ from 'underscore';
import HoverVideoPlayer from 'react-hover-video-player';
import Contract from "../../utils/contract";
import Web3 from 'web3';
import $ from 'jquery';

// tech 
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Comment = props => {
    const navigate = (event) => {
        event.preventDefault()
    }

    let originalCommentData = props.originalCommentData;
    let comment = props.comment;
    let index = props.index;
    let isParent = props.isParent;
    let element = props.element


    if (!isParent) {
        let indexEle = _.findIndex(originalCommentData, { id: comment });
        comment = originalCommentData[indexEle];
    }
    let childsData = comment && comment.childIds && comment.childIds.length > 0 ? comment.childIds : null;
    if (childsData && childsData.length > 0) childsData.sort((a, b) => { return b - a })
    if (!comment) return null;

    //console.log(comment);
    return (

        <li key={index}>
            <div className="elementory-avater-wrap single-comment">
                <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater">
                    {/* <img
                    src="img/dol-1.png" alt="" />
 */}


                    {comment.user.image ?
                        <img className="avater-image img-fluid" src={"https://ipfs.io/ipfs/" + comment.user.image} alt="" id="profile-image"

                        /> :
                        <img className="avater-image img-fluid" src="img/dol-1.png" alt="" id="profileimage"

                        />
                    }
                </a>
                <div className="comment-part">
                    <h6><strong>Posted by</strong><a href="/" onClick={(event) => navigate(event)}>{comment && comment.user && comment.user.userName ? comment.user.userName : ''}</a>{/* <span>{commentElement.createDate}</span> */}</h6>
                    <div className="comment-text">
                        <p>{comment && comment.comment ? comment.comment : ''}</p>
                    </div>

                    <div className="reply-or-report-btn d-flex justify-content-end">
                        <button className="reply" data-bs-toggle="collapse" id={"reply-child-button"}
                            data-bs-target={"#reply-" + comment.id}>Reply</button>
                        <button className="report" hidden>Report</button>
                    </div>

                    <form className="reply-form collapse" id={"reply-" + comment.id}>
                        <textarea className="form-control reply-textarea" name="reply-comment" id="reply-comment1"
                            onChange={(event) => { props.setCommentMessage(event.target.value) }}
                        ></textarea>
                        <div className="text-end mt-3">
                            <button type="submit" onClick={(event) => {
                                props.saveChildComment(event, comment.id, element.id)
                            }} className="btn gradient-bg-one radius-30 f-bold reply-post">Post</button>
                        </div>
                    </form>
                </div>
            </div>
            {childsData && <ul className={"nested-comment"}><Comments {...props} originalCommentData={originalCommentData} commentData={childsData} isParent={false} /></ul>}
        </li>

    )
};

const Comments = props => {
    if (!props.commentData || props.commentData.length < 1) return null

    return (
        <>
            {props.commentData.map(function (comment, index) {
                if (props.isParent && comment.parentId != 0) return null
                return <Comment {...props} originalCommentData={props.originalCommentData} commentData={props.commentData} key={comment.id} comment={comment} isParent={props.isParent} index={index} />
            })}
        </>
    )
};

const PostDetails = (props) => {

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
        setConvertedContent(currentContentAsHTML);
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const history = useHistory();
    const location = useLocation();
    const params = useParams()
    const [element, setDetails] = useState(null);
    let [isLike, setIsLike] = useState(false);
    let [isDisLike, setIsDisLike] = useState(false);
    let [likesCount, setLikesCount] = useState(0);
    let [dislikesCount, setDisLikesCount] = useState(0);
    let [commentData, setCommentData] = useState(null);

    let [commentMessage, setCommentMessage] = useState(null);
    var likeCount = 0;
    var dislikeCount = 0;

    useEffect(() => {
        getPostDetails(params.postid);
    }, []);


    let [userData, setUserData] = useState();
    useEffect(() => {
        let user = Session.getSessionData();
        if (user == null) {
        }
        else {
            // console.log("Session");
            // console.log(user);
            setUserData(user);
        }

    }, []);

    const navigate = (event) => {
        event.preventDefault()
    }

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
                    setIsDisLike(false)
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

    const savedPost = (event, postId) => {

        event.preventDefault();
        Loader(true);
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

    const saveParentComment = (event, postid) => {
        Loader(true);
        event.preventDefault();
        // console.log(postid);

        let formData = {
            "data": commentMessage,
            "parentId": 0,
            "postId": postid
        }

        /* httpClient.call("upload-comment", formData, { method: 'POST' }).then(function (response) {
            Loader(false);
            setCommentMessage('')
            document.getElementById('comment-1-button').click()
            getPostDetails(params.postid);

        }, function (error) {
            Loader(false);
            console.log(error);
        }); */


        let userData = Session.getSessionData();
        Web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");
        window.ethereum.enable();
        const NameContract = new Web3.eth.Contract(Contract.contract_abi, Contract.contract_address);
        NameContract.methods.transfer(Contract.upsocial_wallet, "1000000000000000000").send({ from: userData.wallet })
            .then(function (receipt) {
                console.log(receipt);

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

                formData['transaction'] = transaction;
                httpClient.call('upload-comment', formData, { method: 'POST' }).then(function (response) {
                    Loader(false);
                    if (response.success) {
                        Loader(false);
                        setCommentMessage('')
                        document.getElementById('comment-1-button').click()
                        getPostDetails(params.postid);
                    }
                    else {
                        ErrorToast(response.result.message);
                    }

                }, function (error) {
                    Loader(false);
                    ErrorToast(error.message);
                })
            }, function (error) {
                Loader(false);
                ErrorToast(error.message);
                console.log(error);
            });

    }


    const userView = (event, userName) => {
        event.preventDefault();
        let user = Session.getSessionData();
        if (user == null) {
            history.push('/auth/login');
        }
        else {
            history.push({
                pathname: '/user/view/' + userName,
                state: { userName: userName }
            });
        }

    }



    const saveChildComment = (event, parentid, postid) => {
        Loader(true);
        event.preventDefault();

        let formData = {
            "data": commentMessage,
            "parentId": parentid,
            "postId": postid
        }

        let userData = Session.getSessionData();
        Web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");
        window.ethereum.enable();
        const NameContract = new Web3.eth.Contract(Contract.contract_abi, Contract.contract_address);
        NameContract.methods.transfer(Contract.upsocial_wallet, "1000000000000000000").send({ from: userData.wallet })
            .then(function (receipt) {
                console.log(receipt);
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

                formData['transaction'] = transaction;
                httpClient.call('upload-comment', formData, { method: 'POST' }).then(function (response) {
                    Loader(false);
                    if (response.success) {
                        Loader(false);
                        setCommentMessage('')
                        document.getElementById('comment-1-button').click()
                        getPostDetails(params.postid);
                    }
                    else {
                        ErrorToast(response.result.message);
                    }

                }, function (error) {
                    Loader(false);
                    ErrorToast(error.message);
                })
            }, function (error) {
                Loader(false);
                ErrorToast(error.message);
                console.log(error);
            });
    }

    const toggleDisLike = (event, postId) => {
        Loader(true);
        event.preventDefault();
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




    const getPostDetails = (postid) => {
        Loader(true);
        httpClient.call("get-post-details/" + postid, null, { method: 'GET' }).then(function (response) {
            if (response.success) {
                //console.log(response);
                setDetails(response.result.data);
                setAttribute(response.result.data);
                setComment(response.result.data);
                //SuccessToast(response.    result.message);
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

    const setComment = (element) => {
        if (element !== null) {
            // console.log("calling 1");
            if (element.comments !== null) {
                //console.log("calling 2");
                setCommentData(element.comments);
            }
        }
    }

    const setAttribute = (element) => {
        let user = Session.getSessionData();

        if (element !== null) {
            if (element.likes !== null) {
                for (var i = 0; i < element.likes.length; i++) {
                    if (element.likes[i].status === true) {
                        likeCount++;
                    } else {
                        dislikeCount++;
                    }

                    if (user !== null) {
                        if (user.id === element.likes[i].likedBy.id) {
                            if (element.likes[i].status === true) {
                                document.getElementById("likes" + element.id).classList.add('active');
                            }
                            else {
                                document.getElementById("dislikes" + element.id).classList.add('active');
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
    }

    const editPost = (event, postid) => {
        event.preventDefault();
        history.push({
            pathname: '/edit-post/' + postid,
            state: { postid: postid }
        });

    }



    const promotePost = (event, postId) => {

        Loader(true);
        event.preventDefault();
        //console.log(postId);
        let user = Session.getSessionData();
        if (user == null) {

            history.push('/auth/login');
            return null;
        }

        let formData = {};

        formData = {
            "postId": postId
        }
        httpClient.call('check-promote-post', formData, { method: 'POST' }).then(function (response) {
            if (response.success == true) {
                let userData = Session.getSessionData();
                Web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");
                //Web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
                window.ethereum.enable();
                const NameContract = new Web3.eth.Contract(Contract.contract_abi, Contract.contract_address);
                console.log(NameContract);
                NameContract.methods.transfer(Contract.upsocial_wallet, "1000000000000000000").send({ from: userData.wallet })
                    .then(function (receipt) {
                        console.log(receipt);
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
                        formData['transaction'] = transaction;
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
                    }, function (error) {
                        Loader(false);
                        ErrorToast(error.message);
                        console.log(error);
                    });
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


    const giveAward = (event, postId) => {
        event.preventDefault();
        let token = $("#transfertokenvalue").val();


        if (token <= 0) {
            ErrorToast("Invalid value");
            return false;
        }

        Loader(true);
        event.preventDefault();
        let formData = {};
        formData =
        {
            "postId": postId,
            "tokens": token
        }

        let userData = Session.getSessionData();
        Web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");
        //Web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
        window.ethereum.enable();
        const NameContract = new Web3.eth.Contract(Contract.contract_abi, Contract.contract_address);
        console.log(NameContract);
        NameContract.methods.transfer(Contract.upsocial_wallet, (token * 1000000000000000000).toString()).send({ from: userData.wallet })
            .then(function (receipt) {
                console.log(receipt);
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
                formData['transaction'] = transaction;
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
                })
            }, function (error) {
                Loader(false);
                ErrorToast(error.message);
                console.log(error);
            });


    }


    //console.log(element);
    //var aDay = 24 * 60 * 60 * 1000;
    //var timeResult = Session.convertTime(new Date(element.createdDate - aDay));

    var current = new Date();
    var timeResult;
    if (element != null) {
        //console.log(element);
        timeResult = Session.timeDifference(current, element.createdDate);
        // console.log(timeResult + " ago");
    }



    const deletePost = (event, postId) => {
        Loader(true);
        event.preventDefault();
        let user = Session.getSessionData();
        if (user == null) {

            history.push('/auth/login');
            return null;
        }
        httpClient.call("delete-post/" + postId, null, { method: 'DELETE' }).then(function (response) {
            Loader(false);
            if (response.success) {
                SuccessToast(response.result.message);
                window.location.reload();
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    }

    const claimPost = (event, postid) => {
        Loader(true);
        event.preventDefault();

        let user = Session.getSessionData();
        if (user == null) {

            history.push('/auth/login');
            return null;
        }
        let formData = {
            "id": postid
        }

        httpClient.call("claim-post", formData, { method: 'POST' }).then(function (response) {
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


    return (


        <>
            {/* reward popup start start */}
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
                                                max="50" id="transfertokenvalue"

                                            />

                                        </div>
                                    </div>



                                </div><br />



                                <div className="text-center">
                                    <button type="button" className="btn btn-danger"
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


            {/* main content start */}
            <main className="main-content mx-auto">
                <div className="tb-content-wrapper ">

                    <div className="cmn-card shadow-gray-point-3  mb-4">
                        <div className="post-wrapper post-type-one">
                            <div className="post-header">

                                {/*   <div className="elementory-avater-wrap">
                                    <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater"> {element.postedBy.image != null ? <img src={"https://ipfs.io/ipfs/" + element.postedBy.image} alt="" /> : <img src="img/dol-1.png" alt="" />}
                                    </a>

                                    <span>Posted by u/{element.postedBy.userName} {timeResult}
                                    </span>

                                </div> */}
                                <div className="elementory-avater-wrap">
                                    <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater">
                                        {element !== null ?
                                            [(element.postedBy.image != null ?
                                                <img src={"https://ipfs.io/ipfs/" + element.postedBy.image} alt="" /> : <img src="img/dol-1.png" alt="" />
                                            )]
                                            :
                                            <img src="img/dol-1.png" alt="" />
                                        }</a>
                                    <span>Posted by u/ <a href="#" style={{ color: "black" }} onClick={(event) => userView(event, element.postedBy.userName)}>{element !== null ? element.postedBy.userName : null}</a> {timeResult}
                                    </span>

                                </div>

                                {/* <div className="post-header-right" hidden>
                                    
                                    <div className="dropdown">
                                        <button className="post-dropdown" type="button" id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="img/three-dot.svg" alt="" />
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Action</a></li>
                                            <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Another action</a></li>
                                            <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Something else here</a></li>
                                        </ul>
                                    </div>
                                </div> */}

                                {element !== null ? <div>


                                    {userData && userData.id == element.postedBy.id ?
                                        <div className="post-header-right" >
                                            {/*  <div className="post-time"> {timeResult} </div> */}
                                            <div className="dropdown">
                                                <button className="post-dropdown" type="button" id="dropdownMenuButton1"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    <img src="img/three-dot.svg" alt="" />
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li hidden><a className="dropdown-item" href="#" onClick={(event) => editPost(event, element.id)}>Edit</a></li>
                                                    <li ><a className="dropdown-item" href="#" onClick={(event) => deletePost(event, element.id)} style={{ color: 'red' }}>Delete</a></li>

                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        <div className="post-header-right" >
                                            {/*  <div className="post-time">{timeResult}</div> */}
                                            <div className="dropdown">
                                                <button className="post-dropdown" type="button" id="dropdownMenuButton1"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    <img src="img/three-dot.svg" alt="" />
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a className="dropdown-item" href="/" onClick={(event) => claimPost(event, element.id)}>Claim Post</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    }

                                </div> : null}
                            </div>
                            <div className="post-content-wrapper">



                                {element != null ? <>

                                    <div className="post-content max-520">
                                        <p > <a href="/" onClick={(event) => { navigate(event) }} style={{ fontSize: "20px", color: "inherit", textDecoration: "inherit", wordWrap: "break-word", width: "100%" }}>
                                            {element.name}
                                        </a> </p>
                                    </div>

                                    {(() => {



                                        switch (element.type) {

                                            case 'image':

                                                return (

                                                    <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                                        <img src={"https://ipfs.io/ipfs/" + element.data} alt=""
                                                            style={{
                                                                width: '100%',
                                                                maxHeight: '100vh',
                                                                objectFit: "cover",
                                                            }} />
                                                    </a>

                                                )

                                            case 'video':

                                                return (
                                                    /* 
                                                                                                    <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                                                                                        <video controls width="100%" height="auto">
                                                                                                            <source src={"https://ipfs.io/ipfs/" + element.data} type="audio/mpeg" />
                                                                                                        </video>
                                                                                                    </a> */


                                                    <HoverVideoPlayer
                                                        videoSrc={"https://ipfs.io/ipfs/" + element.data}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%'
                                                        }}
                                                        controls
                                                        /*  restartOnPaused
                                                         volume={0.5}
                                                         muted={false} */
                                                        /*  hoverOverlay={
                                                             <div className="hover-overlay">
                                                               <h1>Video Title</h1>
                                                               <p>
                                                                 Here is a short description of the video.
                                                                 You can still see the video playing underneath this overlay.
                                                                 <a href="/video-page">Click here to read more</a>
                                                               </p>
                                                             </div>
                                                           } */
                                                        /* pausedOverlay={
                                                            <img
                                                                src={"https://ipfs.io/ipfs/" + element.data}
                                                                alt=""
                                                                style={{
                                                                    // Make the image expand to cover the video's dimensions
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit: "cover",
                                                                }}
                                                            />
                                                        } */
                                                        loadingOverlay={
                                                            <div className="loading-overlay">
                                                                <div className="loading-spinner" />
                                                            </div>
                                                        }
                                                    />

                                                )

                                            case 'audio':

                                                return (

                                                    <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                                        <audio controls>
                                                            <source src={"https://ipfs.io/ipfs/" + element.data} type="audio/mpeg" />
                                                        </audio>
                                                    </a>
                                                )


                                            case 'text':

                                                return (

                                                    <div className="post-content max-520">
                                                        <ReactQuill readOnly={true}
                                                            theme=""/*   theme={"bubble"} */ value={element.data} />

                                                    </div>
                                                )
                                            default:

                                                return (


                                                    <div className="post-content max-520" >
                                                        <ReactQuill readOnly={true}
                                                            theme="" value={element.data} />
                                                        {/*  <div className="preview" dangerouslySetInnerHTML={createMarkup(element.data)}></div> */}
                                                    </div>

                                                )

                                        }
                                    })()}
                                </>
                                    :
                                    <></>}

                                {element !== null ?
                                    <>

                                        <div className="post-crud-wrap max-520 d-flex justify-content-between">
                                            <ul className="p-curd-left likeUnlike-wrap">

                                                {element !== null ? <>
                                                    <li><button id={"likes" + element.id} className={"action-type-one " + true} onClick={(event) => { toggleLike(event, element.id) }}><span className="like"><i
                                                        className="fal fa-arrow-alt-up"></i></span>{likesCount}</button></li>
                                                    <li><button id={"dislikes" + element.id} className={"action-type-one " + false} onClick={(event) => { toggleDisLike(event, element.id) }}><span className="unlike"><i
                                                        className="fal fa-arrow-alt-down"></i></span>{dislikesCount}</button></li>
                                                </> : null
                                                }
                                            </ul>
                                            <ul className="p-curd-right">
                                                <li><span style={{ color: '#FF416C' }}>{element.commentCount}</span> &nbsp;<button data-bs-toggle="collapse" data-bs-target="#comment-1" id="comment-1-button"
                                                ><img src="img/sms.svg" alt="" /></button></li>
                                                <li><button data-toggle="modal" data-target="#myModal1">  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ color: '#FF416C' }} fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
                                                    <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                                                    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                                                </svg></button></li>
                                                <li><button onClick={(event) => promotePost(event, element.id)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ color: '#FF416C' }} fill="currentColor" className="bi bi-graph-up" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                                </svg></button></li>
                                                <li hidden><button onClick={(event) => { savedPost(event, element.id) }}  ><img src="img/badge.svg" alt="" /></button></li>
                                            </ul>
                                        </div>

                                        <form className="post-coment-form max-520 collapse" id="comment-1">
                                            <div className="input-wrapper">
                                                <input type="text" className="form-control ht-50 design-2 design-3"
                                                    placeholder="Add new comment p" onChange={(event) => { setCommentMessage(event.target.value) }} />
                                            </div>
                                            <div className="submit-comment">
                                                <p></p>
                                                <button className="btn gradient-bg-one radius-30 f-bold post-comment"

                                                    onClick={(event) => { saveParentComment(event, element.id) }}
                                                >Post
                                                    Comment</button>
                                            </div>
                                        </form>
                                    </> : null}
                                <div className="all-comments-wrapper max-520">
                                    <div className="comments-crud-wrap">
                                        {/*  <h1>{commentCount} Comments </h1> */}

                                        {/*  <h1>{commentCount} Comments <span className="page-counter">Page 1 of 5</span></h1>
 */}

                                        <div className="nav nav-tabs comment-new-old-switch" role="tablist" hidden>
                                            <button id="newestComment-tab" data-bs-toggle="tab"
                                                data-bs-target="#newestComment" role="tab" aria-selected="true"
                                                className="switch active">Newest</button>
                                            <button id="oldestComment-tab" data-bs-toggle="tab"
                                                data-bs-target="#oldestComment" role="tab" aria-selected="false"
                                                className="switch">Oldest</button>
                                        </div>
                                    </div>

                                    <div className="tab-content comment-tab-content" id="commentTabContent">
                                        <div className="tab-pane fade show active" id="newestComment" role="tabpanel"
                                            aria-labelledby="newestComment-tab">
                                            <ul className={"comments-dispaly"}>
                                                <Comments originalCommentData={commentData} commentData={commentData} isParent={true} saveChildComment={saveChildComment} setCommentMessage={setCommentMessage} element={element} />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>

    )
}
export default PostDetails;