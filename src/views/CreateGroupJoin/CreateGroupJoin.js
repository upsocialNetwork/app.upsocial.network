import React, { useEffect } from 'react';




const CreateGroupJoin = (props) => {





    return (
        <main className="main-content mx-auto">


            <div className="cmn-card shadow-gray-point-3 mb-4">
                <div className="group-joined-wrapper">
                    <div className="joined-flex-wrapper">
                        <div className="user type-3">
                            <div className="avater position-relative">
                                <img className="img-fluid" src="img/user.png" alt="" />

                                <label className="position-absolute upload type-2">
                                    <input type="file" name="" id="" />
                                    <img src="img/folder.svg" alt="" />
                                </label>
                            </div>
                            <h5><a href="#" className="d-inline-block">heyderbeutiful <span
                                className="position-absolute status joined">Joined</span></a> <span
                                    className="sub">r/heyderbeautiful</span>


                            </h5>
                        </div>

                        <div className="mod-tools">
                            <a href="mod-tools.html"><svg width="17" height="20" viewBox="0 0 17 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.00158 4.81213C3.8003 4.76371 6.16572 3.8344 8.19728 2C10.2217 3.8171 12.5966 4.77523 15.4095 4.80291C15.4238 5.0312 15.4451 5.23182 15.4462 5.43244C15.4486 6.90595 15.4534 8.37831 15.4462 9.85183C15.4285 13.8965 12.4842 17.7671 8.50982 18.9616C8.32277 19.0181 8.08481 19.01 7.89775 18.9523C3.84647 17.691 1.01105 13.9092 1.00158 9.76766C0.998027 8.1431 1.00158 6.51855 1.00158 4.81213Z"
                                    stroke="black" stroke-width="1.5" stroke-miterlimit="10" />
                            </svg>
                                Mod Tools</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cmn-card shadow-gray-point-2 mb-4">
                <div className="create-post">
                    <div className="no-post-design">
                        <img src="img/q-1.svg" alt="" />
                        <p>No posts yet</p>
                    </div>
                    <div className="one-auto-g-wrap">
                        <div className="one-icon">
                            <img src="img/gp-1.jpg" alt="" />
                        </div>
                        <div className="input-wrapper">
                            <input className="form-control bg-gray-f6ff shadow-gray-inset-15" type="text"
                                placeholder="Create Post" />
                        </div>
                    </div>

                    <ul className="p-curd-right plc-2 max-520 justify-content-end">
                        <li><button>
                            <label className="upload upload-photo"><input type="file" />
                                <img src="img/c-1.svg" alt="" />
                            </label>
                        </button>
                        </li>
                        <li><button>
                            <label className="upload upload-photo"><input type="file" />
                                <img src="img/c-2.svg" alt="" />
                            </label></button></li>
                        <li><button><img src="img/c-3.svg" alt="" /></button></li>
                    </ul>
                </div>
            </div>

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                        role="tab" aria-controls="home" aria-selected="true">Popular</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                        role="tab" aria-controls="profile" aria-selected="false">New</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                        role="tab" aria-controls="contact" aria-selected="false">Rising</button>
                </li>
            </ul>
            <div className="tab-content mb-4" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="tb-content-wrapper">
                        <div className="cmn-card shadow-gray-point-2">
                            <div className="grow-group-content-wrapper">
                                <h4 className="grow-title">Grow your group</h4>

                                <div className="single-grow-wrap">
                                    <div className="s-grow-left">
                                        <button className="round-plus"><img src="img/round-plus.svg" alt="" /></button>
                                    </div>
                                    <div className="s-grow-right">
                                        <h5>Time to make your first post! </h5>
                                        <p>Now that you’ve created your community, start things off right by making
                                            your first post</p>
                                        <a href="#" className="btn style-2 make-post">Make your first post</a>
                                    </div>
                                </div>
                                <div className="single-grow-wrap">
                                    <div className="s-grow-left">
                                        <button className="round-plus"><img src="img/round-plus.svg" alt="" /></button>
                                    </div>
                                    <div className="s-grow-right">
                                        <h5>Recruit more members</h5>
                                        <p>Now that you’ve created your community, start things off right by making
                                            your first post</p>
                                        <a href="#" className="btn style-2 make-post">Make your first post</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="tb-content-wrapper">
                        <div className="cmn-card shadow-gray-point-2">
                            <div className="grow-group-content-wrapper">
                                <h4 className="grow-title">Grow your group</h4>

                                <div className="single-grow-wrap">
                                    <div className="s-grow-left">
                                        <button className="round-plus"><img src="img/round-plus.svg" alt="" /></button>
                                    </div>
                                    <div className="s-grow-right">
                                        <h5>Time to make your first post! </h5>
                                        <p>Now that you’ve created your community, start things off right by making
                                            your first post</p>
                                        <a href="#" className="btn style-2 make-post">Make your first post</a>
                                    </div>
                                </div>
                                <div className="single-grow-wrap">
                                    <div className="s-grow-left">
                                        <button className="round-plus"><img src="img/round-plus.svg" alt="" /></button>
                                    </div>
                                    <div className="s-grow-right">
                                        <h5>Recruit more members</h5>
                                        <p>Now that you’ve created your community, start things off right by making
                                            your first post</p>
                                        <a href="#" className="btn style-2 make-post">Make your first post</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <div className="tb-content-wrapper">
                        <div className="cmn-card shadow-gray-point-2">
                            <div className="grow-group-content-wrapper">
                                <h4 className="grow-title">Grow your group</h4>

                                <div className="single-grow-wrap">
                                    <div className="s-grow-left">
                                        <button className="round-plus"><img src="img/round-plus.svg" alt="" /></button>
                                    </div>
                                    <div className="s-grow-right">
                                        <h5>Time to make your first post! </h5>
                                        <p>Now that you’ve created your community, start things off right by making
                                            your first post</p>
                                        <a href="#" className="btn style-2 make-post">Make your first post</a>
                                    </div>
                                </div>
                                <div className="single-grow-wrap">
                                    <div className="s-grow-left">
                                        <button className="round-plus"><img src="img/round-plus.svg" alt="" /></button>
                                    </div>
                                    <div className="s-grow-right">
                                        <h5>Recruit more members</h5>
                                        <p>Now that you’ve created your community, start things off right by making
                                            your first post</p>
                                        <a href="#" className="btn style-2 make-post">Make your first post</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default CreateGroupJoin;
