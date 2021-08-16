//Estructura básica de una promesa
const somethingWillHappen = () => {
    return new Promise((resolve, reject) => {  //Promise, palabra reservada siempre lleva una solución y un error
        if (true) {                            //válido un estado para ejecutar la promesa
            resolve('Hey!');                    //solución SIEMPRE con resolve
        } else {
            reject('Whooops!');                 //error SIEMPRE con reject
        }
    });
};

somethingWillHappen()
    .then(response => console.log(response))     //.then es para dar la respuesta de esa promesa
    .catch(err => console.error(err));              //.catch es para el error.


//Utilizando el ERROR para debuggear
const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if(true){
            setTimeout(() => {                      //Agregamos un tiempo para simular que se demora mientras recibe respuesta de una API
                resolve('True');
            }, 2000)
        } else {
            const error = new Error ('Whooop!');    //BUENA PRACTICA -> Error para que nos permita debuguear mejor cuando algo falla.
            reject(error);
        }
    });
};

somethingWillHappen2()
    .then(response => console.log(response))
    .catch(err => console.error(err));  


//Utilizar Varias promesas al tiempo.
Promise.all([somethingWillHappen(), somethingWillHappen2()])  //Con el comando Promise.all puedo ejecutar varias promesas ya previamente definidas
    .then(response => {
        console.log('Array of results', response);  //mostrar string,  variable, como van a ser 2 respuestas me las va a agrupar en un array. se separa con, para que muestre por separado pq con un + concatena todo en un string. 
    })
    .catch(err => {
        console.error(err);                       //Capturar los errores.
    })