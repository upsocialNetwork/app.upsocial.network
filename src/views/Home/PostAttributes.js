import React, { useEffect, useState } from 'react';
import Session from '../../utils/session';
import { useHistory } from 'react-router-dom';
import httpClient from '../../services/http';
import { Loader, ErrorToast, SuccessToast } from '../../utils/common';

const PostAttributes = (props) => {

    const history = useHistory();
    let element = props.postData;


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



    const pageDetails = (event) => {

        event.preventDefault();
        const id = element.id;
        let user = Session.getSessionData();
        if (user == null) {
            history.push('/auth/login');
        }
        else {
            history.push({
                pathname: '/post-details/' + id,
                state: { detail: id }
            });
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

        httpClient.call("promote-post", formData, { method: 'POST' }).then(function (response) {
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


    const giveAward = (event, postId) => {
        event.preventDefault();
        /* let user = Session.getSessionData();
        if (user == null) {

            history.push('/auth/login');
            return null;
        } */
        //console.log("give award");
        SuccessToast("Award successfully transfered");
        document.getElementById('modal-closed').click();
        //$('#modal-closed').click();
    }


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
                                    USN &nbsp;100
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

            <div className="post-crud-wrap max-520 d-flex justify-content-between">
                <ul className="p-curd-left likeUnlike-wrap">

                    <li>
                        <button id={"likes" + element.id} className={"action-type-one " + likeClass} onClick={(event) => { toggleLike(event, element.id) }}><span className="like"><i
                            className="fal fa-arrow-alt-up"></i></span>{likesCount}</button></li>
                    <li><button id={"dislikes" + element.id} className={"action-type-one " + disLikeClass} onClick={(event) => { toggleDisLike(event, element.id) }}><span className="unlike"><i
                        className="fal fa-arrow-alt-down"></i></span>{dislikesCount}</button></li>

                </ul>
                <ul className="p-curd-right">
                    <li><button data-bs-toggle="collapse" data-bs-target="#comment-1"
                        onClick={(event) => { pageDetails(event) }}
                    ><img src="img/sms.svg" alt="" /></button></li>

                    {userData !== null ?
                        <li><button data-toggle="modal" data-target="#myModal1">  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ color: '#FF416C' }} fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
                            <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                        </svg></button></li>
                        : <></>}



                    <li><button onClick={(event) => promotePost(event, element.id)}><img src="img/share.png" alt="" /></button></li>
                    <li hidden><button onClick={(event) => { savedPost(event, element.id) }}  ><img src="img/badge.svg" alt="" /></button></li>
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
