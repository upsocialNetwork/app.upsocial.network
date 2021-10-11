import PostList from './PostList';
import GroupList from './GroupList';
import { useLocation, useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import httpClient from '../../services/http';
import { ErrorToast, SuccessToast } from '../../utils/common';

const Search = (props) => {
    const params = useParams();
    const history = useHistory();
    const location = useLocation();

    let [groups, setGroups] = useState('');
    let [posts, setPosts] = useState('');
    let [userss, setUsers] = useState('');
    useEffect(() => {

        if (!params.search) {
            history.push("/auth/login");
        } else {
            //console.log(params.search);
            getResult(params.search);
        }
    }, []);

    useEffect(() => {
        if (!params.search) {
            history.push("/auth/login");
        } else {
            //console.log(params.search);
            getResult(params.search);
        }
    }, [params.search]);

    const getResult = (param) => {
        httpClient.call("search/" + param, null, { method: 'GET' }).then(function (response) {
            console.log(response);

            if (response.result.data.Groups !== null) {
                setGroups(response.result.data.Groups);
            }

            if (response.result.data.Posts !== null) {
                setPosts(response.result.data.Posts);
            }

            SuccessToast(response.result.message);
        }, function (error) {
            console.log(error);
        })
    }


    return (
        <main className="main-content mx-auto">
            {/* <div className="cmn-card shadow-gray-point-2 mb-4">
                <div className="total-search-result-count-wraper">
                    <h4>Vaccine <span>Search result</span></h4>
                    <ul className="share-and-count">
                        <li><button className="result-count">14</button></li>
                        <li><button><img src="img/share.png" alt="" /></button></li>
                    </ul>
                </div>
            </div> */}

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="posts-tab" data-bs-toggle="tab" data-bs-target="#posts"
                        type="button" role="tab" aria-controls="posts" aria-selected="true">Posts</button>
                </li>
                {/* <li className="nav-item" role="presentation">
                    <button className="nav-link" id="group-list-tab" data-bs-toggle="tab" data-bs-target="#group-list"
                        type="button" role="tab" aria-controls="profile" aria-selected="false">Groups</button>
                </li> */}

            </ul>
            <div className="tab-content mb-4" id="myTabContent">
                <PostList postlist={posts} />
                {/* <GroupList postlist={groups} /> */}
            </div>
        </main>
    );
}

export default Search;
