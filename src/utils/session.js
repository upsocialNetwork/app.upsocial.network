import crypt from '../services/crypt';



let Session = (function() {

  let storageInstance = function(){
    return window.localStorage;
  }

  let getSessionData = function(key) {
    key = key || 'session'
    var storagedata = storageInstance().getItem(key)
    let decryptData = crypt.decript(storagedata)
    if(typeof decryptData === 'string'){
      decryptData = JSON.parse(decryptData);
    }
    if(decryptData && decryptData.status === 403){
        deleteSessionData();
    }
    return decryptData ? decryptData : null;
  };

  let isLoggedIn = function(){
      let session = getSessionData();
      return (session && session.authToken) ? true : false;
  }

  let setSessionData = function(sessionData, key) {
    let encryptData = crypt.encript(sessionData);
    key = key || 'session'
    storageInstance().setItem(key, encryptData)
  };


  let deleteSessionData = function(key){
    key = key || 'session'
    storageInstance().removeItem(key)
  }



  return {
    isLoggedIn: isLoggedIn,
    getSessionData: getSessionData,
    setSessionData: setSessionData,
    deleteSessionData: deleteSessionData
  }

})();

export default Session;
