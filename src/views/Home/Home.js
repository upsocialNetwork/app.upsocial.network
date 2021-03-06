import React, { useEffect, useState } from 'react';
import Session from '../../utils/session';
import { Loader } from '../../utils/common';
import CreatePostForm from './CreatePostForm';
import PostList from './PostList';
import InfiniteScroll from 'react-infinite-scroller';

import { useSelector } from 'react-redux';


const Home = (props) => {


    const wallet = useSelector(state => state.wallet)
    let pt = props.postData;
    Loader(props.requestProcess);

    const loadFunc = (page) => {
        if (page > 5) return false
        let isLogin = Session.getSessionData();
        // if (isLogin == null) {
        //     gePopularPost(page)
        // } else {
        //     geTimeLinePost(page)
        // }
        gePopularPost(page);
    }

    const gePopularPost = (page) => {
        props._getPopularPost(page);
    }
    const geTimeLinePost = (page) => {
        props._getTimlinePost(page);
    }
    useEffect(() => {

        console.log("-----home wallet calling-----");
        console.log(wallet);

        let isLogin = Session.getSessionData();
        if (isLogin == null) {
            gePopularPost(1)
        } else {

            gePopularPost(1)
        }
    }, [])






    return (
        <main className="main-content mx-auto">

            {/*    <CreatePostForm /> */}

            <ul className="nav nav-tabs" id="myTab" role="tablist" hidden>
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

                        {pt.length > 0 ? <PostList type={'Latest'} postlist={pt} /> : <div className="cmn-card shadow-gray-point-3  mb-4">
                            <div className="post-wrapper post-type-one">
                                <div className="post-header">
                                </div>
                                <div className="post-content-wrapper">
                                    <div className="post-content max-520">
                                        <p>Upsocial gets better when you join communities, so find some that you???ll love!</p>
                                        <button type="button"

                                            onClick={() => { gePopularPost(1) }}

                                            className="btn gradient-bg-one radius-30 register align-center">Browse Popular Posts</button>

                                    </div>
                                </div>
                            </div>
                        </div>}

                    </InfiniteScroll>

                </div>






                {/*  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={loadFunc}
                        hasMore={props.hasMore}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {pt.length > 0 ? <PostList type={'Liked'} postlist={pt} /> : <div className="cmn-card shadow-gray-point-3  mb-4">
                            <div className="post-wrapper post-type-one">
                                <div className="post-header">
                                </div>
                                <div className="post-content-wrapper">
                                    <div className="post-content max-520">
                                        <p>Upsocial gets better when you join communities, so find some that you???ll love!</p>
                                        <button type="button"

                                            onClick={() => { gePopularPost(1) }}

                                            className="btn gradient-bg-one radius-30 register align-center">Browse Popular Posts</button>

                                    </div>
                                </div>
                            </div>
                        </div>}
                    </InfiniteScroll>



                </div>
                */} {/* <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">


                    <InfiniteScroll
                        pageStart={1}
                        loadMore={loadFunc}
                        hasMore={props.hasMore}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {pt.length > 0 ? <PostList type={'Commented'} postlist={pt} /> : <div className="cmn-card shadow-gray-point-3  mb-4">
                            <div className="post-wrapper post-type-one">
                                <div className="post-header">
                                </div>
                                <div className="post-content-wrapper">
                                    <div className="post-content max-520">
                                        <p>Upsocial gets better when you join communities, so find some that you???ll love!</p>
                                        <button type="button"

                                            onClick={() => { gePopularPost(1) }}

                                            className="btn gradient-bg-one radius-30 register align-center">Browse Popular Posts</button>

                                    </div>
                                </div>
                            </div>
                        </div>}
                    </InfiniteScroll>
                </div> */}
            </div>






        </main>
    );
}

export default Home;
