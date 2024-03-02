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
    CargarSelects();
    // rellenarSelect("filtrotipo");
    // rellenarSelect("filtrohabitat");
});
function CargarSelects() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Cargartodoslevels();
        yield CargartodosAtributos();
        rellenarSelect("filtronivel");
        rellenarSelect("filtroatributo");
    });
}
function rellenarSelect(nombre) {
    const select = $("#" + nombre);
    let lista = JSON.parse(localStorage.getItem(nombre) || '[]');
    lista.forEach((element) => {
        const option = $('<option></option>').attr('value', element.name).text(element.name);
        select.append(option);
    });
}
function quitarfiltro() {
    localStorage.removeItem('filtros');
    actualizar();
    $("#filtronivel").val("");
    $("#filtroatributo").val("");
}
function filtrar() {
    function obtenerValorComoString(valor) {
        return typeof valor === 'string' ? valor : undefined;
    }
    let nombre = obtenerValorComoString($("#filtronombre").val());
    let nivel = obtenerValorComoString($("#filtronivel").val());
    let atributo = obtenerValorComoString($("#filtroatributo").val());
    let filtros = {
        nombre: nombre,
        nivel: nivel,
        atributo: atributo
    };
    localStorage.setItem('filtros', JSON.stringify(filtros));
    actualizar();
}
function actualizar() {
    return __awaiter(this, void 0, void 0, function* () {
        $('#lista').empty();
        yield CargarDigimon("https://digi-api.com/api/v1/digimon?pageSize=30&xAntibody=false&page=0");
        actualizarvista();
    });
}
//# sourceMappingURL=CabeceraController.js.map