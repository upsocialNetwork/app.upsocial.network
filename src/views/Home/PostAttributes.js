import React, { useEffect, useState } from 'react';
import Session from '../../utils/session';
import { useHistory } from 'react-router-dom';

const PostAttributes = (props) => {

    const history = useHistory();
    let element = props.postData;


    let [isLike, setIsLike] = useState(false);
    let [isDisLike, setIsDisLike] = useState(false);
    let [likesCount, setLikesCount] = useState(0);
    let [dislikesCount, setDisLikesCount] = useState(0);
    var likeCount = 0;
    var dislikeCount = 0;

    useEffect(() => {

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


    }, []);



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



    const pageDetails = (event) => {
        event.preventDefault();
        const id = element.id;
        let user = Session.getSessionData();
        if (user == null) {

            history.push('/auth/login');
        }
        else {
            history.push({
                pathname: '/post-details',
                search: '?id=' + id + '',
                state: { detail: id }
            });
        }
    }












    return (
        <>

            <div className="post-crud-wrap max-520 d-flex justify-content-between">
                <ul className="p-curd-left likeUnlike-wrap">

                    <li><button id={"likes" + element.id} className={"action-type-one " + likeClass} onClick={() => { toggleLike() }}><span className="like"><i
                        className="fal fa-arrow-alt-up"></i></span>{likesCount}</button></li>
                    <li><button id={"dislikes" + element.id} className={"action-type-one " + disLikeClass} onClick={() => { toggleDisLike() }}><span className="unlike"><i
                        className="fal fa-arrow-alt-down"></i></span>{dislikesCount}</button></li>

                </ul>
                <ul className="p-curd-right">
                    <li><button data-bs-toggle="collapse" data-bs-target="#comment-1"
                        onClick={(event) => { pageDetails(event) }}
                    ><img
                            src="img/sms.svg" alt="" /></button></li>
                    {/*   <li><button><img src="img/star.svg" alt=""/></button></li>
                    <li><button><img src="img/share.png" alt=""/></button></li> */}
                    <li><button><img src="img/badge.svg" alt="" /></button></li>
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
