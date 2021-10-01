import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import httpClient from '../../services/http';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import Session from '../../utils/session';
import _ from 'underscore';
import HoverVideoPlayer from 'react-hover-video-player';


/* var commentData = [
    {
        "commentId": 8,
        "comment": "mai",
        "userId": 1,
        "userName": "KD",
        "parentId": 2,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 7,
        "comment": "grand mother",
        "userId": 1,
        "userName": "KD",
        "parentId": 2,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 6,
        "comment": "grand father",
        "userId": 1,
        "userName": "KD",
        "parentId": 2,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 5,
        "comment": "trunks",
        "userId": 1,
        "userName": "KD",
        "parentId": 2,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 4,
        "comment": "Bullama",
        "userId": 1,
        "userName": "KD",
        "parentId": 2,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 3,
        "comment": "Gohan",
        "userId": 1,
        "userName": "KD",
        "parentId": 1,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 2,
        "comment": "Vegita",
        "userId": 1,
        "userName": "KD",
        "parentId": 0,
        "childIds": [
            4,
            5,
            6,
            7,
            8
        ],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 1,
        "comment": "Goku",
        "userId": 1,
        "userName": "KD",
        "parentId": 0,
        "childIds": [
            3
        ],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    }
] */
const PostDetails = (props) => {

    const history = useHistory();
    const location = useLocation();
    const [element, setDetails] = useState(null);
    let [isLike, setIsLike] = useState(false);
    let [isDisLike, setIsDisLike] = useState(false);
    let [likesCount, setLikesCount] = useState(0);
    let [dislikesCount, setDisLikesCount] = useState(0);
    let [commentData, setCommentData] = useState(null);
    var likeCount = 0;
    var dislikeCount = 0;

    useEffect(() => {
        getPostDetails(location.state.detail);
    }, []);

    const navigate = (event) => {
        event.preventDefault()
    }

    const toggleLike = () => {
        setIsLike(!isLike);
        setIsDisLike(false)
    }
    const toggleDisLike = () => {
        setIsLike(false);
        setIsDisLike(!isDisLike)
    }

    let likeClass = isLike ? 'active' : null;
    let disLikeClass = isDisLike ? 'active' : null;




    const getPostDetails = (postid) => {
        httpClient.call("get-post-details/" + postid, null, { method: 'GET' }).then(function (response) {
            if (response.success) {
                //console.log(response);
                setDetails(response.result.data);
                setAttribute(response.result.data);
                setComment(response.result.data);
                //SuccessToast(response.    result.message);
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
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
                    if (element.likes[i].status == true) {
                        likeCount++;
                    } else {
                        dislikeCount++;
                    }

                    if (user !== null) {
                        if (user.id === element.likes[i].likedBy.id) {
                            if (element.likes[i].status == true) {
                                document.getElementById("likes" + element.id).click();
                            }
                            else {
                                document.getElementById("dislikes" + element.id).click();
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


    return (

        <main className="main-content mx-auto">
            <div className="tb-content-wrapper ">

                <div className="cmn-card shadow-gray-point-3  mb-4">
                    <div className="post-wrapper post-type-one">
                        <div className="post-header">
                            <div className="elementory-avater-wrap">
                                <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater">
                                    {element !== null ?
                                        [(element.postedBy.image != null ?
                                            <img src={"https://ipfs.io/ipfs/" + element.postedBy.image} alt="" /> : <img src="img/dol-1.png" alt="" />
                                        )]
                                        :
                                        <img src="img/dol-1.png" alt="" />
                                    }</a>
                                <h6>
                                    <a href="/" onClick={(event) => navigate(event)} >
                                        {element !== null ? element.name : null}
                                    </a> <span>Posted by  {element !== null ? element.postedBy.userName : null}
                                    </span>
                                </h6>
                            </div>

                            <div className="post-header-right" hidden>
                                <div className="post-time">{/* {element.agoTime} */}</div>
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
                            </div>
                        </div>
                        <div className="post-content-wrapper">

                            {element != null ? <>

                                {(() => {



                                    switch (element.type.toUpperCase()) {

                                        case 'IMAGE':

                                            return (

                                                <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                                    <img src={"https://ipfs.io/ipfs/" + element.data} alt="" />
                                                </a>

                                            )

                                        case 'VIDEO':

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

                                        case 'AUDIO':

                                            return (

                                                <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                                    <audio controls>
                                                        <source src={"https://ipfs.io/ipfs/" + element.data} type="audio/mpeg" />
                                                    </audio>
                                                </a>
                                            )


                                        case 'Text':

                                            return (

                                                <div className="post-content max-520">
                                                    <ReactQuill readOnly={true}
                                                        theme={"bubble"} value={element.data} />

                                                </div>
                                            )
                                        default:

                                            return (

                                                null

                                            )

                                    }
                                })()}
                            </>
                                :
                                <>No record</>}

                            {element !== null ?
                                <>

                                    <div className="post-crud-wrap max-520 d-flex justify-content-between">
                                        <ul className="p-curd-left likeUnlike-wrap">

                                            {element !== null ? <>
                                                <li><button id={"likes" + element.id} className={"action-type-one " + likeClass} onClick={() => { toggleLike() }}><span className="like"><i
                                                    className="fal fa-arrow-alt-up"></i></span>{likesCount}</button></li>
                                                <li><button id={"dislikes" + element.id} className={"action-type-one " + disLikeClass} onClick={() => { toggleDisLike() }}><span className="unlike"><i
                                                    className="fal fa-arrow-alt-down"></i></span>{dislikesCount}</button></li>
                                            </> : null
                                            }
                                        </ul>
                                        <ul className="p-curd-right">
                                            <li><button data-bs-toggle="collapse" data-bs-target="#comment-1"
                                                onClick={(event) => { navigate(event) }}
                                            ><img
                                                    src="img/sms.svg" alt="" /></button></li>

                                            <li><button><img src="img/badge.svg" alt="" /></button></li>
                                        </ul>
                                    </div>

                                    <form className="post-coment-form max-520 collapse" id={"comment-" + element.id}>
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
                                        <ul className="comments-dispaly">
                                            {commentData && commentData.length > 0 &&

                                                commentData.map((commentElement, index) => {
                                                    if (commentElement.parentId != 0) return null;

                                                    return (
                                                        <li key={index}>
                                                            <div className="elementory-avater-wrap single-comment">
                                                                <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater"><img
                                                                    src="img/dol-1.png" alt="" /></a>
                                                                <div className="comment-part">
                                                                    <h6><strong>Posted by</strong><a href="/" onClick={(event) => navigate(event)}>{commentElement.user.name}</a>{/* <span>{commentElement.createDate}</span> */}</h6>
                                                                    <div className="comment-text">
                                                                        <p>{commentElement.comment}</p>
                                                                    </div>

                                                                    <div className="reply-or-report-btn d-flex justify-content-end">
                                                                        <button className="reply" data-bs-toggle="collapse"
                                                                            data-bs-target={"#reply-" + commentElement.id}>Reply</button>
                                                                        <button className="report" hidden>Report</button>
                                                                    </div>

                                                                    <form action="#" className="reply-form collapse" id={"reply-" + commentElement.id}>
                                                                        <textarea className="form-control reply-textarea" name="reply-comment" id="reply-comment"></textarea>
                                                                        <div className="text-end mt-3">
                                                                            <button type="submit" className="btn gradient-bg-one radius-30 f-bold reply-post">Post</button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            {commentElement.childIds && commentElement.childIds.length > 0 &&
                                                                <ul className="nested-comment">
                                                                    {
                                                                        commentElement.childIds.map((childElement, key) => {
                                                                            let index = _.findIndex(commentData, { id: childElement });
                                                                            let replyElement = commentData[index];
                                                                            return (
                                                                                <li key={key}>
                                                                                    <div className="elementory-avater-wrap single-comment">
                                                                                        <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater"><img
                                                                                            src="img/dol-1.png" alt="" /></a>
                                                                                        <div className="comment-part">
                                                                                            <h6><strong>Posted by</strong><a href="/" onClick={(event) => navigate(event)}>{replyElement.postedBy}</a>{/* <span>{replyElement.createDate}</span> */}</h6>
                                                                                            <div className="comment-text">
                                                                                                <p>{replyElement.comment}</p>
                                                                                            </div>

                                                                                            <div
                                                                                                className="reply-or-report-btn d-flex justify-content-end">
                                                                                                <button className="reply" data-bs-toggle="collapse"
                                                                                                    data-bs-target={"#nestedOne-reply-" + replyElement.id}>Reply</button>
                                                                                                <button className="report" hidden>Report</button>
                                                                                            </div>

                                                                                            <form action="#" className="reply-form collapse" id={"nestedOne-reply-" + replyElement.id}>
                                                                                                <textarea className="form-control reply-textarea" name="reply-comment" id="reply-comment"></textarea>
                                                                                                <div className="text-end mt-3">
                                                                                                    <button type="submit" className="btn gradient-bg-one radius-30 f-bold reply-post">Post</button>
                                                                                                </div>
                                                                                            </form>
                                                                                        </div>
                                                                                    </div>

                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            }

                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>



    )
}
export default PostDetails;