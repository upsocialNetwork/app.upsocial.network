import React from 'react';

const PostAttributes = (props) => {

    let element = props.postData;

    return (
        <>
            <div className="post-crud-wrap max-520 d-flex justify-content-between">
                <ul className="p-curd-left">
                    <li><button className="action-type-one"><span className="like"><i className="fal fa-arrow-alt-up"></i></span>{element.likes}</button></li>
                    <li><button className="action-type-one"><span className="unlike"><i className="fal fa-arrow-alt-down"></i></span>{element.dislikes}</button></li>
                </ul>
                <ul className="p-curd-right">
                    <li><button data-bs-toggle="collapse" data-bs-target={"#comment-"+element.id}><img src="img/sms.svg" alt="" /></button></li>
                    <li><button><img src="img/star.svg" alt="" /></button></li>
                    <li><button><img src="img/share.png" alt="" /></button></li>
                    <li><button><img src="img/badge.svg" alt="" /></button></li>
                </ul>
            </div>

            <form className="post-coment-form max-520 collapse" id={"comment-"+element.id}>
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
