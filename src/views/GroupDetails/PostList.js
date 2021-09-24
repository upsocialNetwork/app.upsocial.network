import React, { useEffect, useState } from 'react';
import ImagePost from './ImagePost';







const PostList = (props) => {

    let postData = props.postlist ? props.postlist : [];



    /*  let postData = props.postlist && props.postlist.result && props.postlist.result.data ? props.postlist.result.data : [];
     */ //console.log(postData);
    const navigate = (event) => {
        event.preventDefault()
    }



    return (

        <div className="tb-content-wrapper ">
            {postData && postData.length > 0 ?
                postData.map((element, index) => {
                    switch (element.postType) {
                        case "image": return <ImagePost key={index} postData={element} />;
                        case "video": return <ImagePost key={index} postData={element} />;
                        case "text": return <ImagePost key={index} postData={element} />;
                        default: return <ImagePost key={index} postData={element} />;
                    }
                }) : <div className="cmn-card shadow-gray-point-3  mb-4">
                    <div className="post-wrapper post-type-one">
                        <div className="post-header">
                        </div>
                        <div className="post-content-wrapper">
                            <div className="post-content max-520">
                                <div className="no-post-design">
                                    <img src="img/q-1.svg" alt="" />
                                    <p>No posts yet</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default PostList;
