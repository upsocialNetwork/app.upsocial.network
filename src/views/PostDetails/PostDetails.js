import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import httpClient from '../../services/http';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import PostAttributes from './PostAttributes';
import PostComments from './PostComments';
const PostDetails = (props) => {

    const history = useHistory();

    const location = useLocation();
    const [element, setDetails] = useState(null);

    useEffect(() => {
        getPostDetails(location.state.detail);
    }, []);

    const navigate = (event) => {
        event.preventDefault()
    }


    const getPostDetails = (postid) => {
        httpClient.call("get-post-details/" + postid, null, { method: 'GET' }).then(function (response) {
            if (response.success) {
                console.log(response);
                setDetails(response.result.data);
                //SuccessToast(response.    result.message);
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
            <div className="tb-content-wrapper ">

                <div className="cmn-card shadow-gray-point-3  mb-4">
                    <div className="post-wrapper post-type-one">
                        <div className="post-header">
                            <div className="elementory-avater-wrap">
                                <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater">
                                    {element !== null ?
                                        [(element.postedBy.image != null ?
                                            <img src={"https://ipfs.io/ipfs/" + element.postedBy.image} alt="" /> : <img src="img/dol-1.png" alt="" />
                                        )]
                                        :
                                        <img src="img/dol-1.png" alt="" />
                                    }</a>
                                <h6>
                                    <a href="/" onClick={(event) => navigate(event)} >
                                        {element !== null ? element.name : null}
                                    </a> <span>Posted by  {element !== null ? element.postedBy.userName : null}
                                    </span>
                                </h6>
                            </div>

                            <div className="post-header-right" hidden>
                                <div className="post-time">{/* {element.agoTime} */}</div>
                                <div className="dropdown">
                                    <button className="post-dropdown" type="button" id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="img/three-dot.svg" alt="" />
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Action</a></li>
                                        <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Another action</a></li>
                                        <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Something else here</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="post-content-wrapper">

                            {element != null ? <>

                                {(() => {



                                    switch (element.type) {

                                        case 'Image':

                                            return (

                                                <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                                    <img src={"https://ipfs.io/ipfs/" + element.data} alt="" />
                                                </a>

                                            )

                                        case 'Video':

                                            return (

                                                <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                                    <video controls width="100%" height="auto">
                                                        <source src={"https://ipfs.io/ipfs/" + element.data} type="audio/mpeg" />
                                                    </video>
                                                </a>

                                            )

                                        case 'Audio':

                                            return (

                                                <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                                    <audio controls>
                                                        <source src={"https://ipfs.io/ipfs/" + element.data} type="audio/mpeg" />
                                                    </audio>
                                                </a>
                                            )


                                        case 'Text':

                                            return (

                                                <div className="post-content max-520">
                                                    <ReactQuill readOnly={true}
                                                        theme={"bubble"} value={element.postData} />

                                                </div>
                                            )
                                        default:

                                            return (

                                                null

                                            )

                                    }
                                })()}
                            </>
                                :
                                null}
                            <PostAttributes {...props} />
                            <PostComments {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </main>



    )
}
export default PostDetails;