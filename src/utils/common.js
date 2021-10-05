import {createAction} from 'redux-act';
import store from './../store';
import httpClient from '../services/http';
import session from '../utils/session';
import config from '../config';

export const requestLoaderVisibility = createAction();
export const requestSuccessMessage = createAction();
export const requestErrorMessage = createAction();
export const requestAuthSession = createAction();

export function SuccessToast(message){
  store.dispatch(requestSuccessMessage(message));
  setTimeout(()=>{
    store.dispatch(requestSuccessMessage(''));
  }, 5000)
}

export function ErrorToast(message){
  store.dispatch(requestErrorMessage(message));
  setTimeout(()=>{
    store.dispatch(requestErrorMessage(''));
  }, 5000)
}

export function Loader(isVisible){
  let param = {
      isVisible: isVisible
  }
  store.dispatch(requestLoaderVisibility(param))
}

export function SetSassion(){
  let userData = session.getSessionData();
  setHttpClientConfig()
  store.dispatch(requestAuthSession(userData));
}


export function setHttpClientConfig(){  
  return new Promise(function(resolve, reject){
      let userData = session.getSessionData();
      let headers = {};
      headers['Accept'] = "application/json";
      headers['Content-Type'] = "application/json;charset=utf-8";
      headers['X-API-KEY'] = config.API_KEY
      if(userData && userData.authToken){
        headers['AUTHTOKEN'] = userData.authToken
      }
      httpClient.setConfig({
          API_URL: config.API_URL,
          HEADERS: headers
      });
      resolve(true);
  });
}

export function formatAmount(amount){
   return Number(amount).toLocaleString("es-ES", {minimumFractionDigits: 2});
}


export function cleanString(stringVal){
    return stringVal
          .replace(/&amp;/g, '')
          .replace(/"/g, '&quot;')
          .replace(/#/g, '&num;')
          .replace(/'/g, '&apos;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
}

export function applyDarkMode(){
    let bodyElement = document.querySelector('body');
    let darkBtn = document.querySelector('#dark-mode');
    let lightBtn = document.querySelector('#light-mode');
    bodyElement.classList.add('dark_mode');
    darkBtn.classList.add('active');
    lightBtn.classList.remove('active');    
}

export function applyLightMode(){
  let bodyElement = document.querySelector('body');
  let darkBtn = document.querySelector('#dark-mode');
  let lightBtn = document.querySelector('#light-mode');
  bodyElement.classList.remove('dark_mode');
  darkBtn.classList.remove('active');
  lightBtn.classList.add('active');    
}

export function colorModeToggle(){
  let bodyElement = document.querySelector('body');
  let className = bodyElement.classList && bodyElement.classList.value ? bodyElement.classList.value : null;
  if(className === 'dark_mode'){
      applyLightMode()
  }else{
      applyDarkMode()
  }
}

export function smartContract(data){

  return "successfully";
}