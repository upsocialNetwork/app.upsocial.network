import {createAction} from 'redux-act';
import httpClient from '../../services/http';


export const requestLoginData = createAction();
export const responseLoginData = createAction();

export function credentialLogin(params){
  return (dispatch) => {
    if(params){
        dispatch(requestLoginData([]));
        httpClient.call("api/login", params, {method: 'POST'}).then(function(response){
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
        dispatch(requestLoginData([]));
        httpClient.call("api/signup", params, {method: 'POST'}).then(function(response){
            dispatch(responseLoginData(response));
        }, function(error){
            dispatch(responseLoginData(error));
        });

    }else {
        dispatch(responseLoginData({"error": "Invalid username/password"}));
    }
  }
}

