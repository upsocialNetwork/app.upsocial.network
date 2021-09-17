import React, { useEffect } from 'react';
import PostList from './../Home/PostList';



const CreatePost = (props) => {


    let pt = props.postData;
    console.log(pt);


    return (
        <main className="main-content mx-auto">
            <div class="cmn-card shadow-gray-point-3 mb-4">
                <form action="#" class="create-post-form">
                    <h3 class="tertiary-title position-relative">Create Post</h3>
                    <div class="post-writter d-flex justify-content-between">
                        <div class="user">
                            <div class="avater">
                                <img class="img-fluid" src="img/user.png" alt="" />
                            </div>
                            <h5><a href="#" class="d-inline-block">u/GalaGames</a>
                            </h5>
                        </div>
                        <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" data-bs-html="true"
                            title="<p>Lorem ipsum dolor sit amet sojeljfla aofdifelfoa dlfjdfowef.</p>">
                            <img src="img/info-icon.svg" alt="" />
                        </button>
                    </div>

                    <div class="post-contents">
                        <ul class="nav nav-tabs types" id="createPost" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="link-tab" data-bs-toggle="tab" data-bs-target="#link"
                                    type="button" role="tab" aria-controls="home" aria-selected="true">LINK</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="text-tab" data-bs-toggle="tab" data-bs-target="#text"
                                    type="button" role="tab" aria-controls="text" aria-selected="false">Text</button>
                            </li>
                        </ul>


                        <div class="tg-grid-wrapper">
                            <div class="tab-content" id="createPost">
                                <div class="tab-pane fade show active" id="link" role="tabpanel"
                                    aria-labelledby="nav-link-tab">
                                    <div class="tb-content">
                                        <div class="tg-g-left links-content-wrap">
                                            <div class="input-wrapper type-2">
                                                <label for="">Username</label>
                                                <div class="two-in-input">
                                                    <select name="#" id="#" class="selection">
                                                        <option value="">Subupsocial</option>
                                                        <option value="">other 2</option>
                                                        <option value="">Subupsocial</option>
                                                    </select>
                                                    <input type="text" class="form-control"
                                                        placeholder="Select Subupsocial" />
                                                </div>
                                            </div>
                                            <div class="input-wrapper type-2">
                                                <label for="">Title</label>
                                                <input type="text" class="form-control" placeholder="Add title" />
                                            </div>
                                            <div class="input-wrapper type-2">
                                                <label for="">URL</label>
                                                <input type="text" class="form-control" placeholder="Entel URL" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="text" role="tabpanel" aria-labelledby="nav-text-tab">
                                    <div class="tb-content">
                                        <div class="text-content-wrap">
                                            <div class="post-title-eidit">
                                                <input type="text" class="form-control" placeholder="Title" />
                                            </div>
                                            <div class="text-editor-wrapper">
                                                <div id="txtEditor"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tg-g-right">
                                <div class="input-wrapper type-2">
                                    <label for="">Attach File</label>
                                    <div class="drag-and-drop-div">
                                        <img src="img/drag-and-drop.png" alt="" />
                                        <label for="drag" class="drag-and-drop">
                                            <input type="file" name="" id="drag" />
                                            Choose File
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cmn-rw in-create-post-filed">
                            <label for="check-1" class="check-box">
                                <input id="check-1" type="checkbox" />
                                <div class="checkbox"><img src="img/checkbox.png" alt="" />
                                    <img class="check-ok" src="img/check-ok.png" alt="" />
                                </div>
                                <p>Send replies to my inbox</p>
                            </label>

                            <div class="twin-btn d-flex align-items-center justify-content-between">
                                <a href="#" class="btn style-2 transparent-bg proxima-bold">Cancel</a>
                                <button type="submit" class="btn primary-bg ms-3 proxima-bold">Post
                                    Now</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                        role="tab" aria-controls="home" aria-selected="false">Popular</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                        role="tab" aria-controls="profile" aria-selected="false">Recommended</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                        role="tab" aria-controls="contact" aria-selected="true">All</button>
                </li>
            </ul>
            <div className="tab-content  mb-4" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <PostList type={'POPULAR'} postlist={pt} />
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <PostList type={'RECOMMENDED'} postlist={pt} />
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <PostList type={'ALL'} postlist={pt} />
                </div>
            </div>
        </main>
    );
}

export default CreatePost;
