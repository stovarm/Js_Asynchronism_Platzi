let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function fetchData(url_api, callback) {                   //Funcion para traer info del api
    let xhttp = new XMLHttpRequest();                     // XMLHttpRequest es una instancia instalada en Node.js
    xhttp.open('GET', url_api, true);                      //.open psarle cual es la peticion -> GET, funcion de backend para traer datos, true= activar el asincronismo en http
    xhttp.onreadystatechange = function (event) {           //onready... es para escuchar el estado de xhttp
        if(xhttp.readyState === 4) {                        //validar el stado de xhttp.. hay diferentes estados revisar los links
            if(xhttp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText)) //primer valor de un callback es el error y luego el otro. Voy a recibir un JSON de la api y lo .parse para que convierta el String a datos
            } else {
                const error = new Error('Error ' + url_api);  // devovler un error si los estados no son los correctos
                return callback(error, null)
            }
        }
    }
    xhttp.send();  //Enviar la solicitud.
}