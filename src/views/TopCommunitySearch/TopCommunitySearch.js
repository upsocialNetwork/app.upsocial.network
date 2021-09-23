import React, { useEffect, useState } from 'react';
import Session from '../../utils/session';
import GroupList from './GroupList';
import { useHistory } from 'react-router-dom';
import { convertCompilerOptionsFromJson } from 'typescript';
import httpClient from '../../services/http';
import { useSelector } from 'react-redux';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';


const TopCommunitySearch = (props) => {
    const history = useHistory();
    let [groupList, setGroupList] = useState();

    useEffect(() => {

        getGroupList();

    }, []);

    const getGroupList = () => {

        httpClient.call("get-top-groups/1", null, { method: 'GET' }).then(function (response) {
            setGroupList(response);
            if (response.success == false) {
                ErrorToast(response.result.message);
            }
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
                    <button className="nav-link active" id="group-list-tab" data-bs-toggle="tab" data-bs-target="#group-list"
                        type="button" role="tab" aria-controls="profile" aria-selected="false">Today's Top Growing in Groups</button>
                </li>
            </ul>
            <div className="tab-content mb-4" id="myTabContent">
                <GroupList groupsList={groupList} />
            </div>
        </main>
    );
}

export default TopCommunitySearch;
