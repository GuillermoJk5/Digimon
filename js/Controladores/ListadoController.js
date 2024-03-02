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
// Espera a que se cargue el DOM antes de ejecutar la función cargarpagina
document.addEventListener('DOMContentLoaded', function () {
    cargarpagina();
});
// Función para cargar la página
function cargarpagina() {
    return __awaiter(this, void 0, void 0, function* () {
        const paginajson = localStorage.getItem('pagina');
        let pagina = paginajson ? JSON.parse(paginajson) : { currentpage: "https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page=0" };
        yield CargarDigimon(pagina.currentpage);
        $('#paginaactual').text(pagina.currentpage);
        actualizarvista();
    });
}
// Función para pintar un digimon en la lista
function pintarlista(digimon) {
    const listado = $("#lista");
    let copia = $("#cartica").clone(true, true);
    copia.removeAttr('id');
    copia.find('.card-title').text(digimon.nombre);
    copia.find('.card-img-top').attr('src', digimon.imagen);
    copia.find('.enlace-digimon').attr('href', "Datos.html?id=" + digimon.id);
    copia.appendTo(listado).show();
}
// Función para cargar la página siguiente
function pagAdelante() {
    return __awaiter(this, void 0, void 0, function* () {
        let numpagina = 0;
        let pagina = new Pagina("0", "0", "0", "0");
        let paginajson = localStorage.getItem('pagina');
        if (paginajson !== null) {
            pagina = JSON.parse(paginajson);
            if (pagina.nextpage == "") {
                pagina.nextpage = "https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page=" + pagina.currentpage;
            }
            else {
                numpagina = parseInt(pagina.currentpage) + 1;
            }
        }
        $('#lista').empty();
        yield CargarDigimon(pagina.nextpage);
        $('#paginaactual').text(numpagina);
        actualizarvista();
    });
}
// Función para cargar la página anterior
function pagAtras() {
    return __awaiter(this, void 0, void 0, function* () {
        let numpagina = 0;
        let pagina = new Pagina("0", "0", "0", "0");
        let paginajson = localStorage.getItem('pagina');
        if (paginajson !== null) {
            pagina = JSON.parse(paginajson);
            if (pagina.previouspage == "") {
                pagina.previouspage = "https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page=" + pagina.currentpage;
            }
            else {
                numpagina = parseInt(pagina.currentpage) - 1;
            }
        }
        $('#lista').empty();
        yield CargarDigimon(pagina.previouspage);
        $('#paginaactual').text(numpagina);
        actualizarvista();
    });
}
// Función para actualizar la vista con los digimon almacenados en el localStorage
function actualizarvista() {
    const digimoncardsString = localStorage.getItem('digimoncards');
    if (digimoncardsString) {
        const digimondcardslist = JSON.parse(digimoncardsString);
        digimondcardslist.forEach((digimon) => {
            pintarlista(digimon);
        });
    }
}
//# sourceMappingURL=ListadoController.js.map