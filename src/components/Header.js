import React, { useEffect, useState } from 'react';
import { colorModeToggle } from './../utils/common';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Session from './../utils/session';
import { ErrorToast } from './../utils/common';
import $ from 'jquery';


const Header = (props) => {
    const history = useHistory();
    const location = useLocation();
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [isMetamask, setMatamask] = useState(false);
    let [walletAddress, setWalletAddress] = useState('');
    const [userDetails, setUserDetails] = useState('');

    useEffect(() => {

        const walletAdd = sessionStorage.getItem("walletno");
        if (walletAdd === null || walletAdd === undefined) {
            setWalletAddress(null);
        }
        else {
            setWalletAddress(walletAdd);
        }

        // console.log("-------------------------");
        let loginState = Session.isLoggedIn()
        setIsLoggedIn(loginState)

        const user_details = Session.getSessionData();
        if (user_details !== null) {
            setUserDetails(user_details);
        }


    }, [])

    const mobileMenuToggle = (event) => {
        event.preventDefault();
        document.querySelector('.left-sidebar-wrapper').classList.toggle('appear');
        document.querySelector('.overlay').classList.toggle('appear');
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
        history.push('/');
    }

    const changePassword = (event) => {
        event.preventDefault();
        history.push("/user/change-password");
    }

    const login = (event) => {
        event.preventDefault();
        history.push("/auth/login");
    }

    const connectMetamask = () => {

        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            setMatamask(true);
            //  SuccessToast("MetaMask is installed!");
            getAccount();
        }
        else {
            ErrorToast("MetaMask is not installed!");
            console.log('MetaMask is not installed!');
            setMatamask(false);
            return null;
        }
    }

    async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (account == null) {
            setWalletAddress(null);
            console.log("NO wallet");
        }
        else {
            sessionStorage.setItem("walletno", account);
            setWalletAddress(account);
            console.log("Wallet No", account);

        }
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
        searchRecords(value)
    });

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
                                <button type="button" className="btn btn-danger close" data-dismiss="modal">&times;</button>
                            </div>


                            <div className="modal-body">
                                <ul className="list-group list-group-flush">
                                    {walletAddress === null ?
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <a href="#" onClick={(event) => connectMetamask(event)}

                                                style={{ textDecoration: 'none', color: 'black' }}
                                            >Connect to Metamask Wallet</a> <span className="badge badge-light-success">Connected</span>
                                            <img src="img/download.png" width="40" />
                                        </li>
                                        :

                                        <li className="list-group-item d-flex justify-content-between align-items-center">

                                            <a href="#" onClick={(event) => navigate(event)}

                                                style={{ textDecoration: 'none', color: 'black' }}
                                            >Wallet No<br />{walletAddress}</a> <span className="badge badge-light-success">Connected</span>

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
                        <input type="text" className="form-control ht-50" placeholder="Search..." /* aria-label="Search Messages"
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
                                        id="searchParam"  /* aria-label="Search in Upsocial" aria-describedby="Search in Upsocial"  */


                                    />
                                </div>
                            </form>
                        </div>



                        <div className="col-xl-4 col-8">

                            {!isLoggedIn ?

                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <a href="#" data-toggle="modal" data-target="#myModal">  <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }} width="30px" height="30px" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                                    </svg></a>
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <a href="#" onClick={(event) => login(event)}> <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }} width="30px" height="30px" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
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
                                    {/* hide notification block */}
                                    <li className="ms-3" hidden><a href="/" onClick={(event) => navigate(event)} id="notificationDropdown" data-bs-toggle="dropdown"
                                        aria-expanded="false" className="notification new-state">
                                        <img src="img/bell.svg"
                                            alt="" /></a>
                                        <ul className="dropdown-menu setting-dropdown notification-d w-340"
                                            aria-labelledby="notificationDropdown">
                                            <li>
                                                <div className="dropdown-title-wrap">
                                                    <h6>Notifications</h6>
                                                    <div className="dropdown-crud-master">
                                                        <button className="tik-mark"><img src="img/tik-mark.svg" alt="" /></button>
                                                        <button className="setting"><img src="img/setting.svg" alt="" /></button>
                                                    </div>
                                                </div>

                                                <div className="all-notification">
                                                    <div className="single-notification">
                                                        <div className="notification-thumb">
                                                            <img className="thumb" src="img/gp-1.jpg" alt="" />

                                                            <img className="transparent-bell" src="img/bell-2.svg" alt="" /></div>
                                                    </div>
                                                    <div className="single-not-content">
                                                        <h5><a href="/" onClick={(event) => navigate(event)} className="single-notification-title">Start r/ jeytumbhi1234
                                                            off
                                                            right!.23 hrs</a>
                                                            <div className="dropdown">
                                                                <button className="post-dropdown" type="button"
                                                                    id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                                    aria-expanded="false">
                                                                    <img src="img/three-dot-small.svg" alt="" />
                                                                </button>
                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Action</a></li>
                                                                    <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Another action</a>
                                                                    </li>
                                                                    <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Something else
                                                                        here</a></li>
                                                                </ul>
                                                            </div>
                                                        </h5>
                                                        <p>
                                                            Communitities that have posts for people to interact with see more
                                                            action so try adding five posts today</p>
                                                    </div>
                                                </div>
                                                <div className="single-notification">
                                                    <div className="notification-thumb">
                                                        <img className="thumb" src="img/gp-1.jpg" alt="" />

                                                        <img className="transparent-bell" src="img/bell-2.svg" alt="" />
                                                    </div>
                                                    <div className="single-not-content">
                                                        <h5><a href="/" onClick={(event) => navigate(event)} className="single-notification-title">Start r/ jeytumbhi1234
                                                            off
                                                            right!.23 hrs</a>
                                                            <div className="dropdown">
                                                                <button className="post-dropdown" type="button"
                                                                    id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                                    aria-expanded="false">
                                                                    <img src="img/three-dot-small.svg" alt="" />
                                                                </button>
                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Action</a></li>
                                                                    <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Another action</a>
                                                                    </li>
                                                                    <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Something else
                                                                        here</a></li>
                                                                </ul>
                                                            </div>
                                                        </h5>
                                                        <p>
                                                            Communitities that have posts for people to interact with see more
                                                            action so try adding five posts today</p>
                                                    </div>
                                                    <div className="single-notification">
                                                        <div className="notification-thumb">
                                                            <img className="thumb" src="img/gp-1.jpg" alt="" />

                                                            <img className="transparent-bell" src="img/bell-2.svg" alt="" />
                                                        </div>
                                                        <div className="single-not-content">
                                                            <h5><a href="/" onClick={(event) => navigate(event)} className="single-notification-title">Start r/ jeytumbhi1234
                                                                off
                                                                right!.23 hrs</a>
                                                                <div className="dropdown">
                                                                    <button className="post-dropdown" type="button"
                                                                        id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                                        aria-expanded="false">
                                                                        <img src="img/three-dot-small.svg" alt="" />
                                                                    </button>
                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                        <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Action</a></li>
                                                                        <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Another action</a>
                                                                        </li>
                                                                        <li><a className="dropdown-item" href="/" onClick={(event) => navigate(event)}>Something else
                                                                            here</a></li>
                                                                    </ul>
                                                                </div>
                                                            </h5>
                                                            <p>
                                                                Communitities that have posts for people to interact with see more
                                                                action so try adding five posts today</p>
                                                        </div>
                                                    </div>

                                                    <div className="text-center see-all-btn-wrapper">
                                                        <a href="/" onClick={(event) => navigate(event)} className="see-all">See All</a>
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
                                        <a href="#" data-toggle="modal" data-target="#myModal">  <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }} width="30px" height="30px" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                                        </svg></a>
                                        &nbsp; &nbsp; &nbsp; &nbsp;
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
                                                    <li><a href="/" onClick={(event) => changePassword(event)}><span className="m-icon"><img src="img/i-2.svg" alt="" /></span>Setting& Privacy</a> </li>
                                                    <li hidden><a href="/" onClick={(event) => navigate(event)}><span className="m-icon"><img src="img/i-3.svg" alt="" /></span>Help & Support</a></li>
                                                    <li><a href="/" onClick={(event) => { event.preventDefault(); colorModeToggle() }}><span className="m-icon"><img src="img/i-4.svg" alt="" /></span>Changedisplay mode</a></li>
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