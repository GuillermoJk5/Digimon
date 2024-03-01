// Función para mostrar los datos de un Digimon
function mostrarDatos(id: string) {
  // URL de la API con el ID insertado
  const apiUrl = `https://digi-api.com/api/v1/digimon/${id}`;

  // Crear una instancia de ApiCaller
  const apiCaller = new ApiCaller(apiUrl);

  // Llamar al método fetchData
  apiCaller.fetchData()
    .then((data: any) => {
      // Generar un objeto Digimon a partir de los datos obtenidos
      let digimonactual = generardigimon(data);
      // Pintar los datos del Digimon en la página
      pintarDatos(digimonactual);
    })
    .catch((error: any) => {
      // Manejar el error si la llamada falla
      console.error('Error occurred:', error);
    });
}

// Función para rescatar el parámetro 'id' de la URL
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

// Función para pintar los datos de un Digimon en la página
function pintarDatos(digimon: Digimon) {
  // Clonar el contenedor de la página
  let contenedor = $("#contenedor").clone(true, true);
  // Seleccionar el cuerpo del documento
  const body = $('body');
  // Remover el atributo 'id' del contenedor clonado para evitar duplicados
  contenedor.remove('id');
  // Cambiar el texto del nombre del Digimon
  contenedor.find('#nombre').text(digimon.name); 
  // Cambiar la fuente de la imagen del Digimon
  contenedor.find('#imagen').attr('src', digimon.imagen); 
  // Cambiar el texto del nivel del Digimon
  const levels = digimon.level.join('/');
  contenedor.find('#level').text("Etapa Evolutiva: "+levels); 
  // Cambiar el texto del atributo del Digimon
  const atributes = digimon.attribute.join('/');
  contenedor.find('#atributo').text("Atributo: "+atributes); 
  contenedor.find('#tipo').text("Tipo: "+digimon.type); 

  // Pintar los campos del Digimon
  const fieldrow=contenedor.find("#fieldsrow");
  digimon.fields.forEach(field => {
      let colfields = $("#fields").clone(true, true);
      colfields.find("#fieldtext").text(field.nombre);
      colfields.find("#fieldimg").attr('src', field.imagen);
      colfields.appendTo(fieldrow).show();
  });

  // Cambiar el texto de la descripción del Digimon
  contenedor.find("#descripcion").text(digimon.descriptions);
  
  // Pintar las habilidades del Digimon
  const skills=contenedor.find("#listaskill");
  digimon.skills.forEach(skill => {
      let skillcampo = $("#skill").clone(true, true);
      skillcampo.find("#skillname").text(skill.name);
      skillcampo.find("#skilldescripcion").text(skill.descripcion);
      skillcampo.appendTo(skills).show();
  });

  // Pintar las evoluciones previas del Digimon
  const prelista=contenedor.find("#prelista");
  digimon.priorEvolutions.forEach(prior => {
      let pre = $("#pre").clone(true, true);
      pre.removeAttr('onclick');
      pre.find("#prenombre").text(prior.nombre);
      // pre.find("#precondicion").text(prior.condicion);
      pre.find("#preimg").attr('src', prior.imagen);
      pre.on('click', () => {
        cambiardigimon(prior.nombre);
    });
      pre.appendTo(prelista).show();
  });

  // Pintar las evoluciones siguientes del Digimon
  const nextlista=contenedor.find("#nextlista");
  digimon.nextEvolutions.forEach(nexto => {
      let next = $("#next").clone(true, true);
      next.removeAttr("onclick");
      next.find("#nextnombre").text(nexto.nombre);
      // next.find("#nextcondicion").text(nexto.condicion);
      next.find("#nextimg").attr('src', nexto.imagen);
      next.on('click', () => {
        cambiardigimon(nexto.nombre);
    });
      next.appendTo(nextlista).show();
  });

  // Agregar el contenedor con los datos del Digimon al cuerpo del documento y mostrarlo
  contenedor.appendTo(body).show();
}

// Función para generar un objeto Digimon a partir de los datos obtenidos de la API
function generardigimon(data:any){
  // Establecer valores predeterminados
  const predeterminado :string[]= ["Sin Datos"]; 
  // Extraer datos del objeto 'data' o utilizar valores predeterminados si no existen
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
  const descripcion = (data.descriptions && data.descriptions.length > 0) ? 
      data.descriptions.map((descripcion:any) => {
          if (descripcion.language === "en_us") {
              return descripcion.description;
          }
      }).filter(Boolean)[0] // Filter out undefined values and get the first one
      : predeterminado;
  const skills:Skill[] = (data.skills && data.skills.length > 0) ? data.skills.map((skill: any) => {
      return new Skill(skill.skill,skill.description);
  }) : [new Skill(predeterminado[0],predeterminado[0])];
  const preEvolutions: Digi[] = (data.priorEvolutions && data.priorEvolutions.length > 0) ? data.priorEvolutions.map((prior: any) => {
      return new Digi(prior.digimon, prior.image, prior.condition);
  }) : [new Digi(predeterminado[0], predeterminado[0], predeterminado[0])];
  const nextEvolutions: Digi[] = (data.nextEvolutions && data.nextEvolutions.length > 0) ? data.nextEvolutions.map((next: any) => {
      return new Digi(next.digimon, next.image, next.condition);
  }) : [new Digi(predeterminado[0], predeterminado[0], predeterminado[0])];
  // Convertir el nivel y el atributo en arreglos si no lo son
  let level2:string[]=[]
  if(levels[0]!=="Sin Datos"){
      levels.forEach((level:any) => {
          level2.push(level.level);
      });
  } else {
      level2=levels;
  }
  let atribute2:string[]=[]
  if(attributes[0]!=="Sin Datos"){
      attributes.forEach((at:any) => {
          atribute2.push(at.attribute);
      });
  } else {
      atribute2=attributes;
  }
 // Ordenar las evoluciones por nombre del Digimon
  preEvolutions.sort((a, b) => a.nombre.localeCompare(b.nombre));
  nextEvolutions.sort((a, b) => a.nombre.localeCompare(b.nombre));
  // Crear y retornar un objeto Digimon con los datos obtenidos
  let digimonactual = new Digimon(id,nombre,xAntibody,imagen,level2,type,atribute2,fields,descripcion,skills,preEvolutions,nextEvolutions);
   console.log(digimonactual);
   return digimonactual;
 
}

// Obtener el parámetro 'id' de la URL
const parametro = rescatarparametro();

// Verificar si el parámetro 'id' es una cadena
if (typeof parametro === 'string') {
  // Mostrar los datos del Digimon correspondiente al 'id'
  mostrarDatos(parametro);
}

function cambiardigimon(nombre:string){
    console.log("Mostrar >"+nombre);
    window.location.href="Datos.html?id="+nombre;
}