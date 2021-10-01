import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import httpClient from '../../services/http';
import { useHistory } from "react-router-dom";
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
const EditProfile = (props) => {
    const history = useHistory();
    const [value, setDate] = useState(new Date());
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [image, setImage] = useState('');
    const [country, setCountry] = useState('');
    const [about, setAbout] = useState('');
    useEffect(() => {
        let userData = Session.isLoggedIn();
        if (!userData) {
            history.push('/auth/login');
        }
        else {
            // props._getProfile();
            const user = Session.getSessionData();
            console.log(user);
            setUserName(user.userName);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setAbout(user.about);
            setImage(user.image);
            //setDate("03/05/1998");
            if (user.country !== null) {
                setCountry(user.country);
            }
        }
    }, []);



    const navigate = (event) => {
        event.preventDefault()
    }

    const updateProfile = (event) => {
        event.preventDefault();

        const d = new Date(value);
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        const date = `${ye}-${mo}-${da}`;
        //  console.log(date);

        let formData = {
            "userName": userName,
            "firstName": firstName,
            "lastName": lastName,
            "about": about,
            "image": image,
            "country": country
            // "dateOfBirth": date
        }

        //console.log(formData);
        //return null;

        httpClient.call('profile-update', formData, { method: 'PUT' }).then(function (response) {
            if (response.success == true) {
               // console.log(response.result.data);
                SuccessToast(response.result.message);
                Session.setSessionData(response.result.data);
            }
            else {
                console.log(response);
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
            setImage(b64);
            document.getElementById("profile-image").src = reader.result;
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
                <div className="edit-profile-title">
                    <h4>Edit Profile</h4>
                </div>

                <div className="edit-profile-wrapper">


                    <div className="edit-associate-blk-wrapper">
                        <h5 className="associate-blk-title">Customize Profile</h5>
                        <div className="customize-profile">
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Profile Image:</p>
                                </div>
                                <div className="pf-lr-part grid">
                                    <div className="profile-avater size-big position-relative">
                                        {image ?
                                            <img className="avater-image img-fluid" src={"https://ipfs.io/ipfs/" + image} alt="" id="profile-image"

                                            /> :
                                            <img className="avater-image img-fluid" src="img/dol-1.png" alt="" id="profile-image"

                                            />}
                                        {/* <img className="avater-image img-fluid" src="img/user.png" alt="" id="profile-image" 
                                        
                                        /> */}

                                        {/* <label className="position-absolute upload type-2">
                                            <input type="file" name="" id="" />
                                            <img src="img/folder.svg" alt="" />
                                        </label> */}
                                    </div>

                                    <div className="upload-banner-img">
                                        <label className="upload type-2">
                                            <input type="file" name="" id=""
                                                onChange={(event) => { convertFile(event.target.files[0]) }}

                                                accept="image/*"
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

                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Profile Name:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <input type="text" className="form-control" placeholder="User Name" value={userName}
                                        onChange={(event) => { setUserName(event.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>First Name:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <input type="text" className="form-control" placeholder="First name"
                                        onChange={(event) => { setFirstName(event.target.value) }} value={firstName}
                                    />
                                </div>
                            </div>
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Last Name:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <input type="text" className="form-control" placeholder="Last name"
                                        onChange={(event) => { setLastName(event.target.value) }} value={lastName}
                                    />
                                </div>
                            </div>
                            {/* <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Date Of Birth:</p>
                                </div>
                                <div className="pf-lr-part">

                                    <DatePicker onChange={(event)=>{setDate()}}
                                        value={value} />   </div>
                            </div> */}
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Country:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <select value={country} className="form-select select2" aria-label="Default select example" onChange={(event) => { setCountry(event.target.value) }}>
                                        <option defaultValue>Open this select menu</option>
                                        <option value="India">India</option>
                                        <option value="El Salvador">El Salvador</option>
                                        <option value="USA">USA</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>
                            </div>
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>About:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <div className="text-editor-wrapper">
                                        <ReactQuill onChange={(value) => { setAbout(value) }} value={about} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="edit-associate-blk-wrapper">
                        <h5 className="associate-blk-title">Advance:</h5>
                        <div className="customize-cmn-wrapper">
                            <div className="switch-para-wrap">
                                <h6>Allow people to follow you</h6>
                                <p>Followers will be notifiles about post you make to your profile and see them in their
                                    home
                                    feed</p>
                                <div className="toggle-switch size-2 position-absolute">
                                    <input type="checkbox" id="switch-2" />
                                    <label htmlFor="switch-2"></label>
                                </div>
                            </div>
                            <div className="switch-para-wrap">
                                <h6>Content visibility</h6>
                                <p>Posts to this profile can appear in <a href="#">r/all</a> and your profile can be
                                    discobered
                                    in <a href="#">/users</a></p>
                                <div className="toggle-switch size-2 position-absolute">
                                    <input type="checkbox" id="switch-4" />
                                    <label htmlFor="switch-4"></label>
                                </div>
                            </div>
                            <div className="switch-para-wrap">
                                <h6>Active in communities visibility</h6>
                                <p>Show which communities i am active in on my profile</p>
                                <div className="toggle-switch size-2 position-absolute">
                                    <input type="checkbox" id="switch-5" />
                                    <label htmlFor="switch-5"></label>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="edit-associate-blk-wrapper">
                        <h5 className="associate-blk-title">Profile Moderation</h5>
                        <div className="customize-cmn-wrapper">
                            <div className="switch-para-wrap">
                                <p className="moderation-para">For moderation tools please visit our <a href="#"
                                        className="underline">Profile Moderation
                                        page</a></p>
                            </div>
                        </div>
                    </div> */}

                    <div className="save-change-rw text-end">
                        <a href="/" onClick={(event) => updateProfile(event)} className="btn primary-bg proxima-bold effect-one">Save Changes</a>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default EditProfile;
