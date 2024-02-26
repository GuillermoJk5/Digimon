"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCaller = void 0;
class ApiCaller {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    fetchData() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.apiUrl,
                method: 'GET',
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('Error fetching data:', textStatus);
                    reject(errorThrown);
                }
            });
        });
    }
}
exports.ApiCaller = ApiCaller;
//LISTA DE DIGIMONS   digi-api.com/api/v1/digimon?pageSize=10       
//                    digi-api.com/api/v1/digimon?xAntibody=false&pageSize=10
//lista de habitats   digi-api.com/api/v1/field
//lista de atributos  digi-api.com/api/v1/attribute
//lista de niveles    digi-api.com/api/v1/level
//lista de tipos      digi-api.com/api/v1/type
//# sourceMappingURL=ApiCaller.js.map