import React, { useEffect, useState } from 'react';
import PostList from './../Home/PostList';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import httpClient from '../../services/http';
import Select from 'react-select';
import { useStore } from 'react-redux';
import { ErrorToast, SuccessToast } from '../../utils/common';


const ModTools = (props) => {

    const history = useHistory();
    const location = useLocation();
    let [data, setData] = useState('');
    let [groupId, setGroupId] = useState('');
    let [transferOwner, setTransferOwner] = useState('');
    let [owner, setOwner] = useState('');
    let [moderator, setModerator] = useState('');


    useEffect(() => {
        if (location === null) {
            history.push("/auth/login");
        }

        setGroupId(location.state.detail.id);
        setData(location.state.detail);
        getMembersList(location.state.detail.id);
    }, []);

    const navigate = (event) => {
        event.preventDefault();
    }


    const getMembersList = (groupid) => {
        httpClient.call("get-group-memebers/" + groupid, null, { method: 'GET' }).then(function (response) {
            if (response.success == false) {
                console.log(response);

            }
            else {
                let rs = response && response.result.data ? response.result.data : [];
                document.getElementById("transfer-ownership").innerHTML = "";
                var x = document.getElementById("transfer-ownership");
                var option = document.createElement("option");
                option.text = "Select Account";
                x.add(option);


                document.getElementById("member-owner").innerHTML = "";
                var x1 = document.getElementById("member-owner");
                var option1 = document.createElement("option");
                option1.text = "Select Account";
                x1.add(option1);

                document.getElementById("member-moderator").innerHTML = "";
                var x2 = document.getElementById("member-moderator");
                var option2 = document.createElement("option");
                option2.text = "Select Account";
                x2.add(option2);

                var owner1 = document.getElementById('member-owner');
                var moderator1 = document.getElementById('member-moderator');
                var select = document.getElementById('transfer-ownership');
                for (var i = 0; i < rs.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = rs[i].user.id;
                    opt.innerHTML = rs[i].user.email + " [" + rs[i].role + "] ";
                    select.appendChild(opt);
                }
                for (var i = 0; i < rs.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = rs[i].user.id;
                    opt.innerHTML = rs[i].user.email + " [" + rs[i].role + "] ";
                    moderator1.appendChild(opt);
                }
                for (var i = 0; i < rs.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = rs[i].user.id;
                    opt.innerHTML = rs[i].user.email + " [" + rs[i].role + "] ";
                    owner1.appendChild(opt);
                }
            }

        }, function (error) {
            console.log(error);
        })
    }


    const transferOwnership = (event) => {
        event.preventDefault();
        let formData = {
            "groupId": groupId,
            "userId": transferOwner
        }
        console.log(formData);
        httpClient.call("transfer-ownership", formData, { method: 'POST' }).then(function (response) {
            if (response.success == true) {
                SuccessToast(response.result.message);
                history.push({
                    pathname: '/group/details',
                    search: '?id=' + groupId + '',
                    state: { detail: groupId }
                });
            }
            else {
                console.log(response);
                ErrorToast(response.result.message);
            }
        }, function (error) {
            console.log(error);
        })
    }

    const makeOwner = (event) => {
        event.preventDefault();
        let formData = {
            "groupId": groupId,
            "userId": owner
        }
        console.log(formData);
        httpClient.call("make-owner", formData, { method: 'POST' }).then(function (response) {
            if (response.success == true) {
                SuccessToast(response.result.message);
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            console.log(error);
        })
    }

    const makeModerator = (event) => {
        event.preventDefault();
        let formData = {
            "groupId": groupId,
            "userId": moderator
        }
        console.log(formData);
        httpClient.call("make-moderator", formData, { method: 'POST' }).then(function (response) {
            if (response.success == true) {
                SuccessToast(response.result.message);
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            console.log(error);
        })
    }




    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <div className="group-joined-wrapper">
                    <div className="joined-flex-wrapper">
                        <div className="user type-3">
                            <div className="avater position-relative">

                                {data !== null ?
                                    <img className="img-fluid" src={"https://ipfs.io/ipfs/" + data.image} alt="" /> : <img className="img-fluid" src="img/dol-1.png" alt="" />}


                                {/* <label className="position-absolute upload type-2">
                                    <input type="file" name="" id="" />
                                    <img src="img/folder.svg" alt="" />
                                </label> */}
                            </div>
                            <h5><a href="#" onClick={(event) => { navigate(event) }} className="d-inline-block">{data !== null ? data.name : null} <span
                                className="position-absolute status joined">Edit</span></a> {/* <span
                                    className="sub">r/heyderbeautiful</span> */}
                            </h5>
                        </div>

                        {/* <div className="mod-tools">
                            <a className="active" href="mod-tools.html"><svg width="17" height="20" viewBox="0 0 17 20"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.00158 4.81213C3.8003 4.76371 6.16572 3.8344 8.19728 2C10.2217 3.8171 12.5966 4.77523 15.4095 4.80291C15.4238 5.0312 15.4451 5.23182 15.4462 5.43244C15.4486 6.90595 15.4534 8.37831 15.4462 9.85183C15.4285 13.8965 12.4842 17.7671 8.50982 18.9616C8.32277 19.0181 8.08481 19.01 7.89775 18.9523C3.84647 17.691 1.01105 13.9092 1.00158 9.76766C0.998027 8.1431 1.00158 6.51855 1.00158 4.81213Z"
                                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" />
                                </svg>
                                Mod Tools</a>
                        </div> */}
                    </div>

                    {/* <div className="hide-group">
                        <p>HIde Group</p>
                        <div className="toggle-switch">
                            <input type="checkbox" id="toggleAll" />
                            <label for="toggleAll"></label>
                        </div>
                    </div> */}

                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item" >
                            <button className="accordion-btn" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Owners
                            </button>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="group-permission-wrapper">
                                        <p className="like-title">Make new owner </p>
                                        <div className="search-input">
                                            <select className="form-select" id="member-owner"
                                                onChange={(event) => { setOwner(event.target.value) }}
                                            >
                                                <option value="0">Select Account</option>
                                            </select>
                                        </div>

                                        <div className="twin-btn type-5 d-flex align-items-center justify-content-end">
                                            <button className="btn primary-bg ms-3 proxima-bold" type="button"
                                                onClick={(event) => { makeOwner(event) }}

                                                disabled={!(owner)}>
                                                Update Changes
                                            </button> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item" >
                            <button className="accordion-btn collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Moderators
                            </button>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="group-permission-wrapper">
                                        <p className="like-title">Make new owner </p>
                                        <div className="search-input">
                                            <select className="form-select" id="member-moderator"
                                                onChange={(event) => { setModerator(event.target.value) }}
                                            >
                                                <option value="0">Select Account</option>
                                            </select>
                                        </div>

                                        <div className="twin-btn type-5 d-flex align-items-center justify-content-end">
                                            <button className="btn primary-bg ms-3 proxima-bold" type="button"
                                                onClick={(event) => { makeModerator(event) }}

                                                disabled={!(moderator)}>
                                                Update Changes
                                            </button> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <button className="accordion-btn collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Transfer ownership
                            </button>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="group-permission-wrapper">
                                        <p className="like-title">Account address of a new owner:</p>
                                        <div className="search-input">
                                            <select className="form-select" id="transfer-ownership"
                                                onChange={(event) => { setTransferOwner(event.target.value) }}
                                            >
                                                <option value="0">Select Account</option>
                                            </select>

                                        </div>

                                        <div className="twin-btn type-5 d-flex align-items-center justify-content-end">
                                            <button className="btn primary-bg ms-3 proxima-bold" type="button"
                                                onClick={(event) => { transferOwnership(event) }}

                                                disabled={!(transferOwner)}
                                            >
                                                Update Changes
                                            </button>
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
