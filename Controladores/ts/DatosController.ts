import { ApiCaller } from './ApiCaller';
import { Fields } from './../../Modelos/ts/Fields';
import { Digimon } from './../../Modelos/ts/Digimon';
import { Digi } from './../../Modelos/ts/Digi';


function mostrarDatos(id: number) {
    // URL de la API con el ID insertado
    const apiUrl = `https://digi-api.com/api/v1/digimon/${id}`;
  
    // Crear una instancia de ApiCaller
    const apiCaller = new ApiCaller(apiUrl);
  
    // Llamar al método fetchData
    apiCaller.fetchData()
      .then((data: any) => {
        const id = data.id;
        const nombre = data.name;
        const xAntibody = data.xAntibody;
        const imagen =data.images[0].href;
        const level = data.levels[0].level;
        const type = data.types[0].type;
        const attribute = data.attributes[0].attribute;
        const fields : Fields[] = data.fields.map((next: any) => {
          return new Fields(next.field, next.image);
      });
        const descripcion = data.descriptions[0].description;
        const skills = data.skills.map((skill: any) => skill.skill);
        const preEvolutions: Digi[] = data.priorEvolutions.map((prior: any) => {
          return new Digi(prior.digimon, prior.image, prior.condition);
      });
      const nextEvolutions : Digi[] = data.nextEvolutions.map((next: any) => {
        return new Digi(next.digimon, next.image, next.condition);
    });
  
       let digimonactual = new Digimon(id,nombre,xAntibody,imagen,level,type,attribute,fields,descripcion,skills,preEvolutions,nextEvolutions);

      })
      .catch((error: any) => {
        // Manejar el error si la llamada falla
        console.error('Error occurred:', error);
      });



      function pintardatos(digimonactual){
      
      }
  }