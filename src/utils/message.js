

const messageObj = [
  {
    "KEY_ESTADO_FISICO": "1",
    "NOMBRE": "SIN RECEPCION",
    "DESCRIPCION": "Son los envíos que se han recogido en la delegación",
    "FINAL": " pero aun no se han recepcionado. Proceso de Admisión",
    "DESCRIPCION_WEB": "Ya hemos recibido la información de su envío, en breve dispondremos de  su mercancía. Si necesita información adicional por favor póngase en contacto con su remitente.",
    "NOMBRE_WEB": "Ya hemos recibido la información de su envío"
  },
  {
    "KEY_ESTADO_FISICO": "2",
    "NOMBRE": "EN ARRASTRE",
    "DESCRIPCION": "Son los envíos que se han recepcionado en la delegación (Proceso de Admisión) y se preparan para su posterior arrastre a la delegación destino",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en uno de nuestro vehículos siendo transportado a la localidad de destino. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "En ruta a localidad de destino"
  },
  {
    "KEY_ESTADO_FISICO": "3",
    "NOMBRE": "TRAMO ORIGEN",
    "DESCRIPCION": "Este estado intermedio comprende los envíos que no se transitan a otras delegaciones",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en uno de nuestro vehículos siendo transportado a la localidad de destino. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "En ruta a localidad de destino"
  },
  {
    "KEY_ESTADO_FISICO": "4",
    "NOMBRE": "TRANSITO",
    "DESCRIPCION": "Son los envíos que están en su arrastre desde su delegación origen a su delegación destino y transitan en una delegación cruce. Cualquier envío que llega a un destino que no le corresponde permanece en este estado",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en uno de nuestro vehículos siendo transportado a la localidad de destino. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "En ruta a localidad de destino"
  },
  {
    "KEY_ESTADO_FISICO": "5",
    "NOMBRE": "MAL TRANSITADO",
    "DESCRIPCION": "Envíos que en su arrastre llega a una delegación distinta de la delegación de entrega",
    "FINAL": " y además un usuario los identifica como tales por lectura de tipo Mal Transitado",
    "DESCRIPCION_WEB": "0",
    "NOMBRE_WEB": "Por un error en la clasificación"
  },
  {
    "KEY_ESTADO_FISICO": "6",
    "NOMBRE": "DELEGACION DESTINO",
    "DESCRIPCION": "Este estado representa la llegada de los envíos a la delegación de entrega de los mismos",
    "FINAL": " siempre que coincidan",
    "DESCRIPCION_WEB": "0",
    "NOMBRE_WEB": "Su envío está en nuestras instalaciones de destino y lo estamos clasificando. Lo recibirá en la fecha de entrega prevista."
  },
  {
    "KEY_ESTADO_FISICO": "7",
    "NOMBRE": "TRAMO DESTINO",
    "DESCRIPCION": "Este estado intermedio comprende la mercancía que ha llegado a su delegación destino sea cual sea el origen y que no ha sido salido al reparto de la delegación",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en nuestras instalaciones de destino y lo estamos clasificando. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "En destino"
  },
  {
    "KEY_ESTADO_FISICO": "8",
    "NOMBRE": "EN REPARTO",
    "DESCRIPCION": "Los envíos están asignados a un chofer para el reparto",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío se encuentra en reparto. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "En reparto"
  },
  {
    "KEY_ESTADO_FISICO": "9",
    "NOMBRE": "REPARTO FALLIDO",
    "DESCRIPCION": "Son los envíos que han pasado por estado En Reparto",
    "FINAL": " pero no han sido entregados. El modo de llegar a este estado depende de los eventos previos disponibles con el uso de PDA. No obstante sirve en el modelo para representar las situaciones que se pueden dar a continuación",
    "DESCRIPCION_WEB": "0",
    "NOMBRE_WEB": ""
  },
  {
    "KEY_ESTADO_FISICO": "10",
    "NOMBRE": "ALMACEN ESTACIONADO",
    "DESCRIPCION": "Son los envíos No repartidos que no tienen una solución inmediata para pasarlo al estado Nuevo Reparto y necesitan ser gestionados antes de intentar su entrega",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío no ha podido ser entregado por (Incidencia-Motivo).",
    "NOMBRE_WEB": "En almacén"
  },
  {
    "KEY_ESTADO_FISICO": "11",
    "NOMBRE": "NUEVO REPARTO",
    "DESCRIPCION": "Este estado recoge los envíos No repartidos que puedo poner de nuevo en reparto porque su motivo de incidencia tiene solución inmediata. También llegan a este estado los que han Salido de estacionado tras su solución",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en nuestras instalaciones de destino y lo estamos clasificando. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "Nuevo reparto"
  },
  {
    "KEY_ESTADO_FISICO": "12",
    "NOMBRE": "ENTREGADO",
    "DESCRIPCION": "El envío se ha entregado. (estado Definitivo)",
    "FINAL": "1",
    "DESCRIPCION_WEB": "Su envío está entregado.",
    "NOMBRE_WEB": "Entregado"
  },
  {
    "KEY_ESTADO_FISICO": "13",
    "NOMBRE": "NO LOCALIZADO",
    "DESCRIPCION": "Este estado se asigna a aquellos envíos que no consiguen llegar a una situación final (estado Definitivo)",
    "FINAL": "1",
    "DESCRIPCION_WEB": "Su envío está en proceso de gestión por nuestro departamento de Atención al cliente.",
    "NOMBRE_WEB": "En Gestión"
  },
  {
    "KEY_ESTADO_FISICO": "14",
    "NOMBRE": "REEXPEDIDO",
    "DESCRIPCION": "Este estado representa los envíos que una vez gestionados",
    "FINAL": " su entrega será en una delegación distinta de la delegación original",
    "DESCRIPCION_WEB": " para ello se genera un nuevo envío (estado Definitivo)",
    "NOMBRE_WEB": "1"
  },
  {
    "KEY_ESTADO_FISICO": "15",
    "NOMBRE": "ALM. REGULADOR",
    "DESCRIPCION": "Son envíos que no pueden ser entregados ni al remitente ni al destinatario y que necesitan una gestión mas compleja para su entrega. Físicamente se ubican fuera de delegación. (estado Definitivo)",
    "FINAL": "1",
    "DESCRIPCION_WEB": "Su envío está en proceso de gestión por nuestro departamento de Atención al cliente. Para más información pónganse en contacto por favor con el 902122333.",
    "NOMBRE_WEB": "En almacén"
  },
  {
    "KEY_ESTADO_FISICO": "16",
    "NOMBRE": "DESTRUIDO",
    "DESCRIPCION": "Este estado representa la destrucción del envío. (estado Definitivo)",
    "FINAL": "1",
    "DESCRIPCION_WEB": "Hemos recibido instrucciones de nuestro cliente para destruir el envío. Si necesita más información por favor contacte con su remitente.",
    "NOMBRE_WEB": "Destruido"
  },
  {
    "KEY_ESTADO_FISICO": "17",
    "NOMBRE": "DEVUELTO",
    "DESCRIPCION": "Estos son los envíos que no han podido ser entregados y",
    "FINAL": " tras su gestión",
    "DESCRIPCION_WEB": " se devuelven al cliente remitente. Como se genera un nuevo envío",
    "NOMBRE_WEB": " la ida queda con este (estado definitivo)"
  },
  {
    "KEY_ESTADO_FISICO": "18",
    "NOMBRE": "TRANSFERIDO PROVEEDOR",
    "DESCRIPCION": "El envío ha sido entregado a un proveedor para su entrega",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en uno de nuestro vehículos siendo transportado a la localidad de destino.",
    "NOMBRE_WEB": "En ruta a localidad de destino"
  },
  {
    "KEY_ESTADO_FISICO": "19",
    "NOMBRE": "ANULADO",
    "DESCRIPCION": "El envío lleva demasiado tiempo en sin recepción",
    "FINAL": " ha caducado",
    "DESCRIPCION_WEB": "1",
    "NOMBRE_WEB": "No hemos recibido su envío . Si necesita más información por favor contacte con su remitente"
  },
  {
    "KEY_ESTADO_FISICO": "34",
    "NOMBRE": "ENTREGADO/PROVEEDOR",
    "DESCRIPCION": "Situación provisional de envios entregados por el Proveedor. Posteriormente nos debe informar de un estado definitivo.",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está entregado.",
    "NOMBRE_WEB": "Entregado"
  },
  {
    "KEY_ESTADO_FISICO": "20",
    "NOMBRE": "PROVEEDOR/TRANSITO",
    "DESCRIPCION": "Envios entregados a un Proveedor posicionados en Arrastre",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en uno de nuestro vehículos siendo transportado a la localidad de destino. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "En ruta a localidad destino"
  },
  {
    "KEY_ESTADO_FISICO": "21",
    "NOMBRE": "PROVEEDOR/DELEGACION",
    "DESCRIPCION": "Envios entregados a un Proveedor posicionados en alguna de sus delegaciones",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en nuestras instalaciones de destino y lo estamos clasificando. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "En destino"
  },
  {
    "KEY_ESTADO_FISICO": "22",
    "NOMBRE": "PROVEEDOR/ESTACIONADO",
    "DESCRIPCION": "Envios entregados a un Proveedor y que este Estaciona por alguna incidencia",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío no ha podido ser entregado por (Incidencia-Motivo).",
    "NOMBRE_WEB": "En almacén"
  },
  {
    "KEY_ESTADO_FISICO": "23",
    "NOMBRE": "PROVEEDOR/EN REPARTO",
    "DESCRIPCION": "Envios entregados a un Proveedor asignados a un conductor en reparto",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío se encuentra en reparto. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "En reparto"
  },
  {
    "KEY_ESTADO_FISICO": "24",
    "NOMBRE": "PROVEEDOR/SIN RECEPCION",
    "DESCRIPCION": "Son los envíos que tienen un origen en el Proveedor",
    "FINAL": " generalmente devoluciones de estos",
    "DESCRIPCION_WEB": "0",
    "NOMBRE_WEB": "Ya hemos recibido la información de su envío"
  },
  {
    "KEY_ESTADO_FISICO": "36",
    "NOMBRE": "RECEPCIONADO EN OFICINA",
    "DESCRIPCION": "Envíos que se recepcionan en las Oficinas de Correos",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío se encuentra admitido en la Oficina de Correos para ser entregado en la dirección de destino",
    "NOMBRE_WEB": "Admitido en oficina de Correos"
  },
  {
    "KEY_ESTADO_FISICO": "37",
    "NOMBRE": "PARALIZADO",
    "DESCRIPCION": "El cliente ordena parar la entrega del envío",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío se ha retenido por orden del cliente. Si necesita más información por favor contacte con su remitente",
    "NOMBRE_WEB": "Retenido"
  },
  {
    "KEY_ESTADO_FISICO": "60",
    "NOMBRE": "PRUEBA",
    "DESCRIPCION": "Estado prueba",
    "FINAL": "0",
    "DESCRIPCION_WEB": "",
    "NOMBRE_WEB": ""
  },
  {
    "KEY_ESTADO_FISICO": "40",
    "NOMBRE": "DEVUELTO DESDE P. CONVENIENCIA",
    "DESCRIPCION": "Estado inicial de Envíos que se devuelven en punto de conveniencia (el original estará DEVUELTO)",
    "FINAL": "0",
    "DESCRIPCION_WEB": "",
    "NOMBRE_WEB": ""
  },
  {
    "KEY_ESTADO_FISICO": "32",
    "NOMBRE": "PROVEEDOR/INFORMADA DEVOLUCION",
    "DESCRIPCION": "Envios que el proveedor nos informa que devuelve. Nos sirve para monitorizar aquellos envios que el proveedor devuelve. Si la operativa es correcta por parte de proveedor deberian haber un estado DEVUELTO a continuacion",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío se ha devuelto a origen. Si necesita más información por favor contacte con su remitente",
    "NOMBRE_WEB": "Devuelto"
  },
  {
    "KEY_ESTADO_FISICO": "38",
    "NOMBRE": "DEPOSITADO PUNTO CONVENIENCIA",
    "DESCRIPCION": "Envíos depositados en punto de conveniencia por un conductor para su entrega a destinatario final",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío se encuentra en el punto de conveniencia y en breve recibirá las instrucciones para recogerlo",
    "NOMBRE_WEB": "En punto de conveniencia"
  },
  {
    "KEY_ESTADO_FISICO": "33",
    "NOMBRE": "PROVEEDOR/CESION ALM. ADUANA",
    "DESCRIPCION": "El proveedor de Aduanas hace una cesion completa del envio al agente aduanero del destinatario",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está siendo gestionado por la aduana",
    "NOMBRE_WEB": "En tramite aduanero"
  },
  {
    "KEY_ESTADO_FISICO": "25",
    "NOMBRE": "PROVEEDOR/ARRASTRE",
    "DESCRIPCION": "Arrastre proveedor",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en uno de nuestro vehículos siendo transportado a la localidad destino. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "En ruta a localidad de destino"
  },
  {
    "KEY_ESTADO_FISICO": "26",
    "NOMBRE": "PROVEEDOR/MAL TRANSITADO",
    "DESCRIPCION": "Mal transitado proveedor",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Por un error en la clasificación",
    "NOMBRE_WEB": " su envío no ha llegado al destino correcto. Ya hemos realizado las gestiones necesarias y su envío está siendo transportado a la localidad de destino. Lo recibirá en la fecha de entrega prevista."
  },
  {
    "KEY_ESTADO_FISICO": "27",
    "NOMBRE": "PROVEEDOR/DELEGACION ORIGEN",
    "DESCRIPCION": "Delegación origen proveedor",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en uno de nuestro vehículos siendo transportado a la localidad de destino. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "En ruta a localidad de destino"
  },
  {
    "KEY_ESTADO_FISICO": "28",
    "NOMBRE": "PROVEEDOR/DELEGACION DESTINO",
    "DESCRIPCION": "Delegación destino proveedor",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en nuestras instalaciones de destino",
    "NOMBRE_WEB": " y lo estamos clasificando para ponerlo en reparto. Lo recibirá en la fecha de entrega prevista."
  },
  {
    "KEY_ESTADO_FISICO": "29",
    "NOMBRE": "PROVEEDOR/REPARTO FALLIDO",
    "DESCRIPCION": "Reparto fallido proveedor",
    "FINAL": "0",
    "DESCRIPCION_WEB": "",
    "NOMBRE_WEB": "Se muestra la incidencia"
  },
  {
    "KEY_ESTADO_FISICO": "30",
    "NOMBRE": "PROVEEDOR/NUEVO REPARTO",
    "DESCRIPCION": "Nuevo reparto proveedor",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Hemos gestionado su envío y lo estamos clasificando para ponerlo en reparto. Lo recibirá en la fecha de entrega prevista.",
    "NOMBRE_WEB": "Nuevo reparto"
  },
  {
    "KEY_ESTADO_FISICO": "31",
    "NOMBRE": "PROVEEDOR/NO LOCALIZADO",
    "DESCRIPCION": "No localizado proveedor",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en proceso de gestión por nuestro departamento de Atención al cliente.",
    "NOMBRE_WEB": "En Gestión"
  },
  {
    "KEY_ESTADO_FISICO": "35",
    "NOMBRE": "DISPONIBLE EN PUNTO CONCERTADO",
    "DESCRIPCION": "Disponible en punto concertado",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está entregado en el centro concertado.",
    "NOMBRE_WEB": "Entregado en punto concertado"
  },
  {
    "KEY_ESTADO_FISICO": "39",
    "NOMBRE": "DISPONIBLE PUNTO CONVENIENCIA",
    "DESCRIPCION": "Envíos disponibles en punto de conveniencia para su entrega a destinatario final",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío ya está disponible en el punto de conveniencia para recogerlo ",
    "NOMBRE_WEB": "Disponible en punto de conveniencia"
  },
  {
    "KEY_ESTADO_FISICO": "41",
    "NOMBRE": "TRANSITO ESTACIONADOS",
    "DESCRIPCION": "Envios a los que se ha dado solucion recoger en nave en una delegacion donde no se permite recoger. Se transitan a una delegacion donde si se permite recoger en nave",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envio esta siendo transitado par poder ser recogido en nave",
    "NOMBRE_WEB": "En ruta a delegacion destino"
  },
  {
    "KEY_ESTADO_FISICO": "42",
    "NOMBRE": "RECOGIDO",
    "DESCRIPCION": "Lectura de bulto al ser recogido en cliente sin haber llegado a las instalaciones de CEX. Necesidad de estado creada en Valija Bancaria",
    "FINAL": "0",
    "DESCRIPCION_WEB": "Su envío está en uno de nuestros vehículos siendo transportado a la localidad de destino.",
    "NOMBRE_WEB": "En ruta a la localidad de destino"
  },
  {
    "KEY_ESTADO_FISICO": ""
  }
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


