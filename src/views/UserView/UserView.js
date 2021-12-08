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
                //console.log(response);
            }
            else {
                ErrorToast(response.result.message);
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
                                <h5><a href="#" onClick={(event) => { navigate(event) }} class="d-inline-block">{result.firstName != null ? result.firstName : "Na"} {result.lastName != null ? result.lastName : "Na"} &nbsp;<span
                                    class="position-absolute status joined">   &nbsp;{result.followed == true ? "UnFollow" : "follow"}</span></a> <span
                                        class="sub">r/{result.userName}</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                            role="tab" aria-controls="home" aria-selected="true">Latest</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                            role="tab" aria-controls="profile" aria-selected="false">Most Liked</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                            role="tab" aria-controls="contact" aria-selected="false">Most Promoted</button>
                    </li>
                </ul>
                <div class="cmn-card shadow-gray-point-2 mb-4">
                    <div class="create-post">
                        <div class="no-post-design">
                            <img src="img/q-1.svg" alt="" />
                            <p>Post's Loading..</p>
                        </div>
                    </div>
                </div>
            </main>
            <div class="right-sidebar-wrapper position-fixed d-none d-lg-block">
                <div class="sidebar-inner scroll-bar">
                    <div class="shadow-gurd">
                        <div class="cmn-card shadow-gray-point-2 mb-4">
                            <div class="groups-wrapper about-group">
                                <h4 class="cmn-card-title">About Group</h4>
                                <div class="groups-inner-wrapper">
                                    <ReactQuill readOnly={true}
                                        theme="" value={result.about} />

                                    <div class="member-status">
                                        <p><span>{result.totalFollowers}</span> Followers</p>
                                        <p><span>{result.totalFollowings}</span> Following</p>
                                    </div>
                                    <hr />
                                    <div class="member-status">

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