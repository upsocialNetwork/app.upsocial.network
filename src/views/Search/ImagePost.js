import React, { useEffect, useState } from 'react';
import PostAttributes from './PostAttributes';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import Session from '../../utils/session';
import { useHistory } from 'react-router-dom';
import HoverVideoPlayer from 'react-hover-video-player';
import httpClient from '../../services/http';
import { Loader, ErrorToast, SuccessToast } from '../../utils/common';

// tech 
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const ImagePost = (props) => {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    //

    const history = useHistory();
    let element = props.postData;
    let [userData, setUserData] = useState();


    useEffect(() => {
        let user = Session.getSessionData();
        if (user == null) {
        }
        else {
            // console.log("Session");
            // console.log(user);
            setUserData(user);
        }

    }, []);

    const navigate = (event) => {
        event.preventDefault()
    }

    const userView = (event, userName) => {
        event.preventDefault();
        let user = Session.getSessionData();
        if (user == null) {
            history.push('/auth/login');
        }
        else {
            history.push({
                pathname: '/user/view/' + userName,
                state: { userName: userName }
            });
        }

    }


    const pageDetails = (event) => {
        event.preventDefault();
        const id = element.id;
        let user = Session.getSessionData();
        if (user == null) {

            history.push('/auth/login');
        }
        else {
            history.push('/post-details/' + id);
        }
    }

    const editPost = (event, postid) => {
        event.preventDefault();
        history.push({
            pathname: '/edit-post/' + postid,
            state: { postid: postid }
        });

    }

    const claimPost = (event, postid) => {
        Loader(true);
        event.preventDefault();

        let user = Session.getSessionData();
        if (user == null) {

            history.push('/auth/login');
            return null;
        }
        let formData = {
            "id": postid
        }

        httpClient.call("claim-post", formData, { method: 'POST' }).then(function (response) {
            Loader(false);
            if (response.success) {
                SuccessToast(response.result.message);
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    }


    const deletePost = (event, postId) => {
        Loader(true);
        event.preventDefault();
        let user = Session.getSessionData();
        if (user == null) {

            history.push('/auth/login');
            return null;
        }
        httpClient.call("delete-post/" + postId, null, { method: 'DELETE' }).then(function (response) {
            Loader(false);
            if (response.success) {
                SuccessToast(response.result.message);
                window.location.reload();
            }
            else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    }

    var current = new Date();
    var timeResult = Session.timeDifference(current, element.createdDate);





    // console.log(element);


    return (
        <div className="cmn-card shadow-gray-point-3  mb-4">
            <div className="post-wrapper post-type-one">
                <div className="post-header" >
                    <div className="elementory-avater-wrap">
                        <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater"> {element.postedBy.image != null ? <img src={"https://ipfs.io/ipfs/" + element.postedBy.image} alt="" /> : <img src="img/dol-1.png" alt="" />}
                        </a>

                        <span>Posted by u/ <a href="#" style={{ color: "black" }} onClick={(event) => userView(event, element.postedBy.userName)}>{element.postedBy.userName}</a> {timeResult}
                        </span>

                    </div>


                    {userData && userData.id == element.postedBy.id ?
                        <div className="post-header-right" >
                            {/*  <div className="post-time"> {timeResult} </div> */}
                            <div className="dropdown">
                                <button className="post-dropdown" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="img/three-dot.svg" alt="" />
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li hidden><a className="dropdown-item" href="#" onClick={(event) => editPost(event, element.id)}>Edit</a></li>
                                    <li ><a className="dropdown-item" href="#" onClick={(event) => deletePost(event, element.id)} style={{ color: 'red' }}>Delete</a></li>

                                    {/*  <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Another action</a></li>
                                <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Something else here</a></li> */}
                                </ul>
                            </div>
                        </div>
                        :
                        <div className="post-header-right" >
                            {/*  <div className="post-time">{timeResult}</div> */}
                            <div className="dropdown">
                                <button className="post-dropdown" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="img/three-dot.svg" alt="" />
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" href="/" onClick={(event) => claimPost(event, element.id)}>Claim Post</a></li>
                                    {/*<li><a className="dropdown-item" href="/" onClick={(event) => promotePost(event, element.id)}>Promote Post</a></li>
                                      <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Another action</a></li>
                                <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Something else here</a></li> */}
                                </ul>
                            </div>
                        </div>
                    }


                </div>
                <div className="post-content-wrapper">

                    <div className="post-content max-520">
                        <p > <a href="/" onClick={(event) => { pageDetails(event) }} style={{ fontSize: "20px", color: "inherit", textDecoration: "inherit" }}>
                            {element.name}
                        </a> </p>
                    </div>

                    {(() => {



                        switch (element.type.toUpperCase()) {

                            case 'IMAGE':

                                return (

                                    <a href="/" onClick={(event) => pageDetails(event)} className="post-img" >
                                        <img src={"https://ipfs.io/ipfs/" + element.data} alt=""
                                            style={{
                                                width: '100%',
                                                maxHeight: '100vh',
                                                objectFit: "cover",
                                            }} />
                                    </a>

                                )

                            case 'VIDEO':

                                return (

                                    /*  <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                         <video controls width="100%" height="300px"
 
                                         >
                                             <source src={"https://ipfs.io/ipfs/" + element.data} type="audio/mpeg" />
                                         </video>
                                     </a> */

                                    <HoverVideoPlayer
                                        videoSrc={"https://ipfs.io/ipfs/" + element.data}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: "cover",
                                        }}
                                        controls

                                        /* 
                                       
                                        muted={false} */
                                        /*  hoverOverlay={
                                             <div className="hover-overlay">
                                               <h1>Video Title</h1>
                                               <p>
                                                 Here is a short description of the video.
                                                 You can still see the video playing underneath this overlay.
                                                 <a href="/video-page">Click here to read more</a>
                                               </p>
                                             </div>
                                           } */
                                        /* pausedOverlay={
                                            <img
                                                src={"https://ipfs.io/ipfs/" + element.data}
                                                alt=""
                                                style={{
                                                    // Make the image expand to cover the video's dimensions
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        } */
                                        loadingOverlay={
                                            <div className="loading-overlay">
                                                <div className="loading-spinner" />
                                            </div>
                                        }
                                    />

                                )

                            case 'AUDIO':

                                return (

                                    <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                        <audio controls width="100%" height="100%" >
                                            <source src={"https://ipfs.io/ipfs/" + element.data} type="audio/mpeg" />
                                        </audio>



                                    </a>

                                )


                            default:

                                return (

                                    <div className="post-content max-520" >


                                        <ReactQuill readOnly={true}
                                            theme="" value={element.data} />
                                        {/*  <div className="preview" dangerouslySetInnerHTML={createMarkup(element.data)}></div> */}
                                    </div>

                                )

                        }



                    })()}
                    <PostAttributes {...props} />
                    {/* <PostComments {...props} /> */}
                </div>
            </div>
        </div>
    );
}

export default ImagePost;
