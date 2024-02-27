
function mostrarDatos(id: string) {
    // URL de la API con el ID insertado
    const apiUrl = `https://digi-api.com/api/v1/digimon/${id}`;
  
    // Crear una instancia de ApiCaller
    const apiCaller = new ApiCaller(apiUrl);
  
    // Llamar al método fetchData
    apiCaller.fetchData()
      .then((data: any) => {
        
       let digimonactual=generardigimon(data);
      pintarDatos(digimonactual);

      })
      .catch((error: any) => {
        // Manejar el error si la llamada falla
        console.error('Error occurred:', error);
      });



     
  }

function rescatarparametro(){
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Verificar si se proporcionó un ID en la URL
if (id) {
    
    return id;
} else {
    console.log('No se proporcionó ningún ID en la URL');
}
}

const parametro = rescatarparametro();
if (typeof parametro === 'string') {
    mostrarDatos(parametro);
}

function pintarDatos(digimon: Digimon) {

        let contenedor = $("#contenedor").clone(true, true);
        const body = $('body');
        contenedor.remove('id');
        contenedor.find('#nombre').text(digimon.name); 
        contenedor.find('#imagen').attr('src', digimon.imagen); 
        const levels = digimon.level.join('/');
        contenedor.find('#level').text(levels); 
        const atributes = digimon.attribute.join('/');
        contenedor.find('#atributo').text(atributes); 
        contenedor.find('#tipo').text(digimon.type); 

        const fieldrow=contenedor.find("#fieldsrow");
        digimon.fields.forEach(field => {
          let colfields = $("#fields").clone(true, true);
          colfields.find("#fieldtext").text(field.nombre);
          colfields.find("#fieldimg").attr('src', field.imagen);
          colfields.appendTo(fieldrow).show();
        });

        contenedor.find("#descripcion").text(digimon.descriptions);
        
        const skills=contenedor.find("#listaskill");
        digimon.skills.forEach(skill => {
          let skillcampo = $("#skill").clone(true, true);
          skillcampo.find("#skillname").text(skill.name);
          skillcampo.find("#skilldescripcion").text(skill.descripcion);
          skillcampo.appendTo(skills).show();
        });

        contenedor.appendTo(body).show();
    }




function generardigimon(data:any){
  const predeterminado :string[]= ["Sin Datos"]; // Establecer el valor predeterminado aquí

const id = data.id || predeterminado;
const nombre = data.name || predeterminado;
const xAntibody = data.xAntibody || predeterminado;
const imagen = (data.images && data.images.length > 0) ? data.images[0].href : predeterminado[0];
const levels = (data.levels && data.levels.length > 0) ? data.levels : predeterminado;
const type = (data.types && data.types.length > 0) ? data.types[0].type : predeterminado[0];
const attributes = (data.attributes && data.attributes.length > 0) ? data.attributes : predeterminado;
const fields: Fields[] = (data.fields && data.fields.length > 0) ? data.fields.map((next: any) => {
  return new Fields(next.field, next.image);
}) : [new Fields(predeterminado[0], predeterminado[0])];
const descripcion = (data.descriptions && data.descriptions.length > 0) ? data.descriptions[0].description : predeterminado;
const skills:Skill[] = (data.skills && data.skills.length > 0) ? data.skills.map((skill: any) => {
  return new Skill(skill.skill,skill.description);
}) : [new Skill(predeterminado[0],predeterminado[0])];
const preEvolutions: Digi[] = (data.priorEvolutions && data.priorEvolutions.length > 0) ? data.priorEvolutions.map((prior: any) => {
  return new Digi(prior.digimon, prior.image, prior.condition);
}) : [new Digi(predeterminado[0], predeterminado[0], predeterminado[0])];
const nextEvolutions: Digi[] = (data.nextEvolutions && data.nextEvolutions.length > 0) ? data.nextEvolutions.map((next: any) => {
  return new Digi(next.digimon, next.image, next.condition);
}) : [new Digi(predeterminado[0], predeterminado[0], predeterminado[0])];
let level2:string[]=[]
if(levels[0]!=="Sin Datos"){

levels.forEach((level:any) => {
  level2.push(level.level);
});
}
else{
  level2=levels;
}
let atribute2:string[]=[]
if(attributes[0]!=="Sin Datos"){
attributes.forEach((at:any) => {
  atribute2.push(at.attribute);
});
}else{
  atribute2=attributes;
}
let digimonactual = new Digimon(id,nombre,xAntibody,imagen,level2,type,atribute2,fields,descripcion,skills,preEvolutions,nextEvolutions);
return digimonactual;
}

