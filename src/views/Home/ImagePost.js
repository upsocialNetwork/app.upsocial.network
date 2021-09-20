import React from 'react';
import PostAttributes from './PostAttributes';
import PostComments from './PostComments';

const ImagePost = (props) => {

    let element = props.postData;

    const navigate = (event) => {
        event.preventDefault()
    }



    return (
        <div className="cmn-card shadow-gray-point-3  mb-4">
            <div className="post-wrapper post-type-one">
                <div className="post-header">
                    <div className="elementory-avater-wrap">
                        <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater"> {element.userAvatar != null ? <img src={"https://ipfs.io/ipfs/" + element.userAvatar} alt="" /> : <img src="img/gp-1.png" alt="" />}</a>
                        <h6><a href="/" onClick={(event) => navigate(event)}>{element.title}</a><span>Posted by  {element.title}
                        </span></h6>
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
                    <div className="post-content max-520">
                        <p>{element.title}</p>
                    </div>
                    {/* {element.data &&
                        <a href="/" onClick={(event) => navigate(event)} className="post-img">
                            <img src={element.data} alt="" />
                        </a>
                    } */}

                    {(() => {



                        switch (element.postType) {

                            case 'image':

                                return (

                                    <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                        <img src={"https://ipfs.io/ipfs/" + element.postData} alt="" />
                                    </a>

                                )

                            case 'video':

                                return (

                                    <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                        <video controls width="100%" height="auto">
                                            <source src={"https://ipfs.io/ipfs/" + element.postData} type="audio/mpeg" />
                                        </video>
                                    </a>

                                )

                            case 'audio':

                                return (

                                    <a href="/" onClick={(event) => navigate(event)} className="post-img">
                                        <audio controls>
                                            <source src={"https://ipfs.io/ipfs/" + element.postData} type="audio/mpeg" />
                                        </audio>



                                    </a>

                                )


                            default:

                                return (

                                    <div className="post-content max-520">
                                        <p>{element.postData}</p>
                                    </div>

                                )

                        }



                    })()}
                    <PostAttributes {...props} />
                    {/*  <PostComments {...props} /> */}
                </div>
            </div>
        </div>
    );
}

export default ImagePost;
