import React, { useEffect } from 'react';
import ImagePost from './ImagePost';
import SponseredPost from './SponseredPost';
import LinkPost from './LinkPost';

const postData = [
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
    } ,
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
        linkDetails:{
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

const PostList = () => {

    

    return (
        <div className="tb-content-wrapper">
            {postData && postData.length > 0 &&
                postData.map((element, index) => {
                    switch(element.type) {
                        case "IMAGE_POST":   return <ImagePost postData={element} />;
                        case "SPONSERED_POST": return <SponseredPost postData={element} />;
                        case "LINK_POST":  return <LinkPost postData={element} />;                
                        default: return <ImagePost postData={element} />;
                      }
                })
            }
        </div>
    );
}

export default PostList;
