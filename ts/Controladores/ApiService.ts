// function CargarDigimon(pagina: number) {
//     const apiUrl = `https://digi-api.com/api/v1/digimon?pageSize=10&xAntibody=false&page=${pagina}`;
//     // Crear una instancia de ApiCaller
//     const apiCaller = new ApiCaller(apiUrl);

//     // Llamar al método fetchData
//     apiCaller.fetchData()
//         .then((data: any) => {
//             const digimoncards = [];
//             console.log(data.content);
//             for (const item of data.content) {
//                 let imagen = item.image.replace(/^"(.*)"$/, '$1');
//                 let digimon = new Card(item.id, item.name, imagen);
//                 digimoncards.push(digimon);
//             }

//             // Guardar el array digimoncards en localStorage
//             localStorage.setItem('digimoncards', JSON.stringify(digimoncards));
//         })
//         .catch((error: any) => {
//             // Manejar el error si la llamada falla
//             console.error('Error occurred:', error);
//         });
// }

function CargarDigimon(pagina: number) {
    let apiUrl = `https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page=${pagina}`;
    
    const filtros = JSON.parse(localStorage.getItem('filtros') || '[]');

if(filtros!=="[]"&&filtros!==undefined){

    if(filtros.nombre!== undefined){
        apiUrl = apiUrl + "&name="+filtros.nombre;
    }
    if(filtros.tipo!==undefined){
        apiUrl = apiUrl + "&type="+filtros.tipo;
    }
    if(filtros.atributo!==undefined){
        apiUrl = apiUrl + "&attribute="+filtros.atributo;
    }
    if(filtros.nivel!==undefined){
        apiUrl = apiUrl + "&level="+filtros.nivel;
    }
    if(filtros.habitat!==undefined){
        apiUrl = apiUrl + "&field="+filtros.habitat;
    }
}
    const apiCaller = new ApiCaller(apiUrl);

    // Llamar al método fetchData
    apiCaller.fetchData()
        .then((data: any) => {
            const digimoncards = [];
            console.log(data.content);
            for (const item of data.content) {
                let imagen = item.image.replace(/^"(.*)"$/, '$1');
                console.log(item.name);
                let digimon = new Card(item.id, item.name, imagen);
                digimoncards.push(digimon);
            }

            // Guardar el array digimoncards en localStorage
            localStorage.setItem('digimoncards', JSON.stringify(digimoncards));
        })
        .catch((error: any) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });
}

function CargarTipos(){
    const url= "digi-api.com/api/v1/type";
    const apiCaller = new ApiCaller(url);

    // Llamar al método fetchData
    apiCaller.fetchData()
        .then((data: any) => {
            const listatipos = [];
            console.log(data.content);
            for (const item of data.content.fields) {
                let dato = new Dato(item.id, item.name);
                listatipos.push(dato);
            }

            // Guardar el array digimoncards en localStorage
            localStorage.setItem('listatipos', JSON.stringify(listatipos));
        })
        .catch((error: any) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });

}

function CargarAtributo(){
    const url= "digi-api.com/api/v1/attribute";
    const apiCaller = new ApiCaller(url);

    // Llamar al método fetchData
    apiCaller.fetchData()
        .then((data: any) => {
            const listaatributos = [];
            console.log(data.content);
            for (const item of data.content.fields) {
                let dato = new Dato(item.id, item.name);
                listaatributos.push(dato);
            }

            // Guardar el array digimoncards en localStorage
            localStorage.setItem('listaatributos', JSON.stringify(listaatributos));
        })
        .catch((error: any) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });

}

function CargarLevels(){
    const url= "digi-api.com/api/v1/level";
    const apiCaller = new ApiCaller(url);

    // Llamar al método fetchData
    apiCaller.fetchData()
        .then((data: any) => {
            const listalevels = [];
            console.log(data.content);
            for (const item of data.content.fields) {
                let dato = new Dato(item.id, item.name);
                listalevels.push(dato);
            }

            // Guardar el array digimoncards en localStorage
            localStorage.setItem('listalevels', JSON.stringify(listalevels));
        })
        .catch((error: any) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });

}

function CargarFields(){
    const url= "digi-api.com/api/v1/level";
    const apiCaller = new ApiCaller(url);

    // Llamar al método fetchData
    apiCaller.fetchData()
        .then((data: any) => {
            const listafields = [];
            console.log(data.content);
            for (const item of data.content.fields) {
                let dato = new Dato(item.id, item.name);
                listafields.push(dato);
            }

            // Guardar el array digimoncards en localStorage
            localStorage.setItem('listafields', JSON.stringify(listafields));
        })
        .catch((error: any) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });

}