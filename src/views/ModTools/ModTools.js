import React, { useEffect } from 'react';
import PostList from './../Home/PostList';



const ModTools = (props) => {


    let pt = props.postData;
    console.log(pt);


    return (
        <main class="main-content mx-auto">
            <div class="cmn-card shadow-gray-point-3 mb-4">
                <div class="group-joined-wrapper">
                    <div class="joined-flex-wrapper">
                        <div class="user type-3">
                            <div class="avater position-relative">
                                <img class="img-fluid" src="img/user.png" alt="" />
                                <label class="position-absolute upload type-2">
                                    <input type="file" name="" id="" />
                                    <img src="img/folder.svg" alt="" />
                                </label>
                            </div>
                            <h5><a href="#" class="d-inline-block">heyderbeutiful <span
                                        class="position-absolute status joined">Joined</span></a> <span
                                    class="sub">r/heyderbeautiful</span>
                            </h5>
                        </div>

                        <div class="mod-tools">
                            <a class="active" href="mod-tools.html"><svg width="17" height="20" viewBox="0 0 17 20"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.00158 4.81213C3.8003 4.76371 6.16572 3.8344 8.19728 2C10.2217 3.8171 12.5966 4.77523 15.4095 4.80291C15.4238 5.0312 15.4451 5.23182 15.4462 5.43244C15.4486 6.90595 15.4534 8.37831 15.4462 9.85183C15.4285 13.8965 12.4842 17.7671 8.50982 18.9616C8.32277 19.0181 8.08481 19.01 7.89775 18.9523C3.84647 17.691 1.01105 13.9092 1.00158 9.76766C0.998027 8.1431 1.00158 6.51855 1.00158 4.81213Z"
                                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" />
                                </svg>
                                Mod Tools</a>
                        </div>
                    </div>

                    <div class="hide-group">
                        <p>HIde Group</p>
                        <div class="toggle-switch">
                            <input type="checkbox" id="toggleAll" />
                            <label for="toggleAll"></label>
                        </div>
                    </div>

                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <button class="accordion-btn" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Edit permissions
                            </button>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div class="group-permission-wrapper">
                                        <p class="like-title">Who can post to this group?</p>
                                        <div class="search-input">
                                            <input type="text" class="form-control" placeholder="Only you can post" />
                                            <ul class="search-suggestion">
                                                <li class="active"><a href="#">Only you can post</a></li>
                                                <li><a href="#">Followers can post</a></li>
                                            </ul>
                                        </div>

                                        <div class="twin-btn type-5 d-flex align-items-center justify-content-end">
                                            <a href="#" class="btn style-2 transparent-bg proxima-bold">Cancel</a>
                                            <a href="#" class="btn primary-bg ms-3 proxima-bold">Update permissions</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-btn collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Enable editors
                            </button>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div class="group-permission-wrapper">
                                        <div class="with-plus-grid">
                                            <div class="search-input">
                                                <input type="text" class="form-control" placeholder="Account address" />
                                                <ul class="search-suggestion">
                                                    <li><a href="#">Only you can post</a></li>
                                                    <li><a href="#">Followers can post</a></li>
                                                </ul>
                                            </div>

                                            <button class="edit-plus"><img src="img/plus-4.svg" alt="" /></button>
                                        </div>
                                        <p class="search-note">We support addresses of any Substrate-based chain: Polkadot,
                                            kusama, Acala,
                                            Plasma, Edgeware, etc.</p>

                                        <div class="twin-btn type-5 d-flex align-items-center justify-content-end">
                                            <a href="#" class="btn style-2 transparent-bg proxima-bold">Cancel</a>
                                            <a href="#" class="btn primary-bg ms-3 proxima-bold">Update editors</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-btn collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Transfer ownership
                            </button>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div class="group-permission-wrapper">
                                        <p class="like-title">Account address of a new owner:</p>
                                        <div class="search-input">
                                            <input type="text" class="form-control" placeholder="Account address" />
                                            <ul class="search-suggestion">
                                                <li><a href="#">Only you can post</a></li>
                                                <li><a href="#">Followers can post</a></li>
                                            </ul>
                                        </div>

                                        <div class="twin-btn type-5 d-flex align-items-center justify-content-end">
                                            <a href="#" class="btn style-2 transparent-bg proxima-bold">Cancel</a>
                                            <a href="#" class="btn primary-bg ms-3 proxima-bold">Update permissions</a>
                                        </div>
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

export default ModTools;
