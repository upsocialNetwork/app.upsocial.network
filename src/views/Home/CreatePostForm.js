import React, { useEffect } from 'react';


const CreatePostForm = () => {

    

    return (
        <div className="cmn-card mb-4">
            <div className="create-post">
                <div className="one-auto-g-wrap">
                    <div className="one-icon">
                        <img src="img/gp-1.jpg" alt="" />
                    </div>
                    <div className="input-wrapper">
                        <input className="form-control ht-50 design-2" type="text" placeholder="Create Post" />
                    </div>
                </div>

                <ul className="p-curd-right plc-2 max-520 justify-content-end">
                    <li><button>
                            <label className="upload upload-photo"><input type="file" />
                                <img src="img/c-1.svg" alt="" />
                            </label>
                        </button>
                    </li>
                    <li><button>
                            <label className="upload upload-photo"><input type="file" />
                                <img src="img/c-2.svg" alt="" />
                            </label></button></li>
                    <li><button><img src="img/c-3.svg" alt="" /></button></li>
                </ul>
            </div>
        </div>
    );
}

export default CreatePostForm;
