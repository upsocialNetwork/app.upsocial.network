import React, { useEffect, useState } from 'react';
import Session from '../../utils/session';
import {Loader} from '../../utils/common';
import CreatePostForm from './CreatePostForm';
import PostList from './PostList';
import InfiniteScroll from 'react-infinite-scroller';



const Home = (props) => {


    const gePopularPost = (page) => {
        props._getPopularPost(page);
    }
    const geTimeLinePost = (page) => {
        props._getTimlinePost(page);
    }

    useEffect(() => {
        let isLogin = Session.getSessionData();
        if (isLogin == null) {
            gePopularPost(1)
        }else {
            geTimeLinePost(1)
        }        
    }, [])


    let pt = props.postData;
    Loader(props.requestProcess);

    const loadFunc = (page) =>     {
        if(page > 5) return false
         let isLogin = Session.getSessionData();
        if (isLogin == null) {
            gePopularPost(page)
        }else {
            geTimeLinePost(page)
        }
    }



    return (
        <main className="main-content mx-auto">

            <CreatePostForm />

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                        role="tab" aria-controls="home" aria-selected="false">Latest</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                        role="tab" aria-controls="profile" aria-selected="false">Liked</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                        role="tab" aria-controls="contact" aria-selected="true">Commented</button>
                </li>
            </ul>
            <div className="tab-content  mb-4" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <InfiniteScroll
                    pageStart={1}
                    loadMore={loadFunc}
                    hasMore={props.hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    <PostList type={'Latest'} postlist={pt} />
                </InfiniteScroll>
                    
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <PostList type={'Most Liked'} postlist={pt} />
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <PostList type={'Most Commented'} postlist={pt} />
                </div>
            </div>
        </main>
    );
}

export default Home;
