import {createAction} from 'redux-act';
import httpClient from '../../services/http';


export const requestLoginData = createAction();
export const responseLoginData = createAction();

export const requestSignupData = createAction();
export const responseSignupData = createAction();

export function credentialLogin(params){
  return (dispatch) => {
    if(params){
        dispatch(requestLoginData([]));
        httpClient.call("signin", params, {method: 'POST'}).then(function(response){
            dispatch(responseLoginData(response));
        }, function(error){
            dispatch(responseLoginData(error));
        });

    }else {
        dispatch(responseLoginData({"error": "Invalid username/password"}));
    }
  }
}


export function credentialSignup(params){
  return (dispatch) => {
    if(params){
        dispatch(requestSignupData([]));
        httpClient.call("signup", params, {method: 'POST'}).then(function(response){
            dispatch(responseSignupData(response));
        }, function(error){
            dispatch(responseSignupData(error));
        });

    }else {
        dispatch(responseSignupData({"error": "Invalid username/password"}));
    }
  }
}

