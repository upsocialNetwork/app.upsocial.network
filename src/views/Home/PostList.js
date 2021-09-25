import React, { useEffect, useState } from 'react';
import ImagePost from './ImagePost';
import SponseredPost from './SponseredPost';
import LinkPost from './LinkPost';








const PostList = (props) => {

     let postData = props.postlist ? props.postlist : [];
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
                                <p>Upsocial gets better when you join communities, so find some that you’ll love!</p>
                                <button type="button" className="btn gradient-bg-one radius-30 register align-center">Browse Popular Posts</button>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default PostList;
