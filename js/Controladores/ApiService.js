"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Función para cargar los Digimon
function CargarDigimon(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtener filtros del localStorage
        const filtros = JSON.parse(localStorage.getItem('filtros') || '[]');
        console.log(url);
        // Aplicar filtros si existen
        if (filtros !== "[]" && filtros.length !== 0) {
            console.log(filtros);
            if (filtros.nombre !== "") {
                url = url + "&name=" + filtros.nombre;
            }
            if (filtros.atributo !== "") {
                url = url + "&attribute=" + filtros.atributo;
            }
            if (filtros.nivel !== "") {
                console.log(url);
                url = url + "&level=" + filtros.nivel;
                console.log(url);
            }
        }
        console.log(url);
        // Crear una instancia de ApiCaller
        const apiCaller = new ApiCaller(url);
        // Llamar al método fetchData
        yield apiCaller.fetchData()
            .then((data) => {
            const digimoncards = [];
            for (const item of data.content) {
                let imagen = item.image.replace(/^"(.*)"$/, '$1');
                let digimon = new Card(item.id, item.name, imagen);
                digimoncards.push(digimon);
            }
            console.log(digimoncards);
            // Guardar el array digimoncards en localStorage
            localStorage.setItem('digimoncards', JSON.stringify(digimoncards));
            if (data.pageable) {
                let currentpage = data.pageable.currentPage;
                let nextpage = data.pageable.nextPage;
                let previouspage = data.pageable.previousPage;
                const totalpages = data.pageable.totalPages;
                let pagina = new Pagina(currentpage, nextpage, previouspage, totalpages);
                localStorage.setItem('pagina', JSON.stringify(pagina));
            }
            else {
                console.log("Fallo pageable");
            }
        })
            .catch((error) => {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
        });
    });
}
function CargartodosAtributos() {
    return __awaiter(this, void 0, void 0, function* () {
        localStorage.removeItem('filtroatributo');
        let siguientepag = "https://digi-api.com/api/v1/attribute?page=0";
        let listaatributo = [];
        while (siguientepag !== null) {
            siguientepag = yield CargarAtributo(siguientepag, listaatributo);
        }
        // Guardar el array de atributos en localStorage
        localStorage.setItem('filtroatributo', JSON.stringify(listaatributo));
    });
}
function CargarAtributo(url, listaatributo) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiCaller = new ApiCaller(url);
        try {
            const data = yield apiCaller.fetchData();
            for (const item of data.content.fields) {
                let dato = new Dato(item.id, item.name);
                listaatributo.push(dato);
            }
            // Retornar el valor de nextPage si existe, de lo contrario, retorna null
            return data.pageable.nextPage || null;
        }
        catch (error) {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
            // Retornar null en caso de error
            return null;
        }
    });
}
function Cargartodoslevels() {
    return __awaiter(this, void 0, void 0, function* () {
        localStorage.removeItem('filtronivel');
        let listalevels = [];
        let siguientepag = "https://digi-api.com/api/v1/level?page=0";
        while (siguientepag !== null) {
            siguientepag = yield CargarLevels(siguientepag, listalevels);
        }
        // Guardar el array de niveles en localStorage
        localStorage.setItem('filtronivel', JSON.stringify(listalevels));
    });
}
// Función para cargar niveles de Digimon
function CargarLevels(url, listalevels) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiCaller = new ApiCaller(url);
        try {
            const data = yield apiCaller.fetchData();
            for (const item of data.content.fields) {
                let dato = new Dato(item.id, item.name);
                listalevels.push(dato);
            }
            // Retornar el valor de nextPage si existe, de lo contrario, retorna null
            return data.pageable.nextPage || null;
        }
        catch (error) {
            // Manejar el error si la llamada falla
            console.error('Error occurred:', error);
            // Retornar null en caso de error
            return null;
        }
    });
}
//# sourceMappingURL=ApiService.js.map