import React, { useEffect, useRef, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion } from '../../utils/common';
import Session from '../../utils/session';
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from "react-router-dom";
import httpClient from '../../services/http';



const ForgetPassword = (props) => {

    const history = useHistory();

    let [email, setEmail] = useState();


    const doForgetPassword = (event) => {
        Loader(true);

        event.preventDefault();
        let formData = {
            email: email
        }
        httpClient.call("forget-password", formData, { method: 'PUT' }).then(function (response) {
            Loader(false);
            if (response.success == true) {
                SuccessToast(response.result.message);
            } else {
                ErrorToast(response.result.message);
            }
        }, function (error) {
            Loader(false);
            console.log(error);
        })
    }


    const loginPage = (event) => {
        event.preventDefault();
        history.push("/auth/login");
    }



    return (


        <div className="login-wrapper">
            <div className="access-top-part">
                
                <img src="img/tokenimage.jpg" class="img-fluid" alt="Responsive image"/>
                <br/> 
            </div>
           
            <h5 className="link theme-color" class="text-center">Token Address " 0x5818209Fb829311B438431cB1111dA7a3d9B04FB "</h5>
            <div className="access-bottom-part">
                <div className="policy-link">By signing up, you agree to our <a href="https://upsocial.network/terms-of-service/" className="link theme-color" target="_blank">Terms</a> and
                    that you have read our <a href="https://upsocial.network/privacy-policy/" className="link theme-color" target="_blank">Privacy Policy</a> and <a href="https://upsocial.network/privacy-policy/"
                        target="_blank" className="link theme-color">Content Policy</a>.</div>
            </div>
        </div>
    );
}

export default ForgetPassword;
