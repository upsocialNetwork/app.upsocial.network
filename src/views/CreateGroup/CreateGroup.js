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
            "groupType": type,
            "adultContent": isAdult,
            "avtar": image
        }
        httpClient.call('create-group', formData, { method: 'POST' }).then(function (response) {
            console.log(response);
            SuccessToast(response.result.message);
        }, function (error) {
            ErrorToast(error.result.message);
        })
    }

    const convertFileToBase64 = (data) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            var b64 = reader.result.replace(
                /^data:.+;base64,/, '');
            setImage(b64);
            console.log("file converted successfully");
        };
        reader.readAsDataURL(data);
    }

    const convertFile = (file) => {
        if (typeof (file) != "undefined") {
            var size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
            let postType = file.type.substring(0, 5);
            if (size > 10) {
                ErrorToast('Please select file size less than 10 MB');
                return null;
            }
            if (postType == "image") {
                convertFileToBase64(file);
            } else {
                ErrorToast('Please select file size less than 10 MB');
                return null;
            }
        }
        else {
            ErrorToast('Please select file size less than 10 MB');
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
                            <input type="text" className="form-control" placeholder="/r"

                                onChange={(event) => { setName(event.target.value) }}

                            />
                        </div>

                        <div className="post-type-selection">
                            <h4>Group Avtar</h4>
                            <div className="drag-and-drop-div">
                                <img src="img/drag-and-drop.png" alt="" />
                                <label htmlFor="drag" className="drag-and-drop">
                                    <input type="file" name="file" id="drag" accept="image/*"

                                        onChange={(event) => { convertFile(event.target.files[0]) }}
                                    />
                                    Choose File
                                </label>
                            </div>
                        </div>

                        <div className="post-type-selection">
                            <h4>Group type</h4>
                            <select className="form-select select2" aria-label="Default select example" onChange={(event) => { setType(event.target.value) }}>
                                <option defaultValue>Open this select menu</option>
                                <option value="Public" >Public ( Anyone can view, post, and comment to this group )</option>
                                <option value="Restricted">Restricted ( Anyone can view this group, but only approved users can post)</option>
                                <option value="Private">Private ( Anyone can view, post, and comment to this group)</option>
                            </select>
                        </div>
                        <div className="post-type-selection">
                            <h4>Adult content</h4>
                            <label className="radioBox checkBox">
                                <p><span className="nsfw">NSFW</span> 18+ year old Group</p>
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

                                    disabled={!(name && type)}
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
