import React, { useEffect, useState } from 'react';
import Session from '../../utils/session';
import GroupList from './GroupList';
import { useHistory } from 'react-router-dom';
import { convertCompilerOptionsFromJson } from 'typescript';
import httpClient from '../../services/http';
import { useSelector } from 'react-redux';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';


const Search = (props) => {
    const history = useHistory();
    let [groupList, setGroupList] = useState();

    useEffect(() => {
        const userData = Session.getSessionData();
        if (!userData) {
            history.push('/auth/login');
        }
        else {
            getGroupList(userData.id);
        }
    }, []);

    

    const getGroupList = (userid) => {
        Loader(true);
        httpClient.call("get-user-group/" + 1, null, { method: 'GET' }).then(function (response) {
            Loader(false);
            setGroupList(response);
            if (response.success == false) {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
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
                        type="button" role="tab" aria-controls="profile" aria-selected="false">Groups</button>
                </li>
            </ul>
            <div className="tab-content mb-4" id="myTabContent">
                <GroupList groupsList={groupList} />
            </div>
        </main>
    );
}

export default Search;
