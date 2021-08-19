const fetchData = require('../utils/fetchData');   //Traigo la promesa del otro archivo
const API = 'https://rickandmortyapi.com/api/character/';

fetchData(API)                //Ejecuto la promesa con el valor de mi API
    .then(data =>{
        console.log(data.info.count);
        return fetchData('${API}${data.results[0].id}') //Retorno una nueva petición con los nuevos datos
    })
    .then(data => {
        console.log(data.name)
        return fetchData(data.origin.url)
    })
    .then(data => {
        console.log(data.dimension)
    })
    .catch(err => console.error(err));