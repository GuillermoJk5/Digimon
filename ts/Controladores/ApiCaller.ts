export class ApiCaller {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public fetchData<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.apiUrl,
        method: 'GET',
        success: function(data) {
          resolve(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Error fetching data:', textStatus);
          reject(errorThrown);
        }
      });
    });
  }
}

    //LISTA DE DIGIMONS   digi-api.com/api/v1/digimon?pageSize=10       
    //                    digi-api.com/api/v1/digimon?xAntibody=false&pageSize=10
    //lista de habitats   digi-api.com/api/v1/field
    //lista de atributos  digi-api.com/api/v1/attribute
    //lista de niveles    digi-api.com/api/v1/level
    //lista de tipos      digi-api.com/api/v1/type
  
  
  