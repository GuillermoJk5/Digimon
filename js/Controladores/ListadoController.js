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
document.addEventListener('DOMContentLoaded', function () {
    cargarpagina();
});
function cargarpagina() {
    var _a;
    let pagina = (_a = localStorage.getItem('pagina')) !== null && _a !== void 0 ? _a : "0";
    CargarDigimon(parseInt(pagina));
    $('#paginaactual').text(pagina);
    actualizarvista();
}
function pintarlista(digimon) {
    const listado = $("#lista");
    let copia = $("#cartica").clone(true, true);
    copia.removeAttr('id');
    copia.find('.card-title').text(digimon.nombre);
    copia.find('.card-img-top').attr('src', digimon.imagen);
    copia.find('.enlace-digimon').attr('href', "Datos.html?id=" + digimon.id);
    copia.appendTo(listado).show();
}
function pagAtras() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("PATRAS");
        let pagina = (_a = localStorage.getItem('pagina')) !== null && _a !== void 0 ? _a : "0";
        let paginanumber = parseInt(pagina);
        if (paginanumber > 0) {
            paginanumber--;
            localStorage.setItem('pagina', paginanumber.toString());
        }
        $('#lista').empty();
        yield CargarDigimon(paginanumber);
        $('#paginaactual').text(paginanumber.toString());
        actualizarvista();
    });
}
function pagAdelante() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("PALANTE");
        let pagina = (_a = localStorage.getItem('pagina')) !== null && _a !== void 0 ? _a : "0";
        let paginanumber = parseInt(pagina);
        if (paginanumber < 49) {
            paginanumber++;
            localStorage.setItem('pagina', paginanumber.toString());
        }
        $('#lista').empty();
        yield CargarDigimon(paginanumber);
        $('#paginaactual').text(paginanumber.toString());
        actualizarvista();
    });
}
function actualizarvista() {
    let digimondcardslist = [];
    const digimoncardsString = localStorage.getItem('digimoncards');
    if (digimoncardsString !== null) {
        digimondcardslist = JSON.parse(digimoncardsString);
        console.log(digimondcardslist);
        digimondcardslist.forEach((digimon) => {
            pintarlista(digimon);
        });
    }
}
//# sourceMappingURL=ListadoController.js.map