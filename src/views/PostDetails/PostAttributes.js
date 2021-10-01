import React, { useState } from 'react';

const PostAttributes = (props) => {

    let element = props.postData;
    // let likes = element.likes;
    let [isLike, setIsLike] = useState(false);
    let [isDisLike, setIsDisLike] = useState(false);
    let [likesCount, setLikesCount] = useState(0);
    let [dislikesCount, setDisLikesCount] = useState(0);



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

    return (
        <>

            <div className="post-crud-wrap max-520 d-flex justify-content-between">
                <ul className="p-curd-left likeUnlike-wrap">
                    <li><button className={"action-type-one " + likeClass} onClick={() => { toggleLike() }}><span className="like"><i
                        className="fal fa-arrow-alt-up"></i></span>{likesCount}</button></li>
                    <li><button className={"action-type-one " + disLikeClass} onClick={() => { toggleDisLike() }}><span className="unlike"><i
                        className="fal fa-arrow-alt-down"></i></span>{dislikesCount}</button></li>
                </ul>
                <ul className="p-curd-right">
                    <li><button data-bs-toggle="collapse" data-bs-target="#comment-1"><img
                        src="img/sms.svg" alt="" /></button></li>
                    {/*   <li><button><img src="img/star.svg" alt=""/></button></li>
                    <li><button><img src="img/share.png" alt=""/></button></li> */}
                    <li><button><img src="img/badge.svg" alt="" /></button></li>
                </ul>
            </div>
            

            <form className="post-coment-form max-520 collapse" id={"comment-" +
                [(element != null ? element.id : 0)]
            }>
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