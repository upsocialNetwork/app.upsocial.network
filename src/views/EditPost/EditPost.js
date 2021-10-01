import React, { useEffect, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import PostList from './../Home/PostList';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import httpClient from '../../services/http';
import { useHistory } from 'react-router-dom';
import Session from '../../utils/session';
import { useLocation } from "react-router-dom";





const EditPost = (props) => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {

        let userData = Session.isLoggedIn();
        if (!userData) {

            history.push('/auth/login');
        }
        //console.log(location);
        const id = location.state.postid;
        //console.log("post id", id);
        getpostDetails(id);
    }, []);

    let [id, setId] = useState(null);
    let [title, setTitle] = useState(null);
    let [isAdult, setAdult] = useState(true);
    let [data, setData] = useState(null);
    let [postdata, setPostData] = useState(null);
    let [isText, setText] = useState(false);
    let [selectedFile, setSelectedFile] = useState(null);
    let [dataType, setDataType] = useState(null);
    let [postType, setPostType] = useState(null);


    const navigate = (event) => {
        event.preventDefault();
    }


    const getpostDetails = (id) => {
        httpClient.call("get-post-details/" + id, null, { method: 'GET' }).then(function (response) {
            if (response.success) {
                console.log(response);
                SuccessToast(response.result.message);

                let res = response.result.data;
                setTitle(res.postName);
                setId(res.postId);

                // console.log(res.postData);
                if (res.postType == "text") {
                    document.getElementById("text-tab").click();
                    setText(true);
                    setPostType("text");
                    setDataType(".txt");
                    setData(res.postData);

                }
                else {
                    document.getElementById("link-tab").click();
                    setText(false);
                    setPostType(res.postType);
                    setDataType(res.postDataType);
                    setPostData(res.postData);
                }
                setAdult(res.adultContent)
            }
            else {
                ErrorToast(response.result.message);
            }
            //  console.log(response);
        }, function (error) {
            console.log(error);
        });
    }



    const savePost = (event) => {
        event.preventDefault();
        let formData = {};
        if (isText) {
            formData = {
                "id": id,
                "postType": "text",
                "title": title,
                "data": data,
                "dataType": ".txt",
                "adultContent": isAdult

            };
        }
        else {

            formData = {
                "id": id,
                "postType": postType,
                "title": title,
                "data": postdata,
                "dataType": dataType,
                "adultContent": isAdult

            };

        }

        // console.log(formData);

        httpClient.call('update-timeline-post', formData, { method: 'POST' }).then(function (response) {
            if (response.success) {
                //console.log(response);
                SuccessToast(response.result.message);
                //history.push("/");
            }
            else {
                ErrorToast(response.result.message);
            }

        }, function (error) {
            ErrorToast(error.result.message);
        })



    }


    const convertFileToBase64 = (data) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            var b64 = reader.result.replace(
                /^data:.+;base64,/, '');
            setPostData(b64);
            console.log("file converted successfully");
        };
        reader.readAsDataURL(data);
    }

    const convertFile = (file) => {
        if (typeof (file) != "undefined") {
            setSelectedFile(file);
            var size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
            let postType = file.type.substring(0, 5);
            if (size > 10) {
                ErrorToast('Please select file size less than 10 MB');
                return null;
            }
            if (postType == "image") {
                setDataType(".jpg");
                setPostType("image");
            } else if (postType == "video") {
                setDataType(".mp4");
                setPostType("video");
            } else {
                setDataType(".mp3");
                setPostType("audio");
            }
            convertFileToBase64(file);
        }
        else {
            ErrorToast('Please select file size less than 10 MB');
            return null;
        }

    }


    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <form action="#" className="create-post-form">
                    <h3 className="tertiary-title position-relative">Edit Post</h3>
                    {/*  <div className="post-writter d-flex justify-content-between" >
                        <div className="user">
                            <div className="avater">
                                <img className="img-fluid" src="img/user.png" alt="" />
                            </div>
                            <h5><a href="#" className="d-inline-block">u/GalaGames</a>
                            </h5>
                        </div>
                        <button type="button" className="tooltip-btn" data-bs-toggle="tooltip" data-bs-html="true"
                            title="<p>Lorem ipsum dolor sit amet sojeljfla aofdifelfoa dlfjdfowef.</p>">
                            <img src="img/info-icon.svg" alt="" />
                        </button>
                    </div> */}

                    <div className="post-contents">
                        <ul className="nav nav-tabs types" id="createPost" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="link-tab" data-bs-toggle="tab" data-bs-target="#link"
                                    type="button" role="tab" aria-controls="home" aria-selected="true"
                                    onClick={() => { setText(false) }}
                                >Image & Video</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="text-tab" data-bs-toggle="tab" data-bs-target="#text"
                                    type="button" role="tab" aria-controls="text" aria-selected="false"
                                    onClick={() => { setText(true) }}
                                >Text</button>
                            </li>
                        </ul>


                        <div className="tg-grid">
                            <div className="tab-content" id="createPost">
                                <div className="tab-pane fade show active" id="link" role="tabpanel"
                                    aria-labelledby="nav-link-tab">
                                    <div className="tb-content">
                                        <div className="text-content-wrap">
                                            <div className="post-title-eidit">
                                                <input type="text" className="form-control" placeholder="Title"
                                                    value={title}
                                                    onChange={(event) => { setTitle(event.target.value) }}

                                                />
                                            </div>

                                            <div className="text-editor-wrapper">
                                                <div className="input-wrapper type-2">
                                                    <label htmlFor="">Attach File</label>
                                                    <div className="drag-and-drop-div">
                                                        <img src="img/drag-and-drop.png" alt="" />
                                                        <label htmlFor="drag" className="drag-and-drop">
                                                            <input type="file" name="file" id="drag" /* onChange={changeHandler} */

                                                                onChange={(event) => { convertFile(event.target.files[0]) }}
                                                            />
                                                            Choose File
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div><br />
                                        {/* <div className="text-content-wrap">
                                            <label className="radioBox checkBox">
                                                <p><span className="nsfw">NSFW</span></p>
                                                <input type="checkbox" name="checkbox" onChange={() => { setAdult(!isAdult) }} 
                                                    value={isAdult}  id="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div> */}

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="text" role="tabpanel" aria-labelledby="nav-text-tab">
                                    <div className="tb-content">
                                        <div className="text-content-wrap">
                                            <div className="post-title-eidit">
                                                <input type="text" className="form-control" placeholder="Title"
                                                    onChange={(event) => { setTitle(event.target.value) }}
                                                    value={title}
                                                />
                                            </div>
                                            <div className="text-editor-wrapper">
                                                <div id="txtEditor">
                                                    <ReactQuill onChange={(value) => { setData(value) }} value={data} />
                                                </div>
                                            </div>


                                        </div><br />
                                        {/*  <div className="text-content-wrap">

                                            <label className="radioBox checkBox">
                                                <p><span className="nsfw">NSFW</span></p>
                                                <input type="checkbox" name="checkbox" id="checkbox" onChange={() => { setAdult(!isAdult) }} defaultChecked={isAdult} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div> */}

                                    </div>
                                </div>
                            </div>
                            {/* <div className="tg-g-right">
                                <div className="input-wrapper type-2">
                                    <label htmlFor="">Attach File</label>
                                    <div className="drag-and-drop-div">
                                        <img src="img/drag-and-drop.png" alt="" />
                                        <label htmlFor="drag" className="drag-and-drop">
                                            <input type="file" name="" id="drag" />
                                            Choose File
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <div className="cmn-rw in-create-post-filed">
                            <label htmlFor="check-1" className="check-box">
                                {/* <input id="check-1" type="checkbox" />
                                <div className="checkbox"><img src="img/checkbox.png" alt="" />
                                    <img className="check-ok" src="img/check-ok.png" alt="" />
                                </div>
                                <p>Send replies to my inbox</p> */}
                            </label>

                            <div className="twin-btn d-flex align-items-center justify-content-between">

                                <button type="submit" className="btn primary-bg ms-3 proxima-bold"
                                    onClick={(event) => { savePost(event) }}
                                >Update Post</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/*  <ul className="nav nav-tabs" id="myTab" role="tablist" >
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                        role="tab" aria-controls="home" aria-selected="false">Popular</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                        role="tab" aria-controls="profile" aria-selected="false">Recommended</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-linFk" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                        role="tab" aria-controls="contact" aria-selected="true">All</button>
                </li>
            </ul> */}
            {/* <div className="tab-content  mb-4" id="myTabContent" >
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <PostList type={'POPULAR'} postlist={pt} />
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <PostList type={'RECOMMENDED'} postlist={pt} />
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <PostList type={'ALL'} postlist={pt} />
                </div>
            </div> */}
        </main>
    );
}

export default EditPost;