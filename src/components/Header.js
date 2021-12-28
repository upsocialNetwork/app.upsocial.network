import { useEffect, useState } from 'react';
import { colorModeToggle, Loader, SuccessToast, SetSassion } from './../utils/common';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
//import { useLocation } from "react-router-dom";
import Session from './../utils/session';
import { ErrorToast } from './../utils/common';
import $ from 'jquery';
import httpClient from '../services/http';
import { getNotifications } from '../views/Notification/action';
//import { convertCompilerOptionsFromJson } from 'typescript';


const Header = (props) => {
    const history = useHistory();
    // const location = useLocation();
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    // let [isMetamask, setMatamask] = useState(false);
    let [walletAddress, setWalletAddress] = useState('');
    let [walletBalance, setWalletBalance] = useState('');
    const [userDetails, setUserDetails] = useState('');
    // let [notification, setNotification] = useState('');
    const notification = useSelector(state => state.notification.notificationData);
    const dispatch = useDispatch();
    // let [param, setParam] = useState('');

    useEffect(() => {
        let loginState = Session.isLoggedIn()
        setIsLoggedIn(loginState)
        const user_details = Session.getSessionData();
        if (user_details !== null) {
            //console.log(user_details);
            //console.log(user_details.id);
            userDetailsFetch(user_details.id);
            setUserDetails(user_details);
            //setWalletAddress(user_details.wallet);
            //setWalletBalance(user_details.walletBalance);
        }

    }, [])

    // useEffect(() => {
    //     myNotification();
    // }, [notification])

    const notificationHandler = () => {
        myNotification();
    }

    useEffect(() => {
        setUserDetails(props.session);
    }, [props.session])

    useEffect(() => {
        if (props.session !== null) {

            userDetailsFetch(props.session.id);
        }
    })

    const mobileMenuToggle = (event) => {
        event.preventDefault();
        document.querySelector('.left-sidebar-wrapper').classList.toggle('appear');
        document.querySelector('.overlay').classList.toggle('appear');
    }



    const userDetailsFetch = (id) => {

       // console.log(id);

        if (id === null || id === undefined) {

        }
        else {
            httpClient.call("get-member-details/" + id, null, { method: 'GET' }).then(function (response) {
                if (response.success) {
                    // console.log(response);
                    setWalletAddress(response.result.data.wallet);
                    setWalletBalance(response.result.data.walletBalance);
                }
                else {
                    // ErrorToast(response.result.message);
                }

            }, function (error) {
                console.log(error);
            })
        }
    }

    const overLayToggle = (event) => {
        document.querySelector('.overlay').addEventListener('click', function () {
            document.querySelector('.left-sidebar-wrapper').classList.toggle('appear');
            document.querySelector('.overlay').classList.toggle('appear');
        })
    }

    const navigate = (event, path) => {
        event.preventDefault()
        if (path) {
            history.push(path);
        }
    }

    const logout = (event) => {
        event.preventDefault();
        props._signOut()
    }

    const home = (event) => {
        event.preventDefault();
        history.push({ pathname: '/', search: '', state: new Date().getTime() });
    }

    const changePassword = (event) => {
        event.preventDefault();
        history.push("/user/change-password");
    }

    const gotonotification = (event) => {
        event.preventDefault();
        history.push("/user/notification");
    }



    const login = (event) => {
        event.preventDefault();
        history.push("/auth/login");
    }



    const connectMetamask = (event) => {

        event.preventDefault();

        if (typeof window.ethereum !== 'undefined') {
            // console.log('MetaMask is installed!');
            // setMatamask(true);
            //  SuccessToast("MetaMask is installed!");
            getAccount();
        }
        else {
            ErrorToast("MetaMask is not installed!");
            // console.log('MetaMask is not installed!');
            // setMatamask(false);
            return null;
        }
    }

    async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (account === null) {
            setWalletAddress(null);
            // console.log("NO wallet");
        }
        else {
            sessionStorage.setItem("walletno", account);
            setWalletAddress(account);
            updateWalletAddress(account);
            //console.log("Wallet No", account);

        }
    }


    const updateWalletAddress = (walletadd) => {
        Loader(true);
        let formData = {
            "wallet": walletadd
        }

        httpClient.call("add-wallet", formData, { method: 'PUT' }).then(function (response) {

            Loader(false);
            if (response.success) {
                SuccessToast(response.result.message);
                Session.setSessionData(response.result.data);
            }
            else {
                ErrorToast(response.result.message);
            }

        }, function (error) {
            console.log(error);
        })

    }


    const myNotification = () => {

        // httpClient.call("get-notification", null, { method: 'GET' }).then(function (response) {
        //     if (response.success) {

        //         //console.log(response.result.data);
        //         setNotification(response.result.data);
        //         // console.log(response);
        //         //SuccessToast(response.result.message);

        //     }
        //     else {
        //         // ErrorToast(response.result.message);
        //     }

        // }, function (error) {
        //     console.log(error);
        // })
        dispatch(getNotifications())

    }

    /*  const connectWallet = (event) => {
         event.preventDefault();
         console.log("calling to connect wallet");
         var Web3 = require('web3');
         var web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7545');
         web3.eth.getAccounts(console.log);
         //getAccount();
     } */


    $("#searchParam").change(function (e) {
        e.preventDefault();
        var value = $("#searchParam").val();
        search(value)
    });

    $("#searchParam1").change(function (e) {
        e.preventDefault();
        var value = $("#searchParam1").val();
        search(value)
    });

    const search = (value) => {
        history.push({
            pathname: '/search-result/' + value,
            state: { search: value }
        });
    }

    const redeemToken = (event) => {

        event.preventDefault();
      //  console.log("redeem calling" + walletBalance);

        if (walletBalance <= 0) {
            ErrorToast("Insufficient balance");
            return null;
        }


        Loader(true);
        let formData = {
            "walletBalance": walletBalance
        }
        httpClient.call('redeem-token', formData, { method: 'POST' }).then(function (response) {
            Loader(false);
            if (response.success === true) {

                SuccessToast(response.result.message);
                Session.setSessionData(response.result.data);
                SetSassion(response.result.data)
                document.getElementById('modal-closed').click();
            }
            else {
                //  console.log(response);
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })

    }

    const searchRecords = (param) => {
        //console.log(param);
        let userData = Session.isLoggedIn();
        if (!userData) {
            history.push('/auth/login');
        } else {

            history.push({
                pathname: 'search-result',
                search: '?search=' + param + '',
                state: { search: param }
            });
        }
    }



    return (
        <>
            <div className="container">
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-header">
                                <h4 className="modal-title">Connect to a Wallet</h4>
                                <button type="button" id="modal-closed" className="btn btn-danger close" data-dismiss="modal">&times;</button>
                            </div>


                            <div className="modal-body">
                                <ul className="list-group list-group-flush">
                                    {walletAddress === null ?
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <a href="/" onClick={(event) => connectMetamask(event)}

                                                style={{ textDecoration: 'none', color: 'black' }}
                                            >Connect to Metamask Wallet</a> <span className="badge badge-light-success">Connected</span>
                                            <img src="img/download.png" width="40" />
                                        </li>
                                        :

                                        <li className="list-group-item d-flex justify-content-between align-items-center">

                                            Wallet Address<br />{walletAddress}<br /> <br /> Wallet Balance<br />$ {walletBalance} <br /><br /><br /><a href="#"
                                                style={{ color: '#FF416C' }} onClick={(event) => redeemToken(event)}
                                            > Redeem</a>
                                        </li>
                                    }

                                </ul>
                            </div>


                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div onClick={() => { overLayToggle() }} className="overlay d-xl-none"></div>
            <form action="#" className="mobile-search collapse" id="mobile-search">
                <div className="all-messages m-search">
                    <button className="back-normal" type="button" data-bs-toggle="collapse" data-bs-target="#mobile-search"><i
                        className="far fa-long-arrow-left"></i></button>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">
                            <img src="img/search.svg" alt="" />
                        </span>
                        <input type="text"

                            /*  onChange={(event) => { search(event) }} */

                            className="form-control ht-50" placeholder="Search..." /* aria-label="Search Messages"
                            
                            
                            
                            aria-describedby="Search..." */  id="searchParam1" />
                    </div>
                </div>
            </form>
            <header className="header-area position-sticky top-0 d-flex align-items-center">

                <div className="container-fluid gx-4">
                    <div className="row align-items-center">
                        <div className="col-xl-4 col-4">
                            <a href="/" onClick={(event) => home(event)} className="site_logo"><img className="img-fluid" src="img/logo.png" alt="" /></a>
                        </div>
                        <div className="col-xl-4 d-none d-xl-block">
                            <form action="#" className="search-form-master">
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><img src="img/search.svg"
                                        alt="" /></span>
                                    <input type="text" className="form-control ht-50" placeholder="Search in Upsocial"

                                        /*  onChange={(event) => { search(event) }} */
                                        id="searchParam"  /* aria-label="Search in Upsocial" aria-describedby="Search in Upsocial"  */


                                    />
                                </div>
                            </form>
                        </div>



                        <div className="col-xl-4 col-8">

                            {!isLoggedIn ?


                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                                    {/* <a href="#" data-toggle="modal" data-target="#myModal">  <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }} width="30px" height="30px" fill="currentColor" className="bi bi-wallet2" viewBox="0 0 16 16">
                                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                                    </svg>
                                    </a>

                                    &nbsp; &nbsp; &nbsp; &nbsp; */}
                                    <a href="#" onClick={(event) => login(event)}> <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }} width="30px" height="30px" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg></a> </div>
                                :

                                <ul className="crud-master d-flex align-items-center justify-content-end">

                                    <li className="d-xl-none"><a href="/" onClick={(event) => mobileMenuToggle(event)} className="mobile-toggle-bar icon-border"><i
                                        className="fal fa-bars"></i></a></li>
                                    <li className="d-xl-none ms-3"><a href="/" onClick={(event) => navigate(event)} type="button" data-bs-toggle="collapse"
                                        data-bs-target="#mobile-search" className="mobile-header-search icon-border"><i
                                            className="fal fa-search"></i></a>
                                    </li>

                                    <li className="ms-3" ><a href="/" onClick={notificationHandler} id="notificationDropdown" data-bs-toggle="dropdown"
                                        aria-expanded="false" /* className="notification new-state" */>


                                        {/*  <img src="img/bell.svg"
                                            alt="" /> */}


                                        <svg style={{ color: 'white' }} width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                        </svg>


                                    </a>
                                        <ul className="dropdown-menu setting-dropdown notification-d w-340"
                                            aria-labelledby="notificationDropdown">
                                            <li>
                                                <div className="messages">
                                                    <div className="dropdown-title-wrap">
                                                        <h6>Notification</h6>
                                                        {/*  <div className="dropdown-crud-master">
                                                            <button className="edit"><img src="img/edit.svg" alt="" /></button>
                                                        </div> */}
                                                    </div>

                                                    <div className="all-messages">

                                                        <div className="messages-result">
                                                            {notification && notification.length > 0 ?

                                                                notification.slice(0, 5).map((element, index) => {
                                                                    return (
                                                                        <div className="single-group single-message" key={index}>
                                                                            <div className="gp-icon">
                                                                                {/*   <img src="img/dol-1.png" alt="" /> */}


                                                                                {element.userImage ?
                                                                                    <img src={"https://ipfs.io/ipfs/" + element.userImage}

                                                                                    /> :
                                                                                    <img src="img/dol-1.png" alt="" />

                                                                                }
                                                                            </div>
                                                                            <div className="gp-text">{element.message}</div>

                                                                        </div>);
                                                                })

                                                                :

                                                                <div className="text-center see-all-btn-wrapper">
                                                                    <a href="/" onClick={(event) => navigate(event)} className="see-all">No Notification</a>
                                                                </div>

                                                            }
                                                            <div className="text-center see-all-btn-wrapper">
                                                                <a href="/" onClick={(event) => gotonotification(event)} className="see-all">See All</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="ms-3" hidden>
                                        <a href="/" onClick={(event) => navigate(event)} id="messageDropdown" data-bs-toggle="dropdown" aria-expanded="false" className="messages new-state">
                                            <img src="img/message.svg" alt="" />
                                        </a>
                                        <ul className="dropdown-menu setting-dropdown w-340" aria-labelledby="messageDropdown">
                                            <li>
                                                <div className="messages">
                                                    <div className="dropdown-title-wrap">
                                                        <h6>Messages</h6>
                                                        <div className="dropdown-crud-master">
                                                            <button className="edit"><img src="img/edit.svg" alt="" /></button>
                                                        </div>
                                                    </div>

                                                    <div className="all-messages">
                                                        <div className="input-group">
                                                            <span className="input-group-text" id="basic-addon1">
                                                                <img src="img/search.svg" alt="" />
                                                            </span>
                                                            <input type="text" className="form-control ht-50"
                                                                placeholder="Search in Upsocial" aria-label="Search Messages"
                                                                aria-describedby="Search in Upsocial" />
                                                        </div>
                                                        <div className="messages-result">
                                                            <a href="/" onClick={(event) => navigate(event)} className="s-message">
                                                                <div className="single-group single-message">
                                                                    <div className="gp-icon"><img src="img/gp-1.jpg" alt="" />
                                                                    </div>
                                                                    <div className="gp-text">Abi_00056 <span>You: Hi <small
                                                                        className="small-dot"></small> 1 d</span></div>
                                                                    <div className="gp-button">
                                                                        <div className="ok-status"><img src="img/ok.svg" alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div> {/*<!-- ./single-message -->*/}
                                                            </a>
                                                            <div className="single-group single-message">
                                                                <div className="gp-icon"><img src="img/gp-1.jpg" alt="" /></div>
                                                                <div className="gp-text">Abi_00056 <span>You: Hi <small
                                                                    className="small-dot"></small> 1 d</span></div>
                                                                <div className="gp-button">
                                                                    <div className="ok-status"><img src="img/ok.svg" alt="" />
                                                                    </div>
                                                                </div>
                                                            </div> {/*<!-- ./single-message -->*/}
                                                            <div className="single-group single-message">
                                                                <div className="gp-icon"><img src="img/gp-1.jpg" alt="" /></div>
                                                                <div className="gp-text">Abi_00056 <span>You: Hi <small
                                                                    className="small-dot"></small> 1 d</span></div>
                                                                <div className="gp-button">
                                                                    <div className="ok-status"><img src="img/ok.svg" alt="" />
                                                                    </div>
                                                                </div>
                                                            </div> {/*<!-- ./single-message -->*/}
                                                            <div className="single-group single-message">
                                                                <div className="gp-icon"><img src="img/gp-1.jpg" alt="" /></div>
                                                                <div className="gp-text">Abi_00056 <span>You: Hi <small
                                                                    className="small-dot"></small> 1 d</span></div>
                                                                <div className="gp-button">
                                                                    <div className="ok-status"><img src="img/ok.svg" alt="" />
                                                                    </div>
                                                                </div>
                                                            </div> {/*<!-- ./single-message -->*/}
                                                            <div className="single-group single-message">
                                                                <div className="gp-icon"><img src="img/gp-1.jpg" alt="" /></div>
                                                                <div className="gp-text">Abi_00056 <span>You: Hi <small
                                                                    className="small-dot"></small> 1 d</span></div>
                                                                <div className="gp-button">
                                                                    <div className="ok-status"><img src="img/ok.svg" alt="" />
                                                                    </div>
                                                                </div>
                                                            </div> {/*<!-- ./single-message -->*/}
                                                            <div className="text-center see-all-btn-wrapper">
                                                                <a href="/" onClick={(event) => navigate(event)} className="see-all">See All</a>
                                                            </div>
                                                        </div> {/*<!-- ./messages-result -->*/}
                                                    </div> {/*<!-- ./all-messages -->*/}
                                                </div> {/*<!-- ./messages -->*/}

                                            </li>
                                        </ul>
                                    </li>
                                    <li className="ms-3 ">

                                        {/*  {walletAddress !== null ? <span className="dot" style={{
                                            margin: "0px 10px 0px 20px",
                                            height: "15px", width: "15px", backgroundColor: "green", borderRadius: "50%", display: "inline-block"
                                        }}></span> : <span className="dot" style={{
                                            margin: "0px 10px 0px 20px",
                                            height: "15px", width: "15px", backgroundColor: "red", borderRadius: "50%", display: "inline-block"
                                        }}></span>} */}


                                        <a href="#" data-toggle="modal" data-target="#myModal">  <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }} width="30px" height="30px" fill="currentColor" className="bi bi-wallet2" viewBox="0 0 16 16">
                                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />

                                        </svg></a>
                                        {/*  &nbsp; &nbsp; &nbsp; &nbsp; */}
                                    </li>



                                    <li className="ms-3 dropdown">
                                        <a href="/" onClick={(event) => navigate(event)} id="settingDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                                            className="user-settings"><img src="img/down-arrow-round.svg" alt="" />
                                        </a>

                                        <ul className="dropdown-menu shadow-gray-point-3 setting-dropdown" aria-labelledby="settingDropdown">
                                            <li>
                                                <a href="/" onClick={(event) => navigate(event, '/user/edit-profile')} className="d-block in-hd">
                                                    <div className="user">
                                                        <div className="avater">

                                                            {userDetails.image ? <img className="img-fluid" src={"https://ipfs.io/ipfs/" + userDetails.image} alt="" id="profile-image"

                                                            /> : <img className="img-fluid" src="img/dol-1.png" alt="" />}
                                                        </div>
                                                        <h5>{userDetails.userName} <span className="amount">See your profile</span></h5>
                                                    </div>
                                                </a>


                                                <ul className="side-menu setting-menu">
                                                    <li hidden><a href="/" onClick={(event) => navigate(event)}><span className="m-icon"><img src="img/i-1.svg" alt="" /></span>Switch account</a></li>
                                                    <li hidden><a href="/" onClick={(event) => changePassword(event)}><span className="m-icon"><img src="img/i-2.svg" alt="" /></span>Setting & Privacy</a> </li>
                                                    <li hidden><a href="/" onClick={(event) => navigate(event)}><span className="m-icon"><img src="img/i-3.svg" alt="" /></span>Help & Support</a></li>
                                                    <li><a href="/" onClick={(event) => { event.preventDefault(); colorModeToggle() }}><span className="m-icon"><img src="img/i-4.svg" alt="" /></span>Change display mode</a></li>
                                                    <li><a href="/" onClick={(event) => logout(event)}><span className="m-icon"><img src="img/i-5.svg" alt="" /></span>Log out</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>


                                </ul>
                            }

                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;