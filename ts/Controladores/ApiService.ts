// Función para cargar los Digimon
async function CargarDigimon(url:string) {    
    // Obtener filtros del localStorage
    const filtros = JSON.parse(localStorage.getItem('filtros') || '[]');
    console.log(url);
    // Aplicar filtros si existen
    if(filtros!=="[]"&&filtros.length!==0){
        console.log(filtros);
        if(filtros.nombre!== ""){
            url = url + "&name="+filtros.nombre;
        }
        if(filtros.atributo!==""){
            url = url + "&attribute="+filtros.atributo;
        }
        if(filtros.nivel!==""){
            console.log(url);
            url = url + "&level="+filtros.nivel;
            console.log(url);
        } 
    }
    console.log(url);
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

async function CargartodosAtributos() {
    localStorage.removeItem('filtroatributo');
    let siguientepag: string | null = "https://digi-api.com/api/v1/attribute?page=0"; 
    let listaatributo : Dato[]=[];

    while (siguientepag !== null) {
        siguientepag = await CargarAtributo(siguientepag,listaatributo);
    }
    
        // Guardar el array de atributos en localStorage
        localStorage.setItem('filtroatributo', JSON.stringify(listaatributo));

}

async function CargarAtributo(url: string,listaatributo:Dato[]): Promise<string | null> {
    const apiCaller = new ApiCaller(url);

    try {
        const data: any = await apiCaller.fetchData();
        
        for (const item of data.content.fields) {
            let dato = new Dato(item.id, item.name);
            listaatributo.push(dato);
        }

        // Retornar el valor de nextPage si existe, de lo contrario, retorna null
        return data.pageable.nextPage || null;
    } catch (error) {
        // Manejar el error si la llamada falla
        console.error('Error occurred:', error);
        // Retornar null en caso de error
        return null;
    }
}

async function Cargartodoslevels() {
    localStorage.removeItem('filtronivel');
    let listalevels : Dato[]=[];
    let siguientepag: string | null = "https://digi-api.com/api/v1/level?page=0"; 

    while (siguientepag !== null) {
        siguientepag = await CargarLevels(siguientepag,listalevels);
    }
            // Guardar el array de niveles en localStorage
    localStorage.setItem('filtronivel', JSON.stringify(listalevels));

}

// Función para cargar niveles de Digimon
async function CargarLevels(url: string,listalevels:Dato[]): Promise<string | null> {
    const apiCaller = new ApiCaller(url);

    try {
        const data: any = await apiCaller.fetchData();
        
        for (const item of data.content.fields) {
            let dato = new Dato(item.id, item.name);
            listalevels.push(dato);
            
        }


        // Retornar el valor de nextPage si existe, de lo contrario, retorna null
        return data.pageable.nextPage || null;
    } catch (error) {
        // Manejar el error si la llamada falla
        console.error('Error occurred:', error);
        // Retornar null en caso de error
        return null;
    }
}


