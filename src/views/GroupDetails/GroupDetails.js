import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from "react-router-dom";
import httpClient from '../../services/http';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import { useHistory } from 'react-router-dom';
import PostList from './PostList';
import Session from '../../utils/session';
import InfiniteScroll from 'react-infinite-scroller';

const CreateGroupJoin = (props) => {
    const history = useHistory();

    const location = useLocation();
    const [details, setDetails] = useState();
    const [posts, setPosts] = useState();

    const params = useParams();

    useEffect(() => {
        if (!params.name) {
            history.push("/auth/login");
        } else {

            var id = sessionStorage.getItem("GETGROUPDETAILS");
            getGroupDetails(id);
        }
    }, []);

    useEffect(() => {
        if (!params.name) {
            history.push("/auth/login");
        } else {
            var id = sessionStorage.getItem("GETGROUPDETAILS");
            getGroupDetails(id);
        }
    }, [sessionStorage.getItem("GETGROUPDETAILS")]);

    const createPost = (event, id, name) => {
        event.preventDefault();
        name = name.replace(/ /g, "_");
        sessionStorage.setItem("CREATEGROUPPOSTID", id);
        sessionStorage.setItem("CREATEGROUPPOSTNAME", name);
       
        history.push('/create-group-post/' + name);
    }

    const modTools = (event) => {
        event.preventDefault();
        let dt = details && details.result && details.result.data ? details.result.data : [];

        var name = result.name.replace(/ /g, "_");
        sessionStorage.setItem("GETMODTOOLGROUPDETAILS", dt.id);
        // history.push('/mod-tools/' + name);




        history.push({
            pathname: '/mod-tools/' + name,
            /*  search: '?id=' + dt.id + '',*/
            state: { detail: dt }
        });
    }

    const joinOrLeaveGroup = (event, groupid, type) => {
        Loader(true);
        event.preventDefault();
        if (type == true) {
            //leaving group
            let formData = {
                "groupId": groupid
            }
            httpClient.call("leave-group", formData, { method: 'POST' }).then(function (response) {
                Loader(false);
                if (response.success) {
                    SuccessToast(response.result.message);
                    getGroupDetails(params.id);
                    //window.location.reload();
                }
                else {
                    ErrorToast(response.result.message);
                }

            }, function (error) {
                Loader(false);
                console.log(error);
            });

        }
        else {
            //group
            //leaving group
            let formData = {
                "groupId": groupid
            }
            httpClient.call("join-group", formData, { method: 'POST' }).then(function (response) {
                Loader(false);
                if (response.success) {
                    SuccessToast(response.result.message);
                    getGroupDetails(params.id);
                    //window.location.reload();
                }
                else {
                    ErrorToast(response.result.message);
                }

            }, function (error) {
                Loader(false);
                console.log(error);
            });
        }

    }

    const navigate = (event) => {
        event.preventDefault();
    }

    const getGroupDetails = (groupid) => {
        Loader(true);
        httpClient.call("get-group-details/" + groupid, null, { method: 'GET' }).then(function (response) {
            Loader(false);
            if (response.success) {
                getGroupPosts(1, groupid);
                setDetails(response)
                let result = response && response.result && response.result.data ? response.result.data : [];
                // console.log(result);
                let user = Session.getSessionData();
                // console.log(response);
                if (user.id === response.result.data.owner.id) {
                    //console.log("mode display");
                    document.getElementById('mod-tools').style.display = 'inline';
                }
                else {

                    if (response.result.data.joined) {
                        if (response.result.data.role.toUpperCase() === "MODERATOR" || response.result.data.role.toUpperCase() === "OWNER") {
                            document.getElementById('mod-tools').style.display = 'inline';
                        }
                        else {
                            document.getElementById('mod-tools').style.display = 'none';
                        }
                    } else {
                        document.getElementById('mod-tools').style.display = 'none';
                    }

                }

            }
            else {

                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    }

    const getGroupPosts = (pageno, groupid) => {
        Loader(true);

        httpClient.call("get-group-post/" + pageno + "/" + groupid, null, { method: 'GET' }).then(function (response) {
            Loader(false);
            if (response.success) {
                setPosts(response)
            }
            else {
                // ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    }

    let result = details && details.result && details.result.data ? details.result.data : [];
    let pt = posts && posts.result && posts.result.data ? posts.result.data : [];
    /*  const modToolsEnable = (user, result) => {
         if (user.id === result.owner.id) {
             document.getElementById('mod-tools').style.display = 'inline';
         }
     } */

    const loadFunc = (page) => {
        if (page > 5) return false
        let isLogin = Session.getSessionData();
        if (isLogin == null) {

        } else {
            getGroupPosts(page, params.id)
        }
    }


    return (


        <main className="main-content mx-auto">



            <div className="cmn-card shadow-gray-point-3 mb-4">
                <div className="group-joined-wrapper">
                    <div className="joined-flex-wrapper">
                        <div className="user type-3">
                            <div className="avater position-relative">

                                {result && result.image ? <img className="img-fluid" src={"https://ipfs.io/ipfs/" + result.image} alt="" /> :
                                    <img className="img-fluid" src="img/dol-1.png" alt="" />}


                            </div>
                            <h5>
                                <a href="#" onClick={(event) => { navigate(event) }} className="d-inline-block" style={{ wordWrap: "break-word", width: "400px", marginBottom: "15px" }}>{result && result.name}
                                </a>
                            </h5><br /> <span>{result.members && result.members.length ? result.members.length : 0} Members</span><br />

                            <a href="#" onClick={(event) => { joinOrLeaveGroup(event, result.id, result.joined) }} className="d-inline-block " >
                                <span
                                    className=" status joined" style={{ textDecoration: 'none' }}>

                                    {result && result.joined ? <>Leave</> : <>Join</>}
                                </span>
                            </a>


                        </div>

                        <div className="mod-tools" id="mod-tools" style={{ display: 'none' }}>


                            <a style={{ color: '#FF416C' }} href="#" onClick={(event) => { modTools(event) }}><svg width="17" height="20" viewBox="0 0 17 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg" >
                                <path
                                    d="M1.00158 4.81213C3.8003 4.76371 6.16572 3.8344 8.19728 2C10.2217 3.8171 12.5966 4.77523 15.4095 4.80291C15.4238 5.0312 15.4451 5.23182 15.4462 5.43244C15.4486 6.90595 15.4534 8.37831 15.4462 9.85183C15.4285 13.8965 12.4842 17.7671 8.50982 18.9616C8.32277 19.0181 8.08481 19.01 7.89775 18.9523C3.84647 17.691 1.01105 13.9092 1.00158 9.76766C0.998027 8.1431 1.00158 6.51855 1.00158 4.81213Z"
                                    stroke="#FF416C" strokeWidth="1.5" strokeMiterlimit="10" />
                            </svg>
                                Mod Tools</a>
                        </div>
                    </div>
                </div>
            </div>


            {result && result.joined ?


                <div className="cmn-card shadow-gray-point-2 mb-4">
                    <div className="create-post">

                        <div className="one-auto-g-wrap">
                            <div className="one-icon">
                                <img src="img/fav.ico" alt="" />

                            </div>
                            <div className="input-wrapper">
                                <input className="form-control bg-gray-f6ff shadow-gray-inset-15" type="text"
                                    placeholder="Create Post" onClick={(event) => { createPost(event, result && result.id, result && result.name) }} />
                            </div>
                        </div>

                        <ul className="p-curd-right plc-2 max-520 justify-content-end">
                            <li><button>
                                <label className="upload upload-photo"><input type="file" onClick={(event) => { createPost(event, result && result.id, result && result.name) }} />
                                    <img src="img/c-1.svg" alt="" />
                                </label>
                            </button>
                            </li>
                            <li><button>
                                <label className="upload upload-photo"><input type="file" onClick={(event) => { createPost(event, result && result.id, result && result.name) }} />
                                    <img src="img/c-2.svg" alt="" />
                                </label></button></li>
                            {/*   <li><button><img src="img/c-3.svg" alt="" /></button></li> */}
                        </ul>
                    </div>
                </div>
                : <></>}

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



                                            className="btn gradient-bg-one radius-30 register align-center">No Posts</button>

                                    </div>
                                </div>
                            </div>
                        </div>}

                    </InfiniteScroll>

                </div>

                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
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



                                            className="btn gradient-bg-one radius-30 register align-center">No Posts</button>

                                    </div>
                                </div>
                            </div>
                        </div>}
                    </InfiniteScroll>



                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">


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



                                            className="btn gradient-bg-one radius-30 register align-center">No Posts</button>

                                    </div>
                                </div>
                            </div>
                        </div>}






                    </InfiniteScroll>
                </div>
            </div>

        </main>
    );
}

export default CreateGroupJoin;
