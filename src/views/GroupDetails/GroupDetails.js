import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import httpClient from '../../services/http';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import { useHistory } from 'react-router-dom';
import PostList from './PostList';
import Session from '../../utils/session';


const CreateGroupJoin = (props) => {
    const history = useHistory();

    const location = useLocation();
    const [details, setDetails] = useState('');

    useEffect(() => {
        getGroupDetails(location.state.detail);
    }, []);



    const getGroupDetails = (groupid) => {
        //console.log('groupid', groupid);

        httpClient.call("get-group-details/" + groupid, null, { method: 'GET' }).then(function (response) {
            if (response.success) {
                setDetails(response)
                SuccessToast(response.result.message);
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            console.log(error);
        })
    }

    const navigate = (event) => {
        event.preventDefault();
    }

    const joinGroup = (event, groupId) => {

        event.preventDefault();
        let login = Session.isLoggedIn();
        if (login) {
            console.log("joining group");
        }
        else {
            history.push("/auth/login");

        }

    }

    const createPost = (event, id) => {
        event.preventDefault();
        history.push({
            pathname: '/create-group-post',
            search: '?id=' + id + '',
            state: { detail: id }
        });
    }

    let result = details && details.result && details.result.data ? details.result.data : [];
    let pt = result.posts ? result.posts : [];


    return (
        <main className="main-content mx-auto">


            <div className="cmn-card shadow-gray-point-3 mb-4">
                <div className="group-joined-wrapper">
                    <div className="joined-flex-wrapper">
                        <div className="user type-3">
                            <div className="avater position-relative">

                                {result && result.avatar ? <img className="img-fluid" src={"https://ipfs.io/ipfs/" + result.avatar} alt="" /> :
                                    <img className="img-fluid" src="img/folder.svg" alt="" />}


                            </div>
                            <h5><a href="#" onClick={(event) => { joinGroup(event, result.id) }} className="d-inline-block">{result && result.name} <span
                                className="position-absolute status joined">Joined</span></a> <span
                                    className="sub">r/{result && result.name}</span>


                            </h5>
                        </div>

                        <div className="mod-tools">
                            <a href="#" onClick={(event) => { navigate(event) }}><svg width="17" height="20" viewBox="0 0 17 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.00158 4.81213C3.8003 4.76371 6.16572 3.8344 8.19728 2C10.2217 3.8171 12.5966 4.77523 15.4095 4.80291C15.4238 5.0312 15.4451 5.23182 15.4462 5.43244C15.4486 6.90595 15.4534 8.37831 15.4462 9.85183C15.4285 13.8965 12.4842 17.7671 8.50982 18.9616C8.32277 19.0181 8.08481 19.01 7.89775 18.9523C3.84647 17.691 1.01105 13.9092 1.00158 9.76766C0.998027 8.1431 1.00158 6.51855 1.00158 4.81213Z"
                                    stroke="black" strokeWidth="1.5" strokeMiterlimit="10" />
                            </svg>
                                Mod Tools</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cmn-card shadow-gray-point-2 mb-4">
                <div className="create-post">

                    <div className="one-auto-g-wrap">
                        <div className="one-icon">
                            <img src="img/gp-1.jpg" alt="" />
                        </div>
                        <div className="input-wrapper">
                            <input className="form-control bg-gray-f6ff shadow-gray-inset-15" type="text"
                                placeholder="Create Post" onClick={(event) => { createPost(event, result && result.id) }} />
                        </div>
                    </div>

                    <ul className="p-curd-right plc-2 max-520 justify-content-end">
                        <li><button>
                            <label className="upload upload-photo"><input type="file" onClick={(event) => { createPost(event, result && result.id) }} />
                                <img src="img/c-1.svg" alt="" />
                            </label>
                        </button>
                        </li>
                        <li><button>
                            <label className="upload upload-photo"><input type="file" onClick={(event) => { createPost(event, result && result.id) }} />
                                <img src="img/c-2.svg" alt="" />
                            </label></button></li>
                        <li><button><img src="img/c-3.svg" alt="" /></button></li>
                    </ul>
                </div>
            </div>

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                        role="tab" aria-controls="home" aria-selected="false">Latest</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                        role="tab" aria-controls="profile" aria-selected="false">Most Liked</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                        role="tab" aria-controls="contact" aria-selected="true">Most Commented</button>
                </li>
            </ul>
            <div className="tab-content  mb-4" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <PostList type={'Latest'} postlist={pt} />
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

export default CreateGroupJoin;
