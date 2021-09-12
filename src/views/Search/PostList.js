import React, { useEffect, useState } from 'react';
import ImagePost from './ImagePost';
import SponseredPost from './SponseredPost';
import LinkPost from './LinkPost';



const PostList = (props) => {

    let postData = props.postlist && props.postlist.result && props.postlist.result.data ? props.postlist.result.data : [];


    return (
        <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
            <div className="tb-content-wrapper">

                <div className="cmn-card shadow-gray-point-2 mb-4">
                    <div className="post-wrapper post-type-search">
                        <div className="post-header">
                            <div className="elementory-avater-wrap">
                                <a href="#" className="elemetory-avater"> <img src="img/gp-1.jpg" alt="" /></a>
                                <h6><a href="#">Purvi Sharma</a><span>Friend</span></h6>
                            </div>
                        </div>
                        <div className="post-content-wrapper">
                            <p className="date-in-horizontal"><span>28 Jun</span> Quite a Perspective coming from a
                                rationalist</p>
                            <div className="post-after-search-g-wrap">
                                <div className="af-g-left">
                                    <h6>Love Post</h6>
                                    <p>My school memories commented long back never unserstood why it
                                        took so long while walking on the shore unserstood why it took so
                                        long while walking on the </p>
                                </div>
                                <div className="af-g-right">
                                    <img className="img-fluid" src="img/sp-1.png" alt="" />
                                </div>
                            </div>
                            <div className="post-crud-wrap d-flex justify-content-between">
                                <ul className="p-curd-left">
                                    <li><button className="action-type-one"><span className="like"><i
                                                    className="fal fa-arrow-alt-up"></i></span>2200</button></li>
                                    <li><button className="action-type-one"><span className="unlike"><i
                                                    className="fal fa-arrow-alt-down"></i></span>2200</button></li>
                                </ul>
                                <ul className="p-curd-right">
                                    <li><button data-bs-toggle="collapse" data-bs-target="#comment-1"><img
                                                src="img/sms.svg" alt="" /></button></li>
                                    <li><button><img src="img/star.svg" alt="" /></button></li>
                                    <li><button><img src="img/share.png" alt="" /></button></li>
                                    <li><button><img src="img/badge.svg" alt="" /></button></li>
                                </ul>
                            </div>

                            <form className="post-coment-form collapse" id="comment-1" >
                                <div className="input-wrapper">
                                    <input type="text" className="form-control ht-50 design-2 design-3"
                                        placeholder="Add new comment" />
                                </div>
                                <div className="submit-comment">
                                    <p>Receive comment notifications</p>
                                    <button className="btn primary-bg f-bold post-comment">Post
                                        Comment</button>
                                </div>
                            </form>
                        </div> 
                    </div>
                </div>

                <div className="cmn-card shadow-gray-point-2 mb-4">
                    <div className="post-wrapper post-type-search">
                        <div className="post-header">
                            <div className="elementory-avater-wrap">
                                <a href="#" className="elemetory-avater"> <img src="img/gp-1.jpg" alt="" /></a>
                                <h6><a href="#">Purvi Sharma <small className="pointer"><img
                                                src="img/pointer.svg" alt="" /></small> Nuri
                                        singh</a><span>Friend</span></h6>
                            </div>
                        </div>
                        <div className="post-content-wrapper">
                            <p className="date-in-horizontal"><span>28 Jun</span> Airtel network problem.......</p>
                        </div> 
                    </div>
                </div>

                <div className="cmn-card shadow-gray-point-2 mb-4">
                    <div className="post-wrapper post-type-search">
                        <div className="post-header">
                            <div className="elementory-avater-wrap">
                                <a href="#" className="elemetory-avater"> <img src="img/gp-1.jpg" alt="" /></a>
                                <h6><a href="#">Purvi Sharma</a><span>Friend</span></h6>
                            </div>
                        </div>
                        <div className="post-content-wrapper">
                            <p className="date-in-horizontal"><span>28 Jun</span> Quite a Perspective coming from a
                                rationalist</p>
                            <div className="post-after-search-g-wrap">
                                <div className="af-g-left">
                                    <h6>Love Post</h6>
                                    <p>My school memories commented long back never unserstood why it
                                        took so long while walking on the shore unserstood why it took so
                                        long while walking on the </p>
                                </div>
                                <div className="af-g-right position-relative">
                                    <img className="img-fluid" src="img/sp-1.png" alt="" />
                                    <a href="#" className="position-absolute play"><i className="fas fa-play"></i></a>
                                </div>
                            </div>
                            <div className="post-crud-wrap d-flex justify-content-between">
                                <ul className="p-curd-left">
                                    <li><button className="action-type-one"><span className="like"><i
                                                    className="fal fa-arrow-alt-up"></i></span>2200</button></li>
                                    <li><button className="action-type-one"><span className="unlike"><i
                                                    className="fal fa-arrow-alt-down"></i></span>2200</button></li>
                                </ul>
                                <ul className="p-curd-right">
                                    <li><button data-bs-toggle="collapse" data-bs-target="#comment-2"><img
                                                src="img/sms.svg" alt="" /></button></li>
                                    <li><button><img src="img/star.svg" alt="" /></button></li>
                                    <li><button><img src="img/share.png" alt="" /></button></li>
                                    <li><button><img src="img/badge.svg" alt="" /></button></li>
                                </ul>
                            </div>

                            <form className="post-coment-form collapse" id="comment-2" >
                                <div className="input-wrapper">
                                    <input type="text" className="form-control ht-50 design-2 design-3"
                                        placeholder="Add new comment" />
                                </div>
                                <div className="submit-comment">
                                    <p>Receive comment notifications</p>
                                    <button className="btn primary-bg f-bold post-comment">Post
                                        Comment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <div className="cmn-card shadow-gray-point-2 mb-4">
                    <div className="post-wrapper post-type-search">
                        <div className="post-header">
                            <div className="elementory-avater-wrap">
                                <a href="#" className="elemetory-avater"> <img src="img/gp-1.jpg" alt="" /></a>
                                <h6><a href="#">Purvi Sharma</a><span>Friend</span></h6>
                            </div>
                        </div>
                        <div className="post-content-wrapper">
                            <p className="date-in-horizontal"><span>28 Jun</span> Quite a Perspective coming from a
                                rationalist</p>
                            <div className="post-after-search-g-wrap d-block">
                                <div className="af-g-left">
                                    <h6>Love Post</h6>
                                    <p>My school memories commented long back never unserstood why it
                                        took so long while walking on the shore unserstood why it took so
                                        long while walking on the </p>
                                </div>
                            </div>
                            <div className="post-crud-wrap d-flex justify-content-between">
                                <ul className="p-curd-left">
                                    <li><button className="action-type-one"><span className="like"><i
                                                    className="fal fa-arrow-alt-up"></i></span>2200</button></li>
                                    <li><button className="action-type-one"><span className="unlike"><i
                                                    className="fal fa-arrow-alt-down"></i></span>2200</button></li>
                                </ul>
                                <ul className="p-curd-right">
                                    <li><button data-bs-toggle="collapse" data-bs-target="#comment-3"><img
                                                src="img/sms.svg" alt="" /></button></li>
                                    <li><button><img src="img/star.svg" alt="" /></button></li>
                                    <li><button><img src="img/share.png" alt="" /></button></li>
                                    <li><button><img src="img/badge.svg" alt="" /></button></li>
                                </ul>
                            </div>

                            <form className="post-coment-form collapse" id="comment-3">
                                <div className="input-wrapper">
                                    <input type="text" className="form-control ht-50 design-2 design-3"
                                        placeholder="Add new comment" />
                                </div>
                                <div className="submit-comment">
                                    <p>Receive comment notifications</p>
                                    <button className="btn primary-bg f-bold post-comment">Post
                                        Comment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default PostList;
