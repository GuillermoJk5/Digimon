// Función para cargar los Digimon
async function CargarDigimon(url:string) {
    console.log(url);
    // let apiUrl = `https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page=${pagina}`;
    
    // Obtener filtros del localStorage
    const filtros = JSON.parse(localStorage.getItem('filtros') || '[]');

    // Aplicar filtros si existen
    // if(filtros!=="[]"&&filtros!==undefined){
    //     if(filtros.nombre!== undefined){
    //         apiUrl = apiUrl + "&name="+filtros.nombre;
    //     }
    //     if(filtros.tipo!==undefined){
    //         apiUrl = apiUrl + "&type="+filtros.tipo;
    //     }
    //     if(filtros.atributo!==undefined){
    //         apiUrl = apiUrl + "&attribute="+filtros.atributo;
    //     }
    //     if(filtros.nivel!==undefined){
    //         apiUrl = apiUrl + "&level="+filtros.nivel;
    //     }
    //     if(filtros.habitat!==undefined){
    //         apiUrl = apiUrl + "&field="+filtros.habitat;
    //     }
    // }

    // Crear una instancia de ApiCaller
    const apiCaller = new ApiCaller(url);

    // Llamar al método fetchData
   await apiCaller.fetchData()
        .then((data: any) => {


            const digimoncards = [];
            for (const item of data.content) {
                let imagen = item.image.replace(/^"(.*)"$/, '$1');
                let digimon = new Card(item.id, item.name, imagen);
                digimoncards.push(digimon);
                
            }
            console.log(digimoncards);
            // Guardar el array digimoncards en localStorage
            localStorage.setItem('digimoncards', JSON.stringify(digimoncards));
       
       

            if(data.pageable){
                console.log("pagina>"+data.toString());
                let currentpage =  data.pageable.currentPage;
                let nextpage =  data.pageable.nextPage;
                let previouspage = data.pageable.previousPage;
                const totalpages=data.pageable.totalPages;
                let pagina = new Pagina(currentpage,nextpage,previouspage,totalpages)
                localStorage.setItem('pagina', JSON.stringify(pagina));
            }else{
                console.log("Fallo pageable");
            }
 })
 .catch((error: any) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });
           
}

// Función para cargar tipos de Digimon
function CargarTipos(){
    const url= "digi-api.com/api/v1/type";
    const apiCaller = new ApiCaller(url);

    // Llamar al método fetchData
    apiCaller.fetchData()
        .then((data: any) => {
            const listatipos = [];
            for (const item of data.content.fields) {
                let dato = new Dato(item.id, item.name);
                listatipos.push(dato);
            }
            // Guardar el array de tipos en localStorage
            localStorage.setItem('listatipos', JSON.stringify(listatipos));
        })
        .catch((error: any) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });
}

// Función para cargar atributos de Digimon
function CargarAtributo(){
    const url= "digi-api.com/api/v1/attribute";
    const apiCaller = new ApiCaller(url);

    // Llamar al método fetchData
    apiCaller.fetchData()
        .then((data: any) => {
            const listaatributos = [];
            for (const item of data.content.fields) {
                let dato = new Dato(item.id, item.name);
                listaatributos.push(dato);
            }
            // Guardar el array de atributos en localStorage
            localStorage.setItem('listaatributos', JSON.stringify(listaatributos));
        })
        .catch((error: any) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });
}

// Función para cargar niveles de Digimon
function CargarLevels(){
    const url= "digi-api.com/api/v1/level";
    const apiCaller = new ApiCaller(url);

    // Llamar al método fetchData
    apiCaller.fetchData()
        .then((data: any) => {
            const listalevels = [];
            for (const item of data.content.fields) {
                let dato = new Dato(item.id, item.name);
                listalevels.push(dato);
            }
            // Guardar el array de niveles en localStorage
            localStorage.setItem('listalevels', JSON.stringify(listalevels));
        })
        .catch((error: any) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });
}

// Función para cargar campos de Digimon
function CargarFields(){
    const url= "digi-api.com/api/v1/level"; // Esta URL parece ser incorrecta, debería ser para los campos de Digimon
    const apiCaller = new ApiCaller(url);

    // Llamar al método fetchData
    apiCaller.fetchData()
        .then((data: any) => {
            const listafields = [];
            for (const item of data.content.fields) {
                let dato = new Dato(item.id, item.name);
                listafields.push(dato);
            }
            // Guardar el array de campos en localStorage
            localStorage.setItem('listafields', JSON.stringify(listafields));
        })
        .catch((error: any) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });
}
