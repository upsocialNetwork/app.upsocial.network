import React, { useEffect, useRef, useState } from 'react';

const Regitration = (props) => {
    return (<div className="login-wrapper">
        <div className="access-top-part">

            <div className="login-part" id="login-content">
            <br/><br/> <br/><br/>
                <form action="#" className="login-g-wrapper">
                    <div className="login-left">
                        <h3><img style={{ height: "35px", width: "auto" }} src="img/Upsocial_logo.png" /></h3><br /><br />
                        <h1 style={{ color: "black" }}><b >Welcome Back !</b></h1><br /><br />
                        <div class="twin-btn d-flex align-items-center justify-content-between">
                            <a href="#" class="btn style-2 forgot-password">Connect To Metamask  &nbsp;&nbsp;&nbsp;&nbsp;<img src="img/meta.png" style={{ height: "30px", width: "30px" }} /></a>
                        </div>
                        <br /><br />
                        <div className="ask-user"><b style={{ color: "black" }}>Don't have an Account? </b><a href="/" className="theme-color" /* onClick={(event) => { event.preventDefault(); setIsLogin(false) }} */>Register Now</a>
                            <br />
                            <b style={{ color: "black" }}>Visit Upsocial ? </b>&nbsp;
                            <a href="/" className="theme-color" /* onClick={(event) => { home(event) }} */>Home</a>
                        </div>
                    </div>
                    <div className="login-right">
                        {/*  <img style={{ height: "500px", width: "300px" }} src="img/connect_metamask.png" /> */}

                        <div class="twin-btn d-flex align-items-center">
                            <img style={{ height: "450px", width: "450px" }} src="img/connect_metamask.png" />
                        </div>
                        
                    </div>
                    {/* <div className="login-left flex">

                    </div> */}
                    {/* <div className="login-right">
                    </div> */}
                </form>
            </div>
        </div>
        {/* <div className="access-bottom-part">
            <div className="policy-link">By signing up, you agree to our <a href="https://upsocial.network/terms-of-service/" className="link theme-color" target="_blank">Terms</a> and
                that you have read our <a href="https://upsocial.network/privacy-policy/" className="link theme-color" target="_blank">Privacy Policy</a> and <a href="https://upsocial.network/privacy-policy/"
                    target="_blank" className="link theme-color">Content Policy</a>.</div>
        </div> */}
    </div>)
}

export default Regitration;