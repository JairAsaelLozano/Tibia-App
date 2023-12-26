'use client';
import getcharinfo from './functions/getcharinfo';
import getbossdaily from './functions/getdailyboost';
import { useState, useEffect } from 'react';
import Link from 'next/link'

export default function Home() {

      const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
      const [name, setname] = useState(''); // Estado para almacenar el término de búsqueda
      const [world, setworld] = useState(''); // Estado para almacenar el término de búsqueda
      const [level, setlevel] = useState(''); // Estado para almacenar el término de búsqueda
      const [house, sethouse] = useState(''); // Estado para almacenar el término de búsqueda
      const [title, settitle] = useState(''); // Estado para almacenar el término de búsqueda
      const [sex, setsex] = useState(''); // Estado para almacenar el término de búsqueda
      const [guild, setguild] = useState(''); // Estado para almacenar el término de búsqueda
      const [guildpos, setguildpos] = useState(''); // Estado para almacenar el término de búsqueda
      const [status, setstatus] = useState(''); // Estado para almacenar el término de búsqueda
      const [comment, setcomment] = useState(''); // Estado para almacenar el término de búsqueda
      const [vocation, setVocation] = useState(''); // Estado para almacenar el término de búsqueda
      const [othercharacter2, setothercharacter] = useState([]); // Estado para almacenar el término de búsqueda
      const [dailyboss, setdailyboss] = useState(''); // Estado para almacenar el término de búsqueda
  

  var character
  var othercharacter


  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    // Llama a la función getcharinfo con el término de búsqueda como parámetro
    setothercharacter([])
    character = await getcharinfo(searchTerm); //mando a llamar la informacion del personaje

    if(character!=null && character.other_characters!=null){ //valido para saber si tiene mas personajes o no
    othercharacter = character.other_characters;}else{
    othercharacter=null
    }
 
    {                                   //validaciones para todos los seteos, en caso de tener guilds o no se colocara 'None'
      if(character!=null){
        character = character.character;    //meto la informacion del personaje principal en la variable character
        setothercharacter(othercharacter)   //seteo la informacion de los demas personajes en el usestate que le corresponde
        if(character.guild.name!=null){
          setcomment(character.comment)
        }else{
          setcomment('None')
        }
        setname(character.name)
        setstatus(character.account_status)
        setworld(character.world)
        settitle(character.title)
        setVocation(character.vocation)
        if(character.houses!=null){
          sethouse(character.houses[0].name)
        }else{
          sethouse('None')
        }
        if(character.guild.name!=null){
          setguild(character.guild.name)
          setguildpos(character.guild.rank)
        }else{
          setguild('None')
          setguildpos('None')
        }
        setsex(character.sex)
        setlevel(character.level)
      }else{                            //en caso de que el personaje no haya sido encontrado, todo se setea a vacio
        setcomment('')
        setguild('')
        setguildpos('')
        setname('')
        setstatus('')
        setworld('')
        settitle('')
        sethouse('')
        setsex('')
        setlevel('')
        setVocation('')
      }
    }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bossData = await getbossdaily();
        setdailyboss(bossData)
        //console.log(bossData); // Esto mostrará los datos obtenidos de getbossdaily()
      } catch (error) {
        //console.error("Error fetching boss data:", error);
        // Manejar errores aquí si es necesario
      }
    };
  
    fetchData(); // Llamada a la función asíncrona dentro de useEffect
  
    // Esta función de limpieza se ejecuta si el componente se desmonta o cuando el efecto cambia
    return () => {
      // Código de limpieza (si es necesario)
    };
  }, []);
  


  return (
  
<main className="flex flex-col min-h-screen items-center justify-between">
  <div className="w-full bg-blue-500 py-4 fixed">
    {/* Aquí puedes poner tu menú */}
    {/* Por ejemplo: */}
    <nav className="flex justify-center">
      <ul className="flex space-x-4">
        <li className="text-white font-semibold hover:underline cursor-pointer"><Link href='/'>Busqueda de Personaje</Link></li>
        <li className="text-white font-semibold hover:underline cursor-pointer"><Link href='/bosses'>Bosses</Link></li>
      </ul>
    </nav>
  </div>
  
  {/* Contenido principal */}
  <div className="flex-col items-center justify-center flex-1 w-full bg-white p-24">
          <div className='grid grid-cols-3 gap-4'>      
             {/* Recuadro para la imagen */}
              <div className="flex items-center justify-center">
                <div className="h-50 w-50">
                  {/* Aquí puedes insertar tu imagen */}
                  <p className="text-m text-center text-green-500 font-bold text-gray-500">Boss Busted: </p>
                  <img  src={dailyboss.image_url} alt="Imagen" className="object-cover" />
                  <p className="text-m text-center decoration-stone-950 text-gray-500">{dailyboss.name}</p>
                </div>
                
              </div>
              {/*form*/}
            <form onSubmit={handleSubmit} className="flex items-center justify-center">
              {/* Input y botón*/}
              <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por personaje"
                className="border border-gray-300 rounded-md py-2 px-4 mr-2 text-black"
              />
              <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4">Buscar</button>
            </form>
             {/* Recuadro para la tercera imagen */}
             <div className="flex items-center justify-center">
                <div className="h-50 w-50">
                  {/* Aquí puedes insertar tu imagen */}
                  <p className="text-m text-center text-green-500 font-bold text-gray-500">Boss Busted: </p>
                  <img  src={dailyboss.image_url} alt="Imagen" className="object-cover" />
                  <p className="text-m text-center decoration-stone-950 text-gray-500">{dailyboss.name}</p>
                </div>
                
              </div>
    </div>

    
      {/*Personaje Principal*/}
      <div className="flex flex-col items-center justify-center  w-full bg-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-black">Personaje Buscado:{name}</h1>
        <table className="w-12/12 border rounded-xl overflow-hidden">
          <thead className=" bg-blue-500 text-white">
            <tr>
              <th className="font-semibold uppercase px-6 py-4">Nombre</th>
              <th className="font-semibold uppercase px-6 py-4">Level</th>
              <th className="font-semibold uppercase px-6 py-4">Vocation</th>
              <th className="font-semibold uppercase px-6 py-4">World</th>
              <th className="font-semibold uppercase px-6 py-4">Casa</th>
              <th className="font-semibold uppercase px-6 py-4">Title</th>
              <th className="font-semibold uppercase px-6 py-4">Sex</th>
              <th className="font-semibold uppercase px-6 py-4">Guild</th>
              <th className="font-semibold uppercase px-6 py-4">Guild Position</th>
              <th className="font-semibold uppercase px-6 py-4">Estatus</th>
              <th className="font-semibold uppercase px-6 py-4">Comentario</th>
            </tr>
          </thead>
          <tbody>
              <tr >
                <td className="px-6 py-4 text-black bg-sky-100">{name}</td>
                <td className="px-6 py-4 text-black bg-sky-100">{level}</td>
                <td className="px-6 py-4 text-black bg-sky-100">{vocation}</td>
                 <td className="px-6 py-4 text-black bg-sky-100">{world}</td>
                 <td className="px-6 py-4 text-black bg-sky-100">{house}</td>
                 <td className="px-6 py-4 text-black bg-sky-100">{title}</td>
                 <td className="px-6 py-4 text-black bg-sky-100">{sex}</td>
                  <td className="px-6 py-4 text-black bg-sky-100">{guild}</td>
                  <td className="px-6 py-4 text-black bg-sky-100">{guildpos}</td>
                  <td className="px-6 py-4 text-black bg-sky-100">{status}</td>
                  <td className="px-6 py-4 text-black bg-sky-100">{comment}</td>
              </tr>
          </tbody>
        </table>
      

  
      <div className="flex flex-col items-center justify-center  w-full bg-white p-8">
      {//otros personajes
      othercharacter2 !== null ? 
      othercharacter2.map((chars, index) =>
      
        <table key={index} className="w-8/12 border rounded-xl table-fixed text-center">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="w-6/12 font-semibold uppercase">Nombre</th>
              <th className="w-6/12 font-semibold uppercase">World</th>
              <th className="w-6/12 font-semibold uppercase">Deleted</th>
              <th className="w-6/12 font-semibold uppercase">Status</th>
              <th className="w-6/12 font-semibold uppercase">Traded</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-6/12 text-black bg-sky-100 ">{chars.name}</td>
              <td className="w-6/12 text-black bg-sky-100 ">{chars.world}</td>
              <td className="w-6/12 text-black bg-sky-100 ">{String(chars.deleted)}</td>
              <td className="w-6/12 text-black bg-sky-100 ">{chars.status}</td>
              <td className="w-6/12 text-black bg-sky-100 ">{String(chars.traded)}</td>
            </tr>
          </tbody>
        </table>
      )
       : <h1 className="text-3xl font-bold mb-4 text-black mt-20">No tiene Personajes para Mostrar</h1>
      }
       </div>
    </div>
  </div>
  <footer className="bg-blue-500 text-white py-4 w-full">
  <div className="flex flex-col items-center justify-center">
    <p className="text-lg font-semibold">¡Gracias por visitar!</p>
    <p className="text-sm">©JairAsaelLozanoFraire github/JairAsaelLozano</p>
  </div>
</footer>

  
</main>

  )
}
