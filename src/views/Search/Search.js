import React, { useEffect } from 'react';

import PostList from './PostList';
import GroupList from './GroupList';




const Search = (props) => {





    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-2 mb-4">
                <div className="total-search-result-count-wraper">
                    <h4>Vaccine <span>Search result</span></h4>
                    <ul className="share-and-count">
                        <li><button className="result-count">14</button></li>
                        <li><button><img src="img/share.png" alt="" /></button></li>
                    </ul>
                </div>
            </div>

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="posts-tab" data-bs-toggle="tab" data-bs-target="#posts"
                        type="button" role="tab" aria-controls="posts" aria-selected="true">Posts</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="group-list-tab" data-bs-toggle="tab" data-bs-target="#group-list"
                        type="button" role="tab" aria-controls="profile" aria-selected="false">Groups and users</button>
                </li>
            </ul>
            <div className="tab-content mb-4" id="myTabContent">
                    <PostList />
                    <GroupList />
            </div>
        </main>
    );
}

export default Search;
