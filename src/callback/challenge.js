let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;  //Módulo para hacer peticiones.
let API = 'https://rickandmortyapi.com/api/character/'; //Dirección de la api que nos vamos a conectar.


function fetchData(url_api, callback) {                   //Funcion para traer info del api
    let xhttp = new XMLHttpRequest();                     // XMLHttpRequest es una instancia instalada en Node.js. 
    xhttp.open('GET', url_api, true);                      //.open pasarle cual es la peticion -> GET, funcion de backend para traer datos, true= activar el asincronismo en http
    xhttp.onreadystatechange = function (event) {           //onready... es para escuchar el estado de xhttp
        if(xhttp.readyState === 4) {                        //validar el stado de xhttp.. hay diferentes estados revisar los links
            if(xhttp.status === 200) {                      //200 es que todo este OK
                callback(null, JSON.parse(xhttp.responseText)) //primer valor de un callback es el error y luego el otro. Voy a recibir un JSON de la api y lo .parse para que convierta el String a datos
            } else {
                const error = new Error('Error ' + url_api);  // devovler un error si los estados no son los correctos
                return callback(error, null)
            }
        }
    }
    xhttp.send();  //Enviar la solicitud.
}
//Se construye el orden de las peticiones. ESTO DEPENDE DE LA CONFIGURACIÓN DE LA API EN POSTMAN SE REVISA.
fetchData(API, function(error1, data1){                           //Primera petición. Lista del personaje
    if(error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function(error2,data2){      //Id del personaje. el número [0] es la posición dentro del array "results" en la api
        if(error2) return console.error(error2)
        fetchData(data2.origin.url, function(error3, data3){            //Dimensión del personaje.
            if(error3) return console.error(error3);
            console.log(data1.info.count);       //resultados que nos trae la api. .info.count así estés establecido en la api.
            console.log(data2.name);
            console.log(data3.dimension);

            /* console.log(data1.results[0].id);             //Valores para entender que hace y que toma en cada fetchData
            console.log(API);
            console.log(API + data1.results[0].id);
            console.log(data2.origin.url); */

        });
    })
});