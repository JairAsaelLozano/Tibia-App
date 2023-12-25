
export default function getbossdaily() {

  
    async function  bossdaily () {
     try {
       const response = await fetch(`https://api.tibiadata.com/v4/boostablebosses`); // Reemplaza con tu URL
       if (!response.ok) {
         throw new Error('Error al obtener los datos'); // Manejo de errores para respuestas no exitosas
       }
       var data = await response.json(); // Convierte la respuesta a JSON
       data = data.boostable_bosses.boosted
       //  console.log(data); // Muestra la respuesta en la consola (puedes hacer cualquier otra cosa con los datos)
      //  console.log(data.boostable_bosses); // Muestra la respuesta en la consola (puedes hacer cualquier otra cosa con los datos)
      //  console.log(data.boostable_bosses.boosted); // Muestra la respuesta en la consola (puedes hacer cualquier otra cosa con los datos)
      //
       // console.log("1")
       return data; // Retorna los datos si necesitas usarlos en otro lugar
     } catch (error) {
       console.error('Error al obtener los datos:', error);
       return null; // Retorna null o maneja el error según sea necesario
     }
   }
  
 
   return bossdaily();
 
 
 }