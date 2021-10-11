import React from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion, smartContract } from '../../utils/common';
import { useEffect, useState } from "react";
import Session from "../../utils/session";
import Contract from "../../utils/contract"
import { useHistory } from "react-router-dom";
import ReactQuill from 'react-quill'; // ES6
import httpClient from '../../services/http';
import $ from 'jquery';
import Web3 from 'web3';
const Community = (props) => {



    const history = useHistory();
    let [name, setName] = useState('');
    let [type, setType] = useState('');
    let [isAdult, setAdult] = useState(true);
    let [about, setAbout] = useState('');
    let [image, setImage] = useState('');

    useEffect(() => {
        let userData = Session.isLoggedIn();
        if (!userData) {
            history.push('/auth/login');
        }


    }, []);

    const navigate = (event) => {
        event.preventDefault();
    }
    const createGroup = (event) => {

        let userData = Session.getSessionData();
        if (userData.wallet === null) {
            ErrorToast("Wallet not connectd");
            return null;
        }

        Loader(true);
        event.preventDefault();
        //checkGroupName(name)
        var boolRes = checkGroupName(name);
        if (boolRes === true) {
            console.log("true response");
        }

        /*  httpClient.call('check-group-name', formData1, { method: 'POST' }).then(function (response) {
  
              if (response.success == true) 
              {
                  let smartContractResult = Contract.transfer(userData.wallet);
                  console.log(smartContractResult.status);
                  if (smartContractResult.status === true) {
                      httpClient.call("create-group", formData, { method: 'POST' }).then(function (response) {
                          Loader(false);
                          SuccessToast(response.result.message);
                          history.push('/user/my-groups')
                      }, function (error) {
                          Loader(false);
                          console.log(error);
                      })
  
                  }
                  else {
                      Loader(false);
                      console.log(smartContractResult);
                  }
              }
              else {
                  Loader(false);
                  ErrorToast(response.result.message);
              }
          }, function (error) {
              Loader(false);
              console.log(error);
          })  */

    }

    let checkGroupName = function (name) {

        let formData1 = {
            "name": name
        };
        httpClient.call('check-group-name', formData1, { method: 'POST' }).then(function (response) {
            if (response.success == true) {

                return true;
                /* let userData = Session.getSessionData();
                let smartContractResult = Contract.transfer(userData.wallet);
                console.log(smartContractResult.status);
                let formData = {
                    "name": name,
                    "description": about,
                    "type": type,
                    "nsfw": isAdult,
                    "image": image
                }
                if (smartContractResult.status === true) {
                    httpClient.call("create-group", formData, { method: 'POST' }).then(function (response) {
                        Loader(false);
                        SuccessToast(response.result.message);
                        history.push('/user/my-groups')
                    }, function (error) {
                        Loader(false);
                        console.log(error);
                    })

                }
                else {
                    Loader(false);
                    console.log(smartContractResult);
                } */

            }
            else {
                Loader(false);
                ErrorToast(response.result.message);
                return false;
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })

    }

    /* const checkGroupName = (name) => {
        let formData1 = {
            "name": name
        };
        httpClient.call('check-group-name', formData1, { method: 'POST' }).then(function (response) {
            if (response.success == true) {
                let userData = Session.getSessionData();
                let smartContractResult = Contract.transfer(userData.wallet);
                console.log(smartContractResult.status);
                let formData = {
                    "name": name,
                    "description": about,
                    "type": type,
                    "nsfw": isAdult,
                    "image": image
                }
                if (smartContractResult.status === true) {
                    httpClient.call("create-group", formData, { method: 'POST' }).then(function (response) {
                        Loader(false);
                        SuccessToast(response.result.message);
                        history.push('/user/my-groups')
                    }, function (error) {
                        Loader(false);
                        console.log(error);
                    })

                }
                else {
                    Loader(false);
                    console.log(smartContractResult);
                }

            }
            else {
                Loader(false);
                ErrorToast(response.result.message);

            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    } */


    const convertFileToBase64 = (data) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            var b64 = reader.result.replace(
                /^data:.+;base64,/, '');
            document.getElementById("profileimage").src = reader.result;
            // $("#profileimage").attr('src', reader.result);
            setImage(b64);
            console.log("file converted successfully");
        };
        reader.readAsDataURL(data);
    }

    const convertFile = (file) => {
        if (typeof (file) != "undefined") {
            var size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
            let postType = file.type.substring(0, 5);
            if (size > 2) {
                ErrorToast('Please select file size less than 2 MB');
                return null;
            }
            if (postType == "image") {
                convertFileToBase64(file);
            } else {
                ErrorToast('Please select file size less than 2 MB');
                return null;
            }
        }
        else {
            ErrorToast('Please select file size less than 2 MB');
            return null;
        }

    }



    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <form action="#" className="create-post-form create-group">
                    <h3 className="tertiary-title color-primary position-relative">Create A Group</h3>
                    <div className="create-group-content position-relative">


                        <div className="user-name">
                            <h5>Name <span style={{ color: 'red' }}> * </span></h5>
                            <p>Group names includes only Alphabet.

                            </p>
                        </div>

                        <div className="user-name-change-input">
                            <input type="text" className="form-control" placeholder=""

                                onChange={(event) => { setName(event.target.value) }}

                            />
                        </div>
                        <div className="customize-pf-g-wrap">
                            <div className="pf-lf-part">
                                <h5>Group Avatar <span style={{ color: 'red' }}> * </span></h5>
                            </div>
                            <div className="pf-lr-part grid">
                                <div className="profile-avater size-big position-relative">

                                    <img className="avater-image img-fluid" src="img/dol-1.png" alt="" id="profileimage"

                                    />

                                </div>

                                <div className="upload-banner-img">
                                    <label className="upload type-2">
                                        <input type="file" name="" id="" accept="image/jpg, image/jpeg"
                                            onChange={(event) => { convertFile(event.target.files[0]) }}
                                        />
                                        <img src="img/plus-5.svg" alt="" />
                                    </label>
                                    <p>Drag and Drop or Upload Banner Image </p>
                                </div>

                                <div className="restiction">
                                    <p>Image should be less than 2 MB</p>
                                </div>
                            </div>
                        </div>


                        {/* <div className="post-type-selection">
                            <h4>Group Avtar</h4>
                            <div className="drag-and-drop-div">
                                <img src="img/drag-and-drop.png" alt="" />
                                <label htmlFor="drag" className="drag-and-drop"> 
                            <input className="form-control" type="file" name="file" accept="image/*"

                                onChange={(event) => { convertFile(event.target.files[0]) }}
                            />
                            Choose File 
                             </label>
                            </div> 
                        </div>*/}

                        <div className="post-type-selection">
                            <h4>Group type <span style={{ color: 'red' }}> * </span></h4>
                            <select className="form-control select2" onChange={(event) => { setType(event.target.value) }}>
                                <option defaultValue>Open this select menu</option>
                                <option value="Public" >Public ( Anyone can view, post, and comment to this group )</option>
                                {/*       <option value="Restricted">Restricted ( Anyone can view this group, but only approved users can post)</option>
                                <option value="Private">Private ( Anyone can view, post, and comment to this group)</option>
                          */}   </select>
                        </div>
                        <div className="post-type-selection">
                            <h4>NSFW</h4>
                            <label className="radioBox checkBox">
                                <p>{/* <span className="nsfw">NSFW</span> */} 18+ year old Group</p>
                                <input type="checkbox" name="checkbox" onChange={() => { setAdult(!isAdult) }} defaultChecked={isAdult} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="post-type-selection">

                            <h4>Description <span style={{ color: 'red' }}> * </span></h4>
                            <div className="pf-lr-part">
                                <div className="text-editor-wrapper">

                                    <ReactQuill onChange={(value) => { setAbout(value) }} value={about} />
                                </div>
                            </div>
                        </div>


                        <div className="cmn-rw in-create-post-filed justify-content-end">
                            <div className="twin-btn d-flex align-items-center justify-content-end">
                                {/* <a href="#" className="btn style-2 transparent-bg proxima-bold">Cancel</a> */}
                                <button type="submit" onClick={(event) => { createGroup(event) }} className="btn primary-bg ms-3 proxima-bold"

                                    disabled={!(name && type && image)}
                                >Create Group</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </main>
    );
}

export default Community;
