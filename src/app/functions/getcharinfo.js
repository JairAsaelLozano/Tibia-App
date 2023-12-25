
export default function getcharinfo(name) {

  
   async function  personaje () {
    try {
      const response = await fetch(`https://api.tibiadata.com/v4/character/${name}`); // Reemplaza con tu URL
      if (!response.ok) {
        throw new Error('Error al obtener los datos'); // Manejo de errores para respuestas no exitosas
      }
      const data = await response.json(); // Convierte la respuesta a JSON
      //console.log(data); // Muestra la respuesta en la consola (puedes hacer cualquier otra cosa con los datos)
      //console.log("1")
      return data.character; // Retorna los datos si necesitas usarlos en otro lugar
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return null; // Retorna null o maneja el error según sea necesario
    }
  }
 

  return personaje();


}