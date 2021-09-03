import React, { useEffect } from 'react';
import PostAttributes from './PostAttributes';
import PostComments from './PostComments';

const LinkPost = (props) => {

    let element = props.postData;

    return (
        <div className="cmn-card" key={element.id}>
            <div className="post-wrapper post-type-one">
                <div className="post-header">
                    <div className="elementory-avater-wrap">
                        <a href="#" className="elemetory-avater"> <img src="img/gp-1.jpg" alt="" /></a>
                        <h6><a href="#">{element.title}</a><span>Posted by {element.postedBy}
                            </span></h6>
                    </div>

                    <div className="post-header-right">
                        <div className="post-time">{element.agoTime}</div>
                        <div className="dropdown">
                            <button className="post-dropdown" type="button" id="dropdownMenuButton1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="img/three-dot.svg" alt="" />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="post-content-wrapper">
                    <div className="post-content max-520">
                        <p>{element.description}</p>
                    </div>
                    <a href="#" className="post-img">
                        <img src="img/post-2.jpg" alt="" />
                    </a>
                    <div className="elementory-avater-wrap not-grid link-2 max-520">
                        <h6><a href="#"><span>{element && element.linkDetails && element.linkDetails ? element.linkDetails.domain : ''}</span>
                                {element && element.linkDetails && element.linkDetails ? element.linkDetails.title : ''}
                            </a><span>{element && element.linkDetails && element.linkDetails ? element.linkDetails.description : ''}</span></h6>
                    </div>
                    <PostAttributes {...props} />
                    <PostComments {...props} />
                </div>
            </div>
        </div> 

    );
}

export default LinkPost;
