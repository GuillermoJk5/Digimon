"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiCaller_1 = require("./ApiCaller");
const Fields_1 = require("../Modelos/Fields");
const Digimon_1 = require("../Modelos/Digimon");
const Digi_1 = require("../Modelos/Digi");
function mostrarDatos(id) {
    // URL de la API con el ID insertado
    const apiUrl = `https://digi-api.com/api/v1/digimon/${id}`;
    // Crear una instancia de ApiCaller
    const apiCaller = new ApiCaller_1.ApiCaller(apiUrl);
    // Llamar al método fetchData
    apiCaller.fetchData()
        .then((data) => {
        const id = data.id;
        const nombre = data.name;
        const xAntibody = data.xAntibody;
        const imagen = data.images[0].href;
        const level = data.levels[0].level;
        const type = data.types[0].type;
        const attribute = data.attributes[0].attribute;
        const fields = data.fields.map((next) => {
            return new Fields_1.Fields(next.field, next.image);
        });
        const descripcion = data.descriptions[0].description;
        const skills = data.skills.map((skill) => skill.skill);
        const preEvolutions = data.priorEvolutions.map((prior) => {
            return new Digi_1.Digi(prior.digimon, prior.image, prior.condition);
        });
        const nextEvolutions = data.nextEvolutions.map((next) => {
            return new Digi_1.Digi(next.digimon, next.image, next.condition);
        });
        let digimonactual = new Digimon_1.Digimon(id, nombre, xAntibody, imagen, level, type, attribute, fields, descripcion, skills, preEvolutions, nextEvolutions);
    })
        .catch((error) => {
        // Manejar el error si la llamada falla
        console.error('Error occurred:', error);
    });
    function pintardatos(digimonactual) {
    }
}
//# sourceMappingURL=DatosController.js.map