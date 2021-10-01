import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import httpClient from '../../services/http';
import { useHistory } from "react-router-dom";
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
const ChangePassword = (props) => {
    const history = useHistory();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    useEffect(() => {
        let userData = Session.isLoggedIn();
        if (!userData) {
            history.push('/auth/login');
        }
        else {
        }
    }, []);

    const navigate = (event) => {
        event.preventDefault()
    }

    const changePassword = (event) => {
        event.preventDefault();
        let formData = {
            "oldPassword": oldPassword,
            "newPassword": newPassword
        }
        httpClient.call('change-password', formData, { method: 'PUT' }).then(function (response) {
            if (response.success == true) {
                //console.log(response);
                SuccessToast(response.result.message);
                Session.setSessionData(response.result.data);
            }
            else {
                //console.log(response);
                ErrorToast(response.result.message);
            }
        }, function (error) {
            console.log(error);
        })

    }

    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <div className="edit-profile-title">
                    <h4>Edit Profile</h4>
                </div>

                <div className="edit-profile-wrapper">


                    <div className="edit-associate-blk-wrapper">
                        <h5 className="associate-blk-title">Change Password</h5>
                        <div className="customize-profile">

                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>Old Password:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <input type="password" className="form-control" placeholder="Old Password"
                                        onChange={(event) => { setOldPassword(event.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>New Password:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <input type="text" className="form-control" placeholder="New Password"
                                        onChange={(event) => { setNewPassword(event.target.value) }}
                                    />
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
                        {/* <a href="/" onClick={(event) => changePassword(event)} className="btn primary-bg proxima-bold effect-one"

                            disabled={!(oldPassword &&
                                newPassword)}

                        >Save Changes</a> */}

                        <button type="submit" className="btn primary-bg ms-3 proxima-bold" disabled={!(oldPassword &&
                            newPassword)}
                            onClick={(event) => { changePassword(event) }}
                        >Save Changes</button>






                    </div>
                </div>
            </div>

        </main>
    );
}

export default ChangePassword;
