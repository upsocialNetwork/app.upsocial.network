import React from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import { useEffect, useState } from "react";
import Session from "../../utils/session";
import { useHistory } from "react-router-dom";
import ReactQuill from 'react-quill'; // ES6
import httpClient from '../../services/http';

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

        event.preventDefault();
        let formData = {
            "name": name,
            "description": about,
            "type": type,
            "nsfw": isAdult,
            "image": image
        }
        // console.log(formData);
        httpClient.call('create-group', formData, { method: 'POST' }).then(function (response) {
            if (response.success == true) {
                SuccessToast(response.result.message);
                console.log(response);
                history.push('/user/my-groups');
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            console.log(error);
        })

    }

    const convertFileToBase64 = (data) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            var b64 = reader.result.replace(
                /^data:.+;base64,/, '');
            document.getElementById("profile-image").src = reader.result;
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
                    <h3 className="tertiary-title color-primary position-relative">Create a Group</h3>
                    <div className="create-group-content position-relative">


                        <div className="user-name">
                            <h5>Name </h5>
                            <p>Group names including only Alphabet.

                            </p>
                        </div>

                        <div className="user-name-change-input">
                            <input type="text" className="form-control" placeholder=""

                                onChange={(event) => { setName(event.target.value) }}

                            />
                        </div>
                        <div className="customize-pf-g-wrap">
                            <div className="pf-lf-part">
                                <h5>Group Avtar </h5>
                            </div>
                            <div className="pf-lr-part grid">
                                <div className="profile-avater size-big position-relative">

                                    <img className="avater-image img-fluid" src="img/dol-1.png" alt="" id="profile-image"

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
                            <input class="form-control" type="file" name="file" accept="image/*"

                                onChange={(event) => { convertFile(event.target.files[0]) }}
                            />
                            Choose File 
                             </label>
                            </div> 
                        </div>*/}

                        <div className="post-type-selection">
                            <h4>Group type</h4>
                            <select className="form-control select2" onChange={(event) => { setType(event.target.value) }}>
                                <option defaultValue>Open this select menu</option>
                                <option value="Public" >Public ( Anyone can view, post, and comment to this group )</option>
                                <option value="Restricted">Restricted ( Anyone can view this group, but only approved users can post)</option>
                                <option value="Private">Private ( Anyone can view, post, and comment to this group)</option>
                            </select>
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

                            <h4>Description</h4>
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