import { useEffect, useState } from 'react';
//import { useSelector } from 'react-redux';
import { useLocation, useParams } from "react-router-dom";
import httpClient from '../../services/http';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import { useHistory } from 'react-router-dom';
import PostList from './PostList';
import Session from '../../utils/session';
import InfiniteScroll from 'react-infinite-scroller';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';


const UserView = props => {

    const history = useHistory();

    const location = useLocation();
    const [details, setDetails] = useState();
    const [posts, setPosts] = useState();
    const [loginuser, setUserData] = useState();
    const [isHide, setHide] = useState(false);


    const params = useParams();

    useEffect(() => {
        if (!params.userName) {
            history.push("/auth/login");
        } else {
            getUserDetails(params.userName);
        }
    }, [params.userName]);

    const getUserDetails = (userName) => {
        Loader(true);
        httpClient.call("view-profile/" + userName, null, { method: 'GET' }).then(function (response) {
            Loader(false);
            if (response.success) {
                setDetails(response)
                getUserPosts(1, params.userName)

                let user = Session.getSessionData();
                if (user.id === response.result.data.id) {
                    //console.log(isHide);
                    setHide(true);
                    //console.log(isHide);
                }


            }
            else {
                history.push("/");
                //ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    }


    const navigate = (event) => {
        event.preventDefault();
    }


    let result = details && details.result && details.result.data ? details.result.data : [];
    // console.log(result);



    const loadFunc = (page) => {
        if (page > 5) return false
        let isLogin = Session.getSessionData();
        if (isLogin == null) {
            history.push("/auth/login");
        } else {
            getUserPosts(page, params.userName)
        }
    }


    const getUserPosts = (page, userName) => {
        Loader(true);
        httpClient.call("get-user-post/" + page + "/" + userName, null, { method: 'GET' }).then(function (response) {
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

    let pt = posts && posts.result && posts.result.data ? posts.result.data : [];
    //console.log(pt);




    const followOrunfollow = (event, userId, type) => {
        Loader(true);
        event.preventDefault();
        if (type == true) {
            //leaving group
            let formData = {
                "followingUserId": userId
            }
            httpClient.call("unfollow-user", formData, { method: 'POST' }).then(function (response) {
                Loader(false);
                if (response.success) {
                    SuccessToast(response.result.message);
                    getUserDetails(params.userName);
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
                "followingUserId": userId
            }
            httpClient.call("follow-user", formData, { method: 'POST' }).then(function (response) {
                Loader(false);
                if (response.success) {
                    SuccessToast(response.result.message);
                    getUserDetails(params.userName);
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


    return (
        <>
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
                                    <a href="#" onClick={(event) => { followOrunfollow(event, result.id, result.followed) }} className="d-inline-block">r/{result.userName} &nbsp;&nbsp;&nbsp;


                                        {isHide === true ? null :

                                            <span className="position-absolute status joined" id="followuserdiv">    &nbsp;{result.followed == true ? "UnFollow" : "follow"}</span>
                                        }
                                    </a> <span
                                        className="sub">{result.firstName != null ? result.firstName : "Na"} {result.lastName != null ? result.lastName : "Na"}</span>



                                    {/* 
                                    <a href="#" onClick={(event) => { followOrunfollow(event, result.id, result.followed) }} className="d-inline-block " >
                                        <span
                                            className="status joined" style={{ textDecoration: 'none' }}>

                                            {result && result.joined ? <>Unfollow</> : <>Follow</>}
                                        </span>
                                    </a> */}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                            role="tab" aria-controls="home" aria-selected="true">Latest</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                            role="tab" aria-controls="profile" aria-selected="false">Most Liked</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                            role="tab" aria-controls="contact" aria-selected="false">Most Promoted</button>
                    </li>
                </ul> */}
                {/*  <div className="cmn-card shadow-gray-point-2 mb-4">
                    <div className="create-post">
                        <div className="no-post-design">
                            <img src="img/q-1.svg" alt="" />
                            <p>Post's Loading..</p>
                        </div>
                    </div>
                </div> */}

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
                                            <p>Upsocial gets better when you join communities, so find some that you’ll love!</p>
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
                                            <p>Upsocial gets better when you join communities, so find some that you’ll love!</p>
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
                                            <p>Upsocial gets better when you join communities, so find some that you’ll love!</p>
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
            <div className="right-sidebar-wrapper position-fixed d-none d-lg-block">
                <div className="sidebar-inner scroll-bar">
                    <div className="shadow-gurd">
                        <div className="cmn-card shadow-gray-point-2 mb-4">
                            <div className="groups-wrapper about-group">
                                <h4 className="cmn-card-title">About Group</h4>
                                <div className="groups-inner-wrapper">
                                    <ReactQuill readOnly={true}
                                        theme="" value={result.about} />

                                    <div className="member-status">
                                        <p><span>{result.totalFollowers}</span> Followers</p>
                                        <p><span>{result.totalFollowings}</span> Following</p>
                                    </div>
                                    <hr />
                                    <div className="member-status">

                                        <p><span>{result.groupCount}</span> Group's</p>
                                        <p><span>{result.postCount}</span> Post's</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </>

    );
}


export default UserView;