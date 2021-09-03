
var defaultSalt = "8E1DB986D50FD8ED8310D266676748E73B182EA4BB101BAF652A705BC75BA7C0";
let crypt = (function(){

    /*
    * setSaltKey method to set crypt salt key
    * @param saltKey string use as a global variable and access it in getSaltKey
    *
    */
    let setSaltKey = function(saltKey){
      if(saltKey){
          defaultSalt = saltKey;
      }
    };

    /*
    * getSaltKey method to get saltkey
    */
    let getSaltKey = function(){
        return defaultSalt;
    };

    let encript = function(objectData) {
        let salt = getSaltKey();
        if(objectData && Object.keys(objectData).length > 0){
            objectData = JSON.stringify(objectData).split('');
            for(var i = 0, l = objectData.length; i < l; i++)
                if(objectData[i] === '{')
                    objectData[i] = '}';
                else if(objectData[i] === '}')
                    objectData[i] = '{';
            return encodeURI(salt + objectData.join(''));
        }
    };

   let decript = function(encryptString) {
      let salt = getSaltKey();
       if(encryptString){
            encryptString = decodeURI(encryptString);
            if(salt && encryptString.indexOf(salt) !== 0){
                return {status: 403}
            }else{
              encryptString = encryptString.substring(salt.length).split('');
              for(var i = 0, l = encryptString.length; i < l; i++)
                  if(encryptString[i] === '{')
                      encryptString[i] = '}';
                  else if(encryptString[i] === '}')
                      encryptString[i] = '{';
              return JSON.parse(encryptString.join(''));
            }
        }
    };


    return {
      encript: encript,
      decript: decript,
      setSaltKey: setSaltKey
    }

})();

// export http client
export default crypt;
