import crypt from '../services/crypt';



let Session = (function () {

  let storageInstance = function () {
    return window.localStorage;
  }

  let getSessionData = function (key) {
    key = key || 'session'
    var storagedata = storageInstance().getItem(key)
    let decryptData = crypt.decript(storagedata)
    if (typeof decryptData === 'string') {
      decryptData = JSON.parse(decryptData);
    }
    if (decryptData && decryptData.status === 403) {
      deleteSessionData();
    }
    return decryptData ? decryptData : null;
  };

  let isLoggedIn = function () {
    let session = getSessionData();
    return (session && session.authToken) ? true : false;
  }

  let setSessionData = function (sessionData, key) {
    let encryptData = crypt.encript(sessionData);
    key = key || 'session'
    storageInstance().setItem(key, encryptData)
  };


  let deleteSessionData = function (key) {
    key = key || 'session'
    storageInstance().removeItem(key)
  }



  let convertTime = function (date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  let timeDifference = function (current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return ' ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return ' ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return ' ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  return {
    isLoggedIn: isLoggedIn,
    getSessionData: getSessionData,
    setSessionData: setSessionData,
    deleteSessionData: deleteSessionData,
    timeDifference: timeDifference,
    convertTime: convertTime
  }

})();

export default Session;
