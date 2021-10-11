import React from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import { useEffect, useState } from "react";
import Session from "../../utils/session";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from 'react-quill'; // ES6
import httpClient from '../../services/http';
import { useLocation } from "react-router-dom";
import Contract from "../../utils/contract";
import Web3 from 'web3';
import $ from 'jquery';
const EditGroup = (props) => {

    const history = useHistory();
    const location = useLocation();
    const params = useParams();

    let [name, setName] = useState('');
    let [type, setType] = useState('');
    let [isAdult, setAdult] = useState(true);
    let [about, setAbout] = useState('');
    let [image, setImage] = useState('');
    let [previmage, setprevImage] = useState('');

    let [id, setId] = useState('');

    useEffect(() => {
        if (!params.groupId) {
            history.push("/auth/login");
        } else {
            getGroupDetails(params.groupId);
        }
    }, []);
    useEffect(() => {
        if (!params.groupId) {
            history.push("/auth/login");
        } else {
            getGroupDetails(params.groupId);
        }
    }, [params.groupId]);

    const navigate = (event) => {
        event.preventDefault();
    }
    const updateGroup = (event) => {
        Loader(true);
        event.preventDefault();
        let formData = {
            "id": id,
            "name": name,
            "description": about,
            "type": type,
            "nsfw": isAdult,
            "image": image
        }

        event.preventDefault();
        httpClient.call('check-edit-group-name', formData, { method: 'POST' }).then(function (response) {
            if (response.success == true) {
                let userData = Session.getSessionData();
                Web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
                window.ethereum.enable();
                const NameContract = new Web3.eth.Contract(Contract.contract_abi, Contract.contract_address);
                NameContract.methods.transfer(Contract.upsocial_wallet, "1").send({ from: userData.wallet })
                    .then(function (receipt) {
                        console.log(receipt);
                        httpClient.call('update-group', formData, { method: 'PUT' }).then(function (response) {
                            Loader(false);
                            if (response.success) {
                                SuccessToast(response.result.message);
                                history.push("/user/my-groups");
                            }
                            else {
                                ErrorToast(response.result.message);
                            }

                        }, function (error) {
                            Loader(false);
                            ErrorToast(error.result.message);
                        })
                    }, function (error) {
                        console.log(error);
                    });
            }
            else {
                Loader(false);
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })

    }

    const convertFileToBase64 = (data) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            var b64 = reader.result.replace(
                /^data:.+;base64,/, '');
            document.getElementById("profile-image1").src = reader.result;
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
            $("#div1").attr("hidden", true);
            $("#div2").attr("hidden", false);
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

    const getGroupDetails = (groupid) => {
        Loader(true);
        httpClient.call("get-group-details/" + groupid, null, { method: 'GET' }).then(function (response) {
            if (response.success) {


                $("#div1").attr("hidden", false);

                let result = response && response.result && response.result.data ? response.result.data : [];
                // console.log(result);
                setId(result.id);
                setName(result.name);
                setType(result.type);
                setAbout(result.description);
                setprevImage(result.image);
                setImage(result.image);
                setAdult(result.nsfw);
                if (result.nsfw == true) {
                    $("#nsfw").prop("checked", true);
                }
                else {
                    $("#nsfw").prop("checked", false);
                }

            }
            else {

                ErrorToast(response.result.message);
                history.push("/");
            }
            Loader(false);
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    }

    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <form action="#" className="create-post-form create-group">
                    <h3 className="tertiary-title color-primary position-relative">Edit A Group</h3>
                    <div className="create-group-content position-relative">


                        <div className="user-name">
                            <h5>Name <span style={{ color: 'red' }}> * </span></h5>
                            <p>Group names includes only Alphabet.

                            </p>
                        </div>

                        <div className="user-name-change-input">
                            <input type="text" className="form-control" placeholder=""
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}

                            />
                        </div>
                        <div className="customize-pf-g-wrap">
                            <div className="pf-lf-part">
                                <h5>Group Avtar <span style={{ color: 'red' }}> * </span></h5>
                            </div>
                            <div className="pf-lr-part grid" id="div1" hidden>
                                <div className="profile-avater size-big position-relative" >
                                    <img className="avater-image img-fluid" src={"https://ipfs.io/ipfs/" + previmage} alt="" id="profile-image" />
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

                            <div className="pf-lr-part grid" id="div2" hidden>
                                <div className="profile-avater size-big position-relative" >
                                    <img className="avater-image img-fluid" src="img/dol-1.png" alt="" id="profile-image1" />
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
                            <h4>Group type<span style={{ color: 'red' }}> * </span></h4>
                            <select className="form-control select2" value={type} onChange={(event) => { setType(event.target.value) }}>
                                <option defaultValue>Open this select menu</option>
                                <option value="Public" >Public ( Anyone can view, post, and comment to this group )</option>
                                {/*       <option value="Restricted">Restricted ( Anyone can view this group, but only approved users can post)</option>
                                <option value="Private">Private ( Anyone can view, post, and comment to this group)</option>
                            */} </select>
                        </div>
                        <div className="post-type-selection">
                            <h4>NSFW</h4>
                            <label className="radioBox checkBox">
                                <p>{/* <span className="nsfw">NSFW</span> */} 18+ year old Group</p>
                                <input type="checkbox" name="checkbox" id="nsfw" onChange={() => { setAdult(!isAdult) }} defaultChecked={isAdult} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="post-type-selection">

                            <h4>Description<span style={{ color: 'red' }}> * </span></h4>
                            <div className="pf-lr-part">
                                <div className="text-editor-wrapper">

                                    <ReactQuill onChange={(value) => { setAbout(value) }} value={about} />
                                </div>
                            </div>
                        </div>


                        <div className="cmn-rw in-create-post-filed justify-content-end">
                            <div className="twin-btn d-flex align-items-center justify-content-end">
                                {/* <a href="#" className="btn style-2 transparent-bg proxima-bold">Cancel</a> */}
                                <button type="submit" onClick={(event) => { updateGroup(event) }} className="btn primary-bg ms-3 proxima-bold"

                                    disabled={!(name && type && image)}
                                >Update Group</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </main>
    );
}

export default EditGroup;
