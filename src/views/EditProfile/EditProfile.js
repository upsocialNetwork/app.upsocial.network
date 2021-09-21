import React from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; 

const EditProfile = (props) => {
    
    const navigate = (event) => {
        event.preventDefault()
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
                                    <p>Profile and Banner image:</p>
                                </div>
                                <div className="pf-lr-part grid">
                                    <div className="profile-avater size-big position-relative">
                                        <img className="avater-image img-fluid" src="img/user.png" alt="" />

                                        <label className="position-absolute upload type-2">
                                            <input type="file" name="" id="" />
                                            <img src="img/folder.svg" alt="" />
                                        </label>
                                    </div>

                                    <div className="upload-banner-img">
                                        <label className="upload type-2">
                                            <input type="file" name="" id="" />
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
                                    <input type="text" className="form-control" placeholder="Full name or nickname" />
                                </div>
                            </div>
                            <div className="customize-pf-g-wrap">
                                <div className="pf-lf-part">
                                    <p>About:</p>
                                </div>
                                <div className="pf-lr-part">
                                    <div className="text-editor-wrapper">
                                        <ReactQuill onChange={(value)=>{console.log('event', value)}} />
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
                        <a href="/" onClick={(event)=>navigate(event)} className="btn primary-bg proxima-bold effect-one">Save Changes</a>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default EditProfile;
