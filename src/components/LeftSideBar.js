import React, { useEffect, useState } from 'react';
import { applyDarkMode, applyLightMode } from './../utils/common';
import { useHistory } from 'react-router-dom';
import Session from '../utils/session';


const LeftSideBar = (props) => {

    const history = useHistory();
    const [image, setImage] = useState('');
    const [userName, setUserName] = useState('');

    const navigate = (event) => {
        event.preventDefault()
    }

    const createGroup = (event) => {
        event.preventDefault();

        history.push('/create-group');
    }

    const searchGroup = (event) => {
        event.preventDefault();

        history.push('/user/my-groups');
    }
    const leftSide = props.leftSide ? props.leftSide : false;

    useEffect(() => {
        let userData = Session.isLoggedIn();
        if (userData) {
            // props._getProfile();
            const user = Session.getSessionData();
            setImage(user.profileImage);
            setUserName(user.userName);

        }

    }, []);

    return (
        <div className="left-sidebar-wrapper position-fixed">
            <div className="sidebar-inner scroll-bar">
                <div className="shadow-gurd flex">
                    {leftSide &&
                        <div className="top-zone mb-4">
                            <ul className="side-menu">
                                <li hidden><a href="/" onClick={(event) => navigate(event)}><span className="m-icon"><svg width="30" height="32" viewBox="0 0 30 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M28.6361 7.50281H4.65573L9.14596 2.94796C9.6785 2.40786 9.6785 1.53201 9.14596 0.991814C8.61351 0.451622 7.75006 0.451622 7.21752 0.991814L0.399405 7.9079C-0.133135 8.448 -0.133135 9.32386 0.399405 9.86405L7.21752 16.7801C7.48379 17.0502 7.83279 17.1853 8.18178 17.1853C8.53078 17.1853 8.87978 17.0502 9.14596 16.7801C9.6785 16.24 9.6785 15.3642 9.14596 14.824L4.65573 10.2692H28.6361C29.3892 10.2692 29.9997 9.64993 29.9997 8.88602C29.9997 8.12212 29.3892 7.50281 28.6361 7.50281Z"
                                        fill="black" />
                                    <path
                                        d="M22.7826 14.8243C22.2502 14.2842 21.3867 14.2842 20.8542 14.8243C20.3217 15.3644 20.3217 16.2402 20.8542 16.7804L25.3445 21.3353H1.36411C0.611028 21.3353 0.000488281 21.9546 0.000488281 22.7185C0.000488281 23.4824 0.611028 24.1017 1.36411 24.1017H25.3445L20.8543 28.6565C20.3217 29.1966 20.3217 30.0725 20.8543 30.6127C21.1205 30.8827 21.4695 31.0178 21.8185 31.0178C22.1675 31.0178 22.5164 30.8827 22.7826 30.6126L29.6007 23.6965C30.1333 23.1564 30.1333 22.2806 29.6007 21.7404L22.7826 14.8243Z"
                                        fill="black" />
                                </svg>
                                </span >DEX</a></li>
                                <li className="active" hidden><a href="/" onClick={(event) => navigate(event)}><span className="m-icon"><svg width="32" height="32"
                                    viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.0192 0.635742C19.8214 0.635742 23.6235 0.635742 27.4256 0.635742C28.142 0.635742 28.2558 0.706107 28.1989 1.39495C28.0738 2.90595 28.4074 4.30955 29.0063 5.69833C29.6394 7.16859 30.1739 8.67959 30.7349 10.1795C31.5007 12.2312 30.5681 14.3644 28.5173 15.2161C28.1875 15.3532 28.2065 15.5532 28.2065 15.805C28.2065 20.6009 28.2065 25.3932 28.2065 30.1891C28.2065 31.0372 28.18 31.0668 27.3157 31.0668C19.7569 31.0668 12.1982 31.0668 4.6394 31.0668C3.83197 31.0668 3.79027 31.0261 3.79027 30.2373C3.79027 25.4413 3.78648 20.6491 3.79785 15.8531C3.79785 15.505 3.72583 15.3161 3.36192 15.1643C1.44001 14.3607 0.518855 12.1904 1.25047 10.2239C1.98588 8.2537 2.74023 6.29088 3.50976 4.32806C3.71446 3.80588 3.83197 3.2911 3.80164 2.73188C3.77132 2.26155 3.79027 1.78751 3.79406 1.31347C3.79785 0.732031 3.88883 0.639446 4.48019 0.635742C6.18982 0.635742 7.90324 0.635742 9.61286 0.635742C11.7508 0.635742 13.885 0.635742 16.0192 0.635742ZM15.9927 13.3459C15.1322 14.7199 13.9419 15.4902 12.3195 15.4939C10.6819 15.4976 9.48019 14.7199 8.72204 13.457C8.13447 13.9718 7.61893 14.5829 6.96313 14.9458C6.30354 15.3087 5.50369 15.4272 4.71901 15.668C4.71901 20.4232 4.71901 25.2821 4.71901 30.1669C5.55297 30.1669 11.205 30.1669 12.0503 30.1669C12.0503 29.9595 12.0503 29.7817 12.0503 29.6077C12.0503 26.3227 12.0503 23.0378 12.0503 19.7529C12.0503 19.1048 12.1527 19.0011 12.8085 19.0011C15.2308 19.0011 17.653 19.0011 20.0791 19.0011C20.7463 19.0011 20.8411 19.0936 20.8411 19.7417C20.8411 23.0415 20.8411 26.3413 20.8411 29.641C20.8411 29.8114 20.8411 29.9854 20.8411 30.1743C24.6356 30.1743 23.5249 30.1743 27.2778 30.1743C27.2778 25.2747 27.2778 20.401 27.2778 15.505C26.44 15.5124 25.6439 15.4013 24.9957 14.9384C24.3778 14.4977 23.8433 13.9422 23.2861 13.4496C21.7736 16.1346 17.7743 16.279 15.9927 13.3459ZM12.9715 19.9047C12.9715 23.3415 12.9715 26.7375 12.9715 30.1632C15.299 30.1632 17.6038 30.1632 19.9199 30.1632C19.9199 26.7264 19.9199 23.3304 19.9199 19.9047C17.6076 19.9047 15.3141 19.9047 12.9715 19.9047ZM15.5568 4.16882C15.4696 4.13178 15.443 4.11326 15.4165 4.11326C13.8737 4.10956 12.3308 4.09845 10.788 4.11697C10.6781 4.11697 10.4961 4.30955 10.4734 4.43176C10.0374 6.57605 9.60528 8.72404 9.20346 10.872C8.85471 12.7349 10.1246 14.4273 11.9707 14.6088C13.9002 14.7977 15.5226 13.3681 15.553 11.4498C15.5605 10.8868 15.5568 10.3276 15.5568 9.7647C15.5568 7.90187 15.5568 6.03905 15.5568 4.16882ZM16.4476 4.09845C16.4476 4.27251 16.4476 4.38732 16.4476 4.50212C16.4476 6.80936 16.44 9.1166 16.4514 11.4201C16.4627 13.3126 18.0094 14.7236 19.9199 14.6125C21.7584 14.5051 23.1155 12.8941 22.8123 11.0276C22.4483 8.7981 21.9707 6.58345 21.5234 4.3651C21.5007 4.2577 21.3111 4.10956 21.1974 4.10956C19.6394 4.09475 18.0814 4.09845 16.4476 4.09845ZM9.5977 4.1503C9.49914 4.12437 9.45744 4.10215 9.41575 4.10215C7.88807 4.09845 6.35661 4.09104 4.82894 4.11326C4.69247 4.11697 4.49156 4.28732 4.43849 4.42435C3.65001 6.43902 2.85396 8.45368 2.12613 10.4906C1.94418 10.9979 1.88732 11.6053 1.97071 12.1386C2.20953 13.6533 3.50976 14.6569 5.03743 14.6199C6.62196 14.5829 7.91082 13.4348 8.16101 11.8534C8.3278 10.8165 8.51355 9.78322 8.70687 8.75366C8.99118 7.23155 9.29444 5.70574 9.5977 4.1503ZM22.4066 4.09845C22.4711 4.45398 22.5204 4.74285 22.5734 5.03171C23.0018 7.32784 23.4415 9.62397 23.8585 11.9238C24.1921 13.7718 25.951 14.9643 27.7592 14.5458C29.4802 14.1459 30.5492 12.3423 29.954 10.6794C29.1997 8.55738 28.3619 6.46494 27.5469 4.3651C27.5052 4.2577 27.3498 4.11697 27.2436 4.11326C25.6515 4.09475 24.067 4.09845 22.4066 4.09845ZM4.7228 3.19852C12.2512 3.19852 19.7531 3.19852 27.2815 3.19852C27.2815 2.63189 27.2815 2.09489 27.2815 1.53197C19.7493 1.53197 12.2512 1.53197 4.7228 1.53197C4.7228 2.09489 4.7228 2.63559 4.7228 3.19852Z"
                                        fill="#FF416C" stroke="#FF416C" strokeWidth="0.5" />
                                </svg>
                                </span>Marketplace</a></li>
                                <li hidden><a href="/" onClick={(event) => navigate(event)}><span className="m-icon"><svg className="with-stroke" width="44" height="40"
                                    viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.5 27.5682C1.776 27.5682 2 27.341 2 27.061V19.5699H29.768C32.241 19.5699 34.245 21.5337 34.331 24.0412C34.341 24.3141 34.561 24.5292 34.831 24.5292H42.501C42.636 24.5292 42.763 24.4744 42.858 24.378C42.952 24.2827 43.003 24.1518 43.001 24.0159C42.901 16.7155 36.966 10.7763 29.77 10.7763H20.23V1.95639H24.908C25.185 1.95639 25.408 1.72917 25.408 1.4492C25.408 1.16924 25.185 0.942017 24.908 0.942017H14.553C14.276 0.942017 14.053 1.16924 14.053 1.4492C14.053 1.72917 14.276 1.95639 14.553 1.95639H19.231V10.7763H2V4.65562C2 4.37566 1.776 4.14844 1.5 4.14844C1.225 4.14844 1 4.37566 1 4.65562V27.061C1 27.343 1.225 27.5682 1.5 27.5682ZM29.768 11.7927C36.25 11.7927 41.627 17.0066 41.983 23.5178H35.294C34.96 20.6989 32.62 18.5565 29.77 18.5565H2V11.7927H29.768Z"
                                        fill="black" stroke="black" strokeWidth="0.5" />
                                    <path
                                        d="M38.9689 26.9394C38.7909 26.8014 38.5409 26.8014 38.3639 26.9394C35.8519 28.8789 34.5119 31.9413 34.7799 35.1304C34.9499 37.1612 36.6549 38.7517 38.6629 38.7517C38.7719 38.7517 38.8839 38.7477 38.9949 38.7375C40.8949 38.5732 42.3909 37.0557 42.5519 35.1294C42.8169 31.9413 41.4789 28.8789 38.9689 26.9394ZM41.5549 35.0442C41.4359 36.4765 40.3229 37.6045 38.9099 37.7282C38.8249 37.7343 38.7439 37.7384 38.6619 37.7384C37.1699 37.7384 35.9009 36.5556 35.7739 35.0452C35.5459 32.3348 36.6229 29.7279 38.6659 27.9923C40.7069 29.7269 41.7799 32.3338 41.5549 35.0442Z"
                                        fill="black" stroke="black" strokeWidth="0.5" />
                                </svg>
                                </span>Faucet</a></li>
                                <li><a href="/" onClick={(event) => searchGroup(event)}><span className="m-icon"><svg width="35" height="18" viewBox="0 0 35 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.2464 3.93259C19.513 3.93259 21.3855 5.78198 21.3855 8.08122C21.3855 9.48076 20.6957 10.7304 19.6609 11.4801C20.2522 11.68 20.7449 11.9799 21.2377 12.3298C21.9275 10.4305 23.4058 8.98093 25.229 8.28116C24.1942 7.5314 23.5536 6.28182 23.5536 4.93226C23.5536 2.58303 25.3768 0.733643 27.6435 0.733643C29.9101 0.733643 31.7826 2.63302 31.7826 4.93226C31.7826 6.28182 31.0928 7.5314 30.058 8.28116C32.6696 9.28083 34.542 11.83 34.542 14.829H33.2609C33.2609 11.68 30.7478 9.13088 27.6435 9.13088C25.1304 9.13088 22.9623 10.7803 22.2725 13.2295C23.4058 14.4791 24.1449 16.1286 24.1449 17.978H22.8638C22.8638 14.829 20.3507 12.2798 17.2464 12.2798C14.142 12.2798 11.629 14.829 11.629 17.978H10.3971C10.3971 16.1286 11.087 14.4791 12.2696 13.2295C11.5797 10.7803 9.36232 9.13088 6.84928 9.13088C3.74493 9.13088 1.23188 11.68 1.23188 14.829H0C0 11.83 1.87246 9.28083 4.43478 8.28116C3.4 7.5314 2.75942 6.3318 2.75942 4.93226C2.75942 2.63302 4.58261 0.733643 6.84928 0.733643C9.16522 0.733643 10.9884 2.58303 10.9884 4.93226C10.9884 6.28182 10.2986 7.5314 9.31304 8.28116C11.087 8.98093 12.5652 10.4305 13.3043 12.3298C13.7478 11.9799 14.2899 11.68 14.8319 11.4801C13.7971 10.7304 13.1565 9.48076 13.1565 8.08122C13.1565 5.78198 14.9797 3.93259 17.2464 3.93259ZM6.84928 1.98323C5.27246 1.98323 3.9913 3.2828 3.9913 4.93226C3.9913 6.53173 5.27246 7.83131 6.84928 7.83131C8.47536 7.83131 9.75652 6.53173 9.75652 4.93226C9.75652 3.33279 8.47536 1.98323 6.84928 1.98323ZM27.6435 1.98323C26.0667 1.98323 24.7855 3.33279 24.7855 4.93226C24.7855 6.53173 26.0667 7.83131 27.6435 7.83131C29.2203 7.83131 30.5015 6.53173 30.5015 4.93226C30.5015 3.2828 29.2203 1.98323 27.6435 1.98323ZM17.2464 5.18218C15.6696 5.18218 14.3884 6.48175 14.3884 8.08122C14.3884 9.73068 15.6696 11.0303 17.2464 11.0303C18.8725 11.0303 20.1536 9.73068 20.1536 8.08122C20.1536 6.48175 18.8725 5.18218 17.2464 5.18218Z"
                                        fill="black" />
                                </svg>
                                </span>My Groups</a></li>
                                <li><a href="#create-group" data-bs-toggle="collapse" aria-expanded="true">Create Group <i
                                    className="fal fa-angle-down"></i></a>
                                    <ul className="submenu collapse show" id="create-group">
                                        <li ><a href="/" onClick={(event) => navigate(event)}><span className="m-icon stroke"><svg width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.68596 20.6173C7.48391 20.5124 7.40521 20.2635 7.51018 20.0614C7.61515 19.8594 7.86404 19.7807 8.06609 19.8856C9.30127 20.5273 10.6753 20.867 12.099 20.867C16.9375 20.867 20.8599 16.9446 20.8599 12.1061C20.8599 10.6811 20.5196 9.30594 19.8769 8.06994C19.7718 7.86793 19.8504 7.619 20.0524 7.51395C20.2544 7.4089 20.5034 7.48749 20.6084 7.6895C21.3119 9.04232 21.6844 10.5479 21.6844 12.1061C21.6844 17.4 17.3929 21.6915 12.099 21.6915C10.5422 21.6915 9.03788 21.3197 7.68596 20.6173ZM16.0833 3.38559C16.2904 3.48033 16.3814 3.72498 16.2867 3.93203C16.1919 4.13907 15.9473 4.23011 15.7402 4.13537C14.6077 3.61711 13.3729 3.3453 12.099 3.3453C7.26058 3.3453 3.33822 7.26766 3.33822 12.1061C3.33822 13.3821 3.61092 14.6188 4.1308 15.7528C4.22569 15.9598 4.13482 16.2045 3.92784 16.2994C3.72086 16.3943 3.47615 16.3034 3.38126 16.0964C2.8122 14.8551 2.51367 13.5013 2.51367 12.1061C2.51367 6.81227 6.80519 2.52075 12.099 2.52075C13.492 2.52075 14.8436 2.81831 16.0833 3.38559Z"
                                                fill="black" stroke="black" strokeWidth="0.5" />
                                            <path
                                                d="M13.3079 13.3078L19.784 4.21607L10.6923 10.6922L4.21618 19.7839L13.3079 13.3078ZM3.69522 21.1674C3.48048 21.3203 3.19238 21.3203 2.97765 21.1674C2.69947 20.9692 2.63459 20.5831 2.83274 20.3049L10.1011 10.101L20.305 2.83264C20.5832 2.63449 20.9693 2.69936 21.1675 2.97754C21.3204 3.19228 21.3204 3.48038 21.1675 3.69512L13.8991 13.899L3.69522 21.1674Z"
                                                fill="black" stroke="black" strokeWidth="0.5" />
                                            <path
                                                d="M10.0898 10.7375L10.6729 10.1544L13.8796 13.3612L13.2965 13.9442L10.0898 10.7375Z"
                                                fill="black" stroke="black" strokeWidth="0.5" />
                                        </svg>
                                        </span>Discover</a></li>
                                        <li hidden><a href="/" onClick={(event) => navigate(event)}><span className="m-icon"><svg width="18" height="22" viewBox="0 0 18 22"
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.8291 14.3382L15.846 13.1415C15.2343 12.388 14.9066 11.4351 14.9066 10.46V8.22174C14.9066 4.98623 12.5034 2.30475 9.42297 1.90585V0.797797C9.42297 0.354576 9.07342 0 8.63648 0C8.19954 0 7.84999 0.354576 7.84999 0.797797V1.90585C4.76956 2.30475 2.36638 4.98623 2.36638 8.22174V10.46C2.36638 11.4351 2.03868 12.388 1.42696 13.1415L0.465689 14.3382C-0.036793 14.9587 -0.146028 15.823 0.203524 16.5543C0.553077 17.2856 1.25218 17.751 2.06052 17.751H5.07541C5.25019 19.6125 6.77948 21.053 8.65833 21.053C10.5372 21.053 12.0665 19.5903 12.2412 17.751H15.2561C16.0645 17.751 16.7636 17.2856 17.1131 16.5543C17.419 15.823 17.3316 14.9809 16.8291 14.3382ZM8.63648 19.4574C7.63152 19.4574 6.80133 18.7039 6.6484 17.7288H10.6246C10.4716 18.7039 9.64144 19.4574 8.63648 19.4574ZM15.6712 15.8673C15.6275 15.9559 15.5183 16.1554 15.2343 16.1554H2.03868C1.75466 16.1554 1.64543 15.9559 1.60173 15.8673C1.55804 15.7786 1.4925 15.557 1.66728 15.3354L2.62855 14.1387C3.45873 13.0972 3.91752 11.7897 3.91752 10.4378V8.22174C3.93937 5.58458 6.03668 3.43496 8.63648 3.43496C11.2363 3.43496 13.3336 5.58458 13.3336 8.19958V10.4378C13.3336 11.7897 13.7924 13.0972 14.6226 14.1387L15.5838 15.3354C15.7805 15.557 15.7149 15.7786 15.6712 15.8673Z"
                                                fill="black" />
                                        </svg>
                                        </span>Your Notifications</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="sidebar-creation-wrap">
                                <a href="/" onClick={(event) => createGroup(event)} className="btn gradient-bg-one radius-30">Create Group</a>
                            </div>
                        </div>
                    }

                    <div className="bottom-zone mt-auto">
                        <div className="user-profile">
                            <div className="user">
                                <div className="avater">

                                    {image ? <img className="img-fluid" src={"https://ipfs.io/ipfs/" + image} alt="" id="profile-image"

                                    /> : <img className="img-fluid" src="img/dol-1.png" alt="" />}

                                </div>
                                <h5>
                                    <a href="/" onClick={(event) => navigate(event)} className="d-inline-block">
                                        {userName ? userName : <p></p>}

                                    </a>
                                </h5>
                            </div>

                            <div className="color-mode">
                                <button className="light-mode active" id="light-mode" onClick={() => applyLightMode()} ><svg width="32" height="31"
                                    viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.42334 15.259C0.666953 14.7362 1.07805 14.5636 1.64141 14.5839C2.47375 14.6144 3.31118 14.589 4.1486 14.5941C4.75763 14.5941 5.15858 14.9697 5.1535 15.5179C5.14843 16.0509 4.74748 16.4113 4.1486 16.4113C3.31118 16.4113 2.47883 16.391 1.64141 16.4215C1.07805 16.4418 0.666953 16.2692 0.42334 15.7464C0.42334 15.5788 0.42334 15.4164 0.42334 15.259Z"
                                        fill="#FF416C" />
                                    <path
                                        d="M15.6795 31C15.1568 30.7614 14.9842 30.3452 15.0045 29.7817C15.035 28.9492 15.0096 28.1117 15.0147 27.2741C15.0147 26.665 15.3902 26.264 15.9384 26.2691C16.4713 26.2741 16.8316 26.6751 16.8316 27.2741C16.8316 28.1117 16.8113 28.9442 16.8418 29.7817C16.8621 30.3452 16.6895 30.7563 16.1667 31C16.0043 31 15.8419 31 15.6795 31Z"
                                        fill="#FF416C" />
                                    <path
                                        d="M23.6374 15.5026C23.6324 19.7665 20.1659 23.2284 15.9129 23.2132C11.6446 23.198 8.18828 19.731 8.20859 15.4823C8.22889 11.2184 11.6649 7.79198 15.9179 7.7869C20.1761 7.78183 23.6425 11.2437 23.6374 15.5026ZM10.0255 15.4874C10.0154 18.7361 12.6342 21.3706 15.8976 21.396C19.1458 21.4213 21.8103 18.7767 21.8205 15.5077C21.8306 12.2488 19.1813 9.594 15.9179 9.59907C12.6647 9.60415 10.0357 12.2336 10.0255 15.4874Z"
                                        fill="#FF416C" />
                                    <path
                                        d="M26.2107 26.7818C25.9975 26.665 25.7437 26.5889 25.5763 26.4265C24.8911 25.7716 24.2262 25.0965 23.5614 24.4214C23.1807 24.0305 23.1757 23.4823 23.5309 23.1219C23.8862 22.7615 24.4445 22.7513 24.8302 23.1321C25.5154 23.8021 26.1904 24.4823 26.8603 25.1625C27.1496 25.4569 27.2207 25.8122 27.0532 26.1929C26.9111 26.5381 26.6268 26.7056 26.2107 26.7818Z"
                                        fill="#FF416C" />
                                    <path
                                        d="M27.1446 5.33009C27.0837 5.43669 27.0025 5.68542 26.8401 5.85801C26.1956 6.5382 25.5256 7.19302 24.8557 7.85292C24.4497 8.24885 23.8965 8.25901 23.531 7.88845C23.1656 7.51789 23.1758 6.96967 23.5767 6.56358C24.2416 5.88846 24.9115 5.21841 25.5865 4.55344C25.8809 4.26918 26.2768 4.20319 26.6168 4.36563C26.967 4.52806 27.1294 4.80725 27.1446 5.33009Z"
                                        fill="#FF416C" />
                                    <path
                                        d="M4.70117 5.29967C4.71132 4.81237 4.87373 4.53826 5.20362 4.37582C5.53859 4.21338 5.89894 4.22354 6.16793 4.48242C6.91907 5.19815 7.65499 5.92911 8.3706 6.68545C8.69542 7.02555 8.63451 7.56869 8.3097 7.89357C7.97473 8.22351 7.4266 8.25905 7.0764 7.92402C6.35064 7.22859 5.6401 6.51286 4.93971 5.7819C4.7976 5.6347 4.74685 5.39612 4.70117 5.29967Z"
                                        fill="#FF416C" />
                                    <path
                                        d="M5.63512 26.7615C5.23925 26.7107 4.94995 26.5483 4.79262 26.2031C4.63529 25.863 4.65559 25.5128 4.91443 25.2437C5.62497 24.5026 6.35073 23.7717 7.0968 23.061C7.43684 22.7361 7.97482 22.7818 8.30472 23.1016C8.63461 23.4214 8.69551 23.9696 8.37069 24.3097C7.65508 25.061 6.91916 25.7919 6.16802 26.5128C6.03606 26.6447 5.81783 26.6803 5.63512 26.7615Z"
                                        fill="#FF416C" />
                                    <path
                                        d="M16.8325 2.37581C16.8325 2.83773 16.8376 3.30474 16.8325 3.76666C16.8274 4.33519 16.4518 4.72605 15.924 4.72605C15.4012 4.72605 15.0206 4.33011 15.0155 3.76159C15.0104 2.8225 15.0104 1.88342 15.0155 0.949419C15.0206 0.406275 15.4012 0.0103384 15.9088 0.000186193C16.4265 -0.00996603 16.8223 0.396123 16.8325 0.954495C16.8376 1.42657 16.8325 1.89865 16.8325 2.37581Z"
                                        fill="#FF416C" />
                                    <path
                                        d="M29.0527 16.4062C28.5908 16.4062 28.1239 16.4113 27.6621 16.4062C27.0936 16.4011 26.6978 16.0255 26.6978 15.5026C26.6978 14.9747 27.0936 14.594 27.657 14.594C28.5959 14.5889 29.5348 14.5889 30.4738 14.594C31.032 14.5991 31.433 14.995 31.4279 15.5128C31.4228 16.0204 31.0219 16.4011 30.4788 16.4062C29.9967 16.4113 29.5247 16.4062 29.0527 16.4062Z"
                                        fill="#FF416C" />
                                </svg>
                                </button>
                                <img className="obligue" src="img/obligue.svg" alt="" />
                                <button className="dark-mode" id="dark-mode" onClick={() => applyDarkMode()} ><svg width="20" height="28" viewBox="0 0 20 28"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.514648 13.2145C0.534992 7.48116 3.18988 2.32838 7.25866 0.170937C7.45702 0.0653745 7.7164 -0.0533836 7.8995 0.0257885C8.36741 0.217121 8.30638 0.685556 8.15888 1.18038C7.48245 3.43019 7.25358 5.75917 7.46719 8.16732C8.13345 15.6029 13.0363 21.1845 18.8293 21.0922C18.9666 21.0922 19.1141 21.0394 19.2412 21.0856C19.5006 21.1779 19.8922 21.2373 19.9736 21.4616C20.0601 21.6991 19.9228 22.2072 19.7549 22.4447C16.7796 26.72 13.0821 28.376 8.77429 26.9641C4.46646 25.5522 1.82683 21.8179 0.763862 16.2165C0.672314 15.7414 0.621454 15.2466 0.580766 14.7584C0.540078 14.2438 0.534992 13.7292 0.514648 13.2145ZM18.2393 22.4711C14.2468 22.1148 11.0274 20.0035 8.70308 15.8536C6.36862 11.6905 5.81933 7.03911 6.78567 2.03808C4.36982 3.50276 1.48607 7.65929 1.57253 13.5576C1.64882 18.684 4.21216 23.4013 7.95036 25.2355C11.9632 27.2016 15.9964 25.4268 18.2393 22.4711Z"
                                        fill="#7A7A7A" />
                                </svg>
                                </button>
                            </div>
                        </div>
                    </div> {/*<!-- ./bottom-zone -->*/}
                </div> {/*<!-- ./shadow-gurd -->*/}
            </div> {/*<!-- ./sidebar-inner -->*/}
        </div>
    );
}

export default LeftSideBar;