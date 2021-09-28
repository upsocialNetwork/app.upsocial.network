//import { logout } from '../../utils/common';
import axios from 'axios';

let defaultConfig = {
  
   API_URL: "http://68.183.245.212:8080/Upsocial/ipfsservice/api/v0/", 
   HEADERS: {
        "Content-Type": "application/json; charset=utf-8",
    }
};

let httpClient = {


    /*
    * setConfig method to set http client config in defaultConfig
    * @param configObject ConfigObject use as a global variable and access it in getConfig
    * combine default config and param config
    */
    setConfig(configObject){
        defaultConfig = Object.assign(defaultConfig, configObject);
    },

    /*
    * getConfig method to get http client config
    * return http client config object
    */
    getConfig(){
        return defaultConfig;
    },

    /*
    * call method to call api request
    * @param endPoint EndPoint to add in cinfig fileUrl
    * @param data Data to send this object on api requests
    * @param options Options use to set request method and headers
    * return primise
    */
    call(endPoint, data, options, processCallBack){
        processCallBack = typeof processCallBack == 'function' ? processCallBack : function(){}
        return new Promise(function(resolve, reject) {
              // get http client config
              let httpConfig = httpClient.getConfig();

              let method = options && options['method'] ? options['method'] : 'GET';

              // check header exist in option
              if(typeof options['headers'] === 'undefined'){
                // added headers in option object
                options['headers'] = {}
              }

              // combine default headers and config headers

              options['headers'] = Object.assign(httpConfig['HEADERS'], options['headers']);

              // create request options object with method, body and headers
              let requestOptions = {};

              // get api url from config and combine API url and endPoint
              requestOptions['url'] = httpConfig['API_URL']+endPoint;

              // check if request method is get then data will send in params option and if request method is post then data will send into data option
              if(method !== 'GET'){
                  requestOptions['data'] = data;
              }else{
                  requestOptions['params'] = data;
              }
              // add method in option
              requestOptions['method'] = method;

              requestOptions['cache'] = "no-cache";

              // add headers in request option
              requestOptions['headers'] = options && options['headers'] ? options['headers'] : {};
              // add config in request option
              requestOptions['config'] = requestOptions['headers'];
              requestOptions['onUploadProgress'] = function (progressEvent) {
                // Do whatever you want with the native progress event
                let percent = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                processCallBack(percent);
              }
              // send request with options.
              axios(requestOptions)
              .then(function (response) {
                  let responseData = response.data;
                  resolve(responseData);


              })
              .catch(function (error, data, config) {
                  //handle error
                  let message = error && error.response && error.response.data ? error.response.data : error;
                  reject(message);
              });


        });
    }
}

// export http client
export default httpClient;
