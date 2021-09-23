import React, { useEffect, useState } from 'react';
import ImagePost from './ImagePost';
import SponseredPost from './SponseredPost';
import LinkPost from './LinkPost';

/* const postData = [
   {
       id: 1,
       title: "/Genshin_Impact: Genshin Impact Official",
       postedBy: 'u/Shade_39',
       agoTime: '8 Hrs ago',
       description: 'My school memories commented long back never unserstood why it took so long while walking on the shore in hot sand and cold water striking just above me',
       image: 'img/post-1.jpg',
       likes: 2200,
       dislikes: 2200,
       favorite: true,
       type: 'IMAGE_POST',
       commentCount: 50
   },
   {
       id: 2,
       title: "/Genshin_Impact: Genshin Impact Official",
       postedBy: 'u/Shade_39',
       agoTime: '8 Hrs ago',
       description: 'My school memories commented long back never unserstood why it took so long while walking on the shore in hot sand and cold water striking just above me',
       image: 'img/post-1.jpg',
       likes: 2200,
       dislikes: 2200,
       favorite: true,
       type: 'IMAGE_POST',
       commentCount: 50
   },
   {
       id: 3,
       title: "Elementry",
       subTitle: 'Sponsered',
       postedBy: '',
       agoTime: '8 Hrs ago',
       description: 'Avail 50-80% Off* for this Raksha Bandhan only at #Elementry! Shop NOW!',
       media: [{
           title: 'Earthen Curd Pot',
           image: 'img/img-1.jpg'
       },
       {
           title: 'Earthen Curd Pot',
           image: 'img/img-1.jpg'
       },
       {
           title: 'Earthen Curd Pot',
           image: 'img/img-1.jpg'
       }],
       type: 'SPONSERED_POST'
   },
   {
       id: 4,
       title: "/Genshin_Impact: Genshin Impact Official",
       postedBy: 'u/Shade_39',
       agoTime: '8 Hrs ago',
       description: 'My school memories commented long back never unserstood why it took so long while walking on the shore in hot sand and cold water striking just above me',
       image: 'img/post-2.jpg',
       linkDetails: {
           domain: 'youtube.com',
           title: 'Sri Aurobindo: A New Dawn| Official Trailer| Stuido xyz',
           description: 'Presenting the official trailer of sri Aurbindo A new dawn an animation film'
       },
       likes: 2200,
       dislikes: 2200,
       favorite: true,
       type: 'LINK_POST',
       commentCount: 50
   },
]
*/






const PostList = (props) => {

     let postData = props.postlist && props.postlist.result && props.postlist.result.data ? props.postlist.result.data : [];

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
