'use client';
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Bosses() {
  const [bosses, setBosses] = useState([]); // Estado para almacenar el término de búsqueda

  const handleWorldChange = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    const selectedWorld = event.target.value; // Usar directamente el valor seleccionado
    
    console.log(selectedWorld)
    if(selectedWorld!=''){
      const fetchData = async () => {
        try {
          const bossData = await fetch(`../api/getboss/${selectedWorld}`, {
            method: "GET",
            headers:{
              "Content-Type": "application/json"
            }
          });
          const BossDataFinal = await bossData.json()
          setBosses(BossDataFinal)
          console.log(BossDataFinal)
        } catch (error) {
          //console.error("Error fetching boss data:", error);
          // Manejar errores aquí si es necesario
      
        }
      };
    
      fetchData(); // Llamada a la función asíncrona dentro de useEffect
    
      //Esta función de limpieza se ejecuta si el componente se desmonta o cuando el efecto cambia
      return () => {
        // Código de limpieza (si es necesario)
      };
    }
    
  }


  
  return (
  
<main className="flex flex-col min-h-screen items-center justify-between">
  <div className="w-full bg-blue-500 py-4 fixed">
    {/* Aquí puedes poner tu menú */}
    {/* Por ejemplo: */}
    <nav className="flex justify-center">
      <ul className="flex space-x-4">
        <li className="text-white font-semibold hover:underline cursor-pointer"><Link href='../'>Busqueda de Personaje</Link></li>
        <li className="text-white font-semibold hover:underline cursor-pointer"><Link href='/bosses'>Bosses</Link></li>
      </ul>
    </nav>
  </div>

  {/* Contenido principal */}
  <div className="flex flex-col items-center justify-top flex-1 w-full bg-white p-24">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-black">Lista de Criaturas</h1>
      {/* Aquí coloca tu select */}
      <div className="w-64 mb-8">
        <select onChange={handleWorldChange} className="block appearance-none w-full bg-white border border-blue-500 text-blue-500 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
          <option value="" disabled selected>Elige una opción</option>
          <option value="Solidera">Solidera</option>
          <option value="Antica">Antica</option>
          <option value="Quintera">Quintera</option>
          <option value="Runera">Runera</option>
          <option value="Wintera">Wintera</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9 11l4-4 4 4-4 4-4-4z"/>
          </svg>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {/* Aquí se muestran las criaturas */}
      {
        bosses !== null ? 
        bosses.map((boss, index) => (
          <div key={index} className="flex items-center border rounded-lg p-4 shadow-md">
            {/* Contenido de la criatura */}
            <img src={"https://guildstats.eu/" + boss.Url} alt={boss.name} className="w-20 h-20 object-cover mr-4" />
            <div className="text-black">
              <h2 className="text-lg font-semibold ">{boss.Name}</h2>
              {boss.Possibility >= 30 ? 
              <p className="text-green">Probabilidad de Aparición: <span style={{ color: 'green' }}>{boss.Possibility}</span></p>
               : <p className="text-yellow">Probabilidad de Aparición: <span style={{ color: 'red' }}>{boss.Possibility}</span></p>}
              <p>Última Vez Visto: {boss.LastSeen}</p>
              {/* Agrega más detalles si los tienes */}
            </div>
          </div>
         ))
         : <h1 className="text-3xl font-bold mb-4 text-black mt-20">No tiene bosses para Mostrar</h1>
      }
    </div>
  </div>

  {/* Pie de página u otro contenido al final */}
  <footer className="bg-blue-500 text-white py-4 w-full">
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg font-semibold">¡Gracias por visitar!</p>
      <p className="text-sm">©JairAsaelLozanoFraire github/JairAsaelLozano</p>
    </div>
  </footer>
</main>


  )
}
