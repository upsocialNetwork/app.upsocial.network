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
                }) : null
            }
        </div>
    );
}

export default PostList;
