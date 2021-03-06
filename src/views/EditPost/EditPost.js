import { useEffect, useState } from 'react';
import { Loader, ErrorToast, SuccessToast } from '../../utils/common';
//import PostList from './../Home/PostList';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import httpClient from '../../services/http';
import { useHistory } from 'react-router-dom';
import Session from '../../utils/session';
import { useParams } from "react-router-dom";
import $ from 'jquery';
import Contract from "../../utils/contract";
import Web3 from 'web3';

//
// tech 
/* import { ContentState, convertFromHTML } from 'draft-js';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; */
const EditPost = (props) => {

    /* const [editorState, setEditorState] = useState(null);
 */

    /* const [editorState, setEditorState] = useState(
        () =>
            EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML('<p>My initial content.</p>')
                )),
    ); */

    /* const [convertedContent, setConvertedContent] = useState(null);

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
    } */

    //
    const history = useHistory();
    // const location = useLocation();
    const params = useParams()

    useEffect(() => {

        let userData = Session.isLoggedIn();
        if (!userData) {

            history.push('/auth/login');
        }
        if (!params.postid) {
            history.push('');

        }
        //const id = params.postid;
        // getpostDetails(id);
    }, []);
    useEffect(() => {

        let userData = Session.isLoggedIn();
        if (!userData) {
            history.push('/auth/login');
        }
        if (!params.postid) {
            history.push('');

        }
        const id = params.postid;
        getpostDetails(id);
    }, [params.postid]);

    let [id, setId] = useState(null);
    let [title, setTitle] = useState(null);
    let [isAdult, setAdult] = useState(true);
    let [data, setData] = useState(null);
    let [postdata, setPostData] = useState(null);
    let [isText, setText] = useState(false);
    //let [selectedFile, setSelectedFile] = useState(null);
    let [dataType, setDataType] = useState(null);
    let [postType, setPostType] = useState(null);
    const getpostDetails = (id) => {
        Loader(true);
        httpClient.call("get-post-details/" + id, null, { method: 'GET' }).then(function (response) {
            if (response.success) {
                SuccessToast(response.result.message);

                let res = response.result.data;
                setId(res.id);
                setTitle(res.name);
                setAdult(res.nsfw)
                if (res.type === "text") {
                    document.getElementById("text-tab").click();
                    setText(true);
                    setPostType("text");
                    setDataType(".txt");
                    setData(res.data);
                    //console.log(res.data);
                    /*  setEditorState(EditorState.createWithContent(
                         ContentState.createFromBlockArray(
                             convertFromHTML(res.data)
                         ))); */
                    // setEditorState(res.data);
                    //setConvertedContent(res.data);
                    /* 
                                        EditorState.createWithContent(
                                            ContentState.createFromBlockArray(
                                              convertFromHTML('<p>My initial content.</p>')
                                            )) */


                    if (res.nsfw === true) {
                        $("#nsfwtext").prop("checked", true);
                    }
                    else {
                        $("#nsfwtext").prop("checked", false);
                    }
                }
                else {
                    document.getElementById("link-tab").click();
                    setText(false);
                    setPostType(res.type);
                    setDataType(res.dataType);
                    setPostData(res.data);
                    if (res.nsfw === true) {
                        $("#nsfwdata").prop("checked", true);
                    }
                    else {
                        $("#nsfwdata").prop("checked", false);
                    }
                    $('#div2').prepend('');



                    if (res.type.toUpperCase() === "IMAGE") {
                        $("#div2").attr('hidden', false);
                        $('#div2').prepend("<div id='div1'> <img src=" + "https://ipfs.io/ipfs/" + res.data + " alt='' width='100%' height='300px'  '/></div>");
                        $("#image1").attr('hidden', false);
                        $("#video1").attr('hidden', true);
                        $("#audio1").attr('hidden', true);
                    }
                    else if (res.type.toUpperCase() === "VIDEO") {
                        $("#div2").attr('hidden', false);
                        $('#div2').prepend("<div id='div1'><video  controls width='100%' height='300px'><source src=" + "https://ipfs.io/ipfs/" + res.data + " type='audio/mpeg'  /></video></div>");
                        $("#video1").attr('hidden', false);
                        $("#image1").attr('hidden', true);
                        $("#audio1").attr('hidden', true);
                    } else if (res.type.toUpperCase() === "AUDIO") {
                        $("#div2").attr('hidden', false);
                        $('#div2').prepend("<div id='div1'><audio controls width='100%' height='300px'><source src=" + "https://ipfs.io/ipfs/" + res.data + " type='audio/mpeg'  /></audio></div>");
                        $("#audio1").attr('hidden', false);
                        $("#video1").attr('hidden', true);
                        $("#image1").attr('hidden', true);
                    }
                }

            }
            else {
                ErrorToast(response.result.message);
                console.log(response);
                // history.push('/');
            }

            Loader(false);

        }, function (error) {
            Loader(false);
            console.log(error);
        });
    }



    const updatePost = (event) => {
        Loader(true);
        event.preventDefault();
        let formData = {};
        if (isText) {
            formData = {
                "id": id,
                "type": "text",
                "name": title,
                "data": data,
                "dataType": ".txt",
                "nsfw": isAdult

            };
        }
        else {
            formData = {
                "id": id,
                "type": postType,
                "name": title,
                "nsfw": isAdult
            };

        }

        let userData = Session.getSessionData();
        Web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");
        window.ethereum.enable();
        const NameContract = new Web3.eth.Contract(Contract.contract_abi, Contract.contract_address);
        NameContract.methods.transfer(Contract.upsocial_wallet, "1000000000000000000").send({ from: userData.wallet })
            .then(function (receipt) {
                console.log(receipt);

                let transaction = {
                    "_blockNumber": receipt.blockNumber,
                    "_cumulativeGasUsed": receipt.cumulativeGasUsed,
                    "_from": receipt.from,
                    "_gasUsed": receipt.gasUsed,
                    "_status": receipt.status,
                    "_to": receipt.to,
                    "_transactionHash": receipt.transactionHash,
                    "_transactionIndex": receipt.transactionIndex,
                    "_blockHash": receipt.blockHash,
                    "_contractAddress": Contract.contract_address
                }

                formData['transaction'] = transaction;
                httpClient.call('update-post', formData, { method: 'PUT' }).then(function (response) {
                    Loader(false);
                    if (response.success) {
                        SuccessToast(response.result.message);
                        history.push('/user/my-posts')
                    }
                    else {
                        ErrorToast(response.result.message);
                    }

                }, function (error) {
                    Loader(false);
                    ErrorToast(error.message);
                })
            }, function (error) {
                Loader(false);
                ErrorToast(error.message);
                console.log(error);
            });






    }

    const convertFileToBase64 = (data) => {
        Loader(true);
        const reader = new FileReader();
        reader.onloadend = function () {
            var b64 = reader.result.replace(/^data:.+;base64,/, '');
            setPostData(b64);
            let postType = data.type.substring(0, 5);
            if (postType === "image") {
                $("#div1").attr('hidden', true);
                //set value

                document.getElementById("image-prev").src = reader.result;
                document.getElementById('image-prev').style.display = 'inline';
                //reset value
                document.getElementById('video-prev').style.display = 'none';
                document.getElementById('audio-prev').style.display = 'none';
                document.getElementById("video-prev").value = "";
                document.getElementById("audio-prev").value = "";
                Loader(false);
            } else if (postType === "video") {
                $("#div1").attr('hidden', true);
                //set value
                document.getElementById("video-prev").src = reader.result;
                document.getElementById('video-prev').style.display = 'inline';
                //reset value
                document.getElementById('image-prev').style.display = 'none';
                document.getElementById('audio-prev').style.display = 'none';
                document.getElementById("image-prev").value = "";
                document.getElementById("audio-prev").value = "";
                Loader(false);
            } else {
                $("#div1").attr('hidden', true);
                //set value
                document.getElementById("audio-prev").src = reader.result;
                document.getElementById('audio-prev').style.display = 'inline';

                //reset value
                document.getElementById('video-prev').style.display = 'none';
                document.getElementById('image-prev').style.display = 'none';
                document.getElementById("video-prev").value = "";
                document.getElementById("image-prev").value = "";
                Loader(false);
            }
            console.log("file converted successfully");
        };
        reader.readAsDataURL(data);
    }

    const convertFile = (file) => {
        if (typeof (file) != "undefined") {
            //setSelectedFile(file);
            var size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
            let postType = file.type.substring(0, 5);
            if (size > 5) {
                ErrorToast('Please select file size less than 5 MB');
                return null;
            }
            $("#div1").attr('hidden', true);
            $("#div2").attr('hidden', false);
            convertFileToBase64(file);

            if (postType === "image") {
                // console.log(postType);
                setDataType(".jpg");
                setPostType("image");
            } else if (postType === "video") {
                ///  console.log(postType);
                setDataType(".mp4");
                setPostType("video");
            } else {
                // console.log(postType);
                setDataType(".mp3");
                setPostType("audio");
            }

        }
        else {
            ErrorToast('Please select file size greater than 1000 MB');
            return null;
        }

    }


    return (
        <main className="main-content mx-auto">
            <div className="cmn-card shadow-gray-point-3 mb-4">
                <form action="#" className="create-post-form">
                    <h3 className="tertiary-title position-relative">Edit A Post</h3>
                    <div className="post-contents">
                        <ul className="nav nav-tabs types" id="createPost" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="link-tab" data-bs-toggle="tab" data-bs-target="#link"
                                    type="button" role="tab" aria-controls="home" aria-selected="true"
                                    onClick={() => { setText(false) }}
                                >Media</button>
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
                                                    value={title} maxLength="30"
                                                    onChange={(event) => { setTitle(event.target.value) }}

                                                />
                                            </div>


                                            <div className="text-editor-wrapper">
                                                <div className="input-wrapper type-2">
                                                    <label htmlFor="">Attach File</label>
                                                    <div className="user-name-change-input">
                                                        <input className="form-control" type="file" name="file"

                                                            onChange={(event) => { convertFile(event.target.files[0]) }}
                                                        />
                                                    </div>
                                                </div>

                                                {/*  <div id="div1" hidden>

                                                </div> */}

                                                <div id="div2" hidden>
                                                    <img src="img/dol-1.png" alt="" id="image-prev" width="100%" height="300px"
                                                        style={{ display: 'none' }}

                                                    />
                                                    <video controls width="100%" height="300px" id="video-prev" style={{ display: 'none' }} >
                                                        <source src="" type="audio/mpeg" />
                                                    </video>
                                                    <audio controls id="audio-prev" width="100%" height="300px" style={{ display: 'none' }}>
                                                        <source src="" type="audio/mpeg" />
                                                    </audio>
                                                </div>
                                            </div>

                                        </div>

                                        <br />
                                        <div className="text-content-wrap" hidden>
                                            <label className="radioBox checkBox">
                                                <p><span className="nsfw">NSFW</span></p>
                                                <input type="checkbox" id="nsfwdata" name="checkbox" onChange={() => { setAdult(!isAdult) }} defaultChecked={isAdult} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="text" role="tabpanel" aria-labelledby="nav-text-tab">
                                    <div className="tb-content">
                                        <div className="text-content-wrap">
                                            <div className="post-title-eidit">
                                                <input type="text" className="form-control" placeholder="Title"
                                                    maxLength="50" onChange={(event) => { setTitle(event.target.value) }} value={title}
                                                />
                                            </div>
                                            <div className="text-editor-wrapper">
                                                <div id="txtEditor">
                                                    <ReactQuill onChange={(value) => { setData(value) }} value={data} />
                                                </div>
                                            </div>


                                            {/*  <div style={{ border: "1px solid gray", padding: '2px', minHeight: '300px' }}>
                                                <Editor
                                                    value={convertedContent}
                                                    onChange={(editorState) => { setData(editorState) }}
                                                    editorState={editorState}
                                                    onEditorStateChange={handleEditorChange}
                                                    wrapperClassName="wrapper-class"
                                                    editorClassName="editor-class"
                                                    toolbarClassName="toolbar-class"
                                                />
                                            </div>
                                            <div hidden className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
 */}


                                        </div><br />
                                        <div className="text-content-wrap" hidden>

                                            <label className="radioBox checkBox">
                                                <p><span className="nsfw">NSFW</span></p>
                                                <input type="checkbox" id="nsfwtext" name="checkbox" onChange={() => { setAdult(!isAdult) }} defaultChecked={isAdult} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>

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

                                <button type="submit" className="btn primary-bg ms-3 proxima-bold" disabled={!(title &&
                                    id)}
                                    onClick={(event) => { updatePost(event) }}
                                >Update Now</button>
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
