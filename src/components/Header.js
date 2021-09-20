import React, {useEffect, useState} from 'react';
import {colorModeToggle} from './../utils/common';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import Session from './../utils/session';

const Header = (props) => {
    const history = useHistory();
    let [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(()=>{
        let loginState = Session.isLoggedIn()
        setIsLoggedIn(loginState)
    })

    const navigate = (event, path) => {
        event.preventDefault()
        if(path){
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

    return (
        <>
            <div className="overlay d-xl-none"></div>
            <form action="#" className="mobile-search collapse" id="mobile-search">
                <div className="all-messages m-search">
                    <button className="back-normal" type="button" data-bs-toggle="collapse" data-bs-target="#mobile-search"><i
                        className="far fa-long-arrow-left"></i></button>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">
                            <img src="assets/img/search.svg" alt="" />
                        </span>
                        <input type="text" className="form-control ht-50" placeholder="Search..." aria-label="Search Messages"
                            aria-describedby="Search..." />
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
                                        aria-label="Search in Upsocial" aria-describedby="Search in Upsocial" />
                                </div>
                            </form>
                        </div>
                        <div className="col-xl-4 col-8">
                            {isLoggedIn ? 
                                <ul className="crud-master d-flex align-items-center justify-content-end">

                                    <li className="d-xl-none"><a href="/" onClick={(event)=>navigate(event)} className="mobile-toggle-bar icon-border"><i
                                        className="fal fa-bars"></i></a></li>
                                    <li className="d-xl-none ms-3"><a href="/" onClick={(event)=>navigate(event)} type="button" data-bs-toggle="collapse"
                                        data-bs-target="#mobile-search" className="mobile-header-search icon-border"><i
                                            className="fal fa-search"></i></a>
                                    </li>
                                    {/* hide notification block */}
                                    <li className="ms-3" hidden><a href="/" onClick={(event)=>navigate(event)} id="notificationDropdown" data-bs-toggle="dropdown"
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
                                                            right!. 23 hrs</a>
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
                                                            right!. 23 hrs</a>
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
                                                            <h5><a href="/" onClick={(event)=>navigate(event)} className="single-notification-title">Start r/ jeytumbhi1234
                                                                off
                                                                right!. 23 hrs</a>
                                                                <div className="dropdown">
                                                                    <button className="post-dropdown" type="button"
                                                                        id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                                        aria-expanded="false">
                                                                        <img src="img/three-dot-small.svg" alt="" />
                                                                    </button>
                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                        <li><a className="dropdown-item" href="/" onClick={(event)=>navigate(event)}>Action</a></li>
                                                                        <li><a className="dropdown-item" href="/" onClick={(event)=>navigate(event)}>Another action</a>
                                                                        </li>
                                                                        <li><a className="dropdown-item" href="/" onClick={(event)=>navigate(event)}>Something else
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
                                                        <a href="/" onClick={(event)=>navigate(event)} className="see-all">See All</a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="ms-3" hidden>
                                        <a href="/" onClick={(event)=>navigate(event)} id="messageDropdown" data-bs-toggle="dropdown" aria-expanded="false" className="messages new-state">
                                            <img src="img/message.svg"alt="" />
                                        </a>
                                        <ul className="dropdown-menu setting-dropdown w-340" aria-labelledby="messageDropdown">
                                            <li>
                                                <div className="messages">
                                                    <div className="dropdown-title-wrap">
                                                        <h6>Messages</h6>
                                                        <div className="dropdown-crud-master">
                                                            <button className="edit"><img src="img/edit.svg" alt=""/></button>
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
                                                            <a href="/" onClick={(event)=>navigate(event)} className="s-message">
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
                                                                <a href="/" onClick={(event)=>navigate(event)} className="see-all">See All</a>
                                                            </div>
                                                        </div> {/*<!-- ./messages-result -->*/}
                                                    </div> {/*<!-- ./all-messages -->*/}
                                                </div> {/*<!-- ./messages -->*/}

                                            </li>
                                        </ul>
                                    </li>
                                    <li className="ms-3 dropdown">
                                        <a href="/" onClick={(event)=>navigate(event)} id="settingDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                                            className="user-settings"><img src="img/down-arrow-round.svg" alt=""/>
                                        </a>

                                        <ul className="dropdown-menu shadow-gray-point-3 setting-dropdown" aria-labelledby="settingDropdown">
                                            <li>
                                                <a href="/" onClick={(event)=>navigate(event, 'edit-profile')} className="d-block in-hd">
                                                    <div className="user">
                                                        <div className="avater">
                                                            <img className="img-fluid" src="img/user.png" alt=""/>
                                                        </div>
                                                        <h5>Alex_123 <span className="amount">See your profile</span></h5>
                                                    </div>
                                                </a>


                                                <ul className="side-menu setting-menu">
                                                    <li hidden><a href="/" onClick={(event)=>navigate(event)}><span className="m-icon"><img src="img/i-1.svg" alt=""/></span>Switch account</a></li>
                                                    <li><a href="/" onClick={(event)=>navigate(event)}><span className="m-icon"><img src="img/i-2.svg" alt="" /></span>Setting& Privacy</a> </li>
                                                    <li hidden><a href="/" onClick={(event)=>navigate(event)}><span className="m-icon"><img src="img/i-3.svg" alt="" /></span>Help & Support</a></li>
                                                    <li><a href="/" onClick={(event)=>{event.preventDefault(); colorModeToggle()}}><span className="m-icon"><img src="img/i-4.svg" alt="" /></span>Changedisplay mode</a></li>
                                                    <li><a href="/" onClick={(event)=>logout(event)}><span className="m-icon"><img src="img/i-5.svg" alt="" /></span>Log out</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                :
                                <button type="button" onClick={(event)=>{navigate(event, '/login')}} className="btn gradient-bg-one radius-30 register">Login Now</button>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;