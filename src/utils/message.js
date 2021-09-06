

const messageObj = [
  
];


export const getMessageByKey = (key) => {  
  console.log('key', key);
  let result = messageObj.filter(element => element.KEY_ESTADO_FISICO === key.toString());
  return result && result.length > 0 ? result[0] : null;
}


export const getMessageByName = (nomre) => {  
  let result = messageObj.filter(element => element.NOMBRE === nomre.toString());
  return result && result.length > 0 ? result[0] : null;
}


