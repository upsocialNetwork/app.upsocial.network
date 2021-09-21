import React from 'react';




const Community = (props) => {


    const navigate = (event) => {
        event.preventDefault();
    }


    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <form action="#" className="create-post-form create-group">
                    <h3 className="tertiary-title color-primary position-relative">Create a Group</h3>
                    <div className="create-group-content position-relative">
                        <button type="button" className="tooltip-btn position-absolute" data-bs-toggle="tooltip"
                            data-bs-html="true" title="<p>Lorem ipsum dolor sit amet sojeljfla aofdifelfoa dlfjdfowef.</p>">
                            <img src="img/info-icon.svg" alt="" />
                        </button>


                        <div className="user-name">
                            <h5>Name </h5>
                            <p>Group names including capitalization cannot be changed.

                            </p>
                        </div>

                        <div className="user-name-change-input">
                            <input type="text" className="form-control" placeholder="/r" />
                            <p>21 Characters remaining</p>
                            <p className="required">A community name is required</p>
                        </div>

                        <div className="post-type-selection">
                            <h4>Group type</h4>
                            <label htmlFor="public" className="radioBox"><img src="img/t-1.svg" alt="" />
                                <p>Public <span>Anyone can view, post, and comment to this group</span></p>
                                <input type="radio" name="radio" id="public" />
                                <span className="checkmark"></span>
                            </label>
                            <label htmlFor="restricted" className="radioBox"><img src="img/t-2.svg" alt="" />
                                <p>Restricted <span>Anyone can view this group, but only approved users can post</span></p>
                                <input type="radio" name="radio" id="restricted" />
                                <span className="checkmark"></span>
                            </label>
                            <label htmlFor="private" className="radioBox"><img src="img/t-3.svg" alt="" />
                                <p>private <span>Anyone can view, post, and comment to this group</span></p>
                                <input type="radio" name="radio" id="private" />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="post-type-selection">
                            <h4>Adult content</h4>
                            <label className="radioBox checkBox">
                                <p><span className="nsfw">NSFW</span> 18+ year old Group</p>
                                <input type="checkbox" name="checkbox" />
                                <span className="checkmark"></span>
                            </label>
                        </div>


                        <div className="cmn-rw in-create-post-filed justify-content-end">
                            <div className="twin-btn d-flex align-items-center justify-content-end">
                                <a href="/" onClick={(event)=>navigate(event)} className="btn style-2 transparent-bg proxima-bold">Cancel</a>
                                <button type="submit" className="btn primary-bg ms-3 proxima-bold">Create Group</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>

        </main>
    );
}

export default Community;
