import {JSDOM}  from 'jsdom';
import { NextResponse } from 'next/server';
import {connectDB} from "../../utils/mongoose";
import Boss from '../../models/Boss';

export async function POST(request){
    const data = await request.json();
    try {
        connectDB();
        const res = await fetch(`https://guildstats.eu/bosses?world=${data.World}&monsterName=&bossType=&rook=0`);
        const html = await res.text();

        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Encuentra la tabla (reemplaza 'tablaID' con el ID o clase de tu tabla)
        const table = document.querySelector('.newTable')

        if (table) {
            // Encuentra todos los elementos <tr> dentro de la tabla
            const rows = table.querySelectorAll('tr')

            const rowData = [];

            // Itera sobre cada fila (<tr>) para extraer su contenido
            rows.forEach(row => {
                // Encuentra todos los elementos <td> dentro de la fila
                const cells = row.querySelectorAll('td');

                const cellData = [];

                // Itera sobre cada celda (<td>) para extraer su texto o src de la imagen
                cells.forEach(cell => {
                    const img = cell.querySelector('img');
                    if (img) {
                        cellData.push(img.getAttribute('src'));
                    } else {
                        cellData.push(cell.textContent.trim());
                    }
                });


                // Agrega los datos de la fila a la matriz de datos
                rowData.push(cellData);
            });
            rowData.shift();
            rowData.shift();
            // console.log(rowData[486][1]);
            // console.log(rowData[486][2]);
            // console.log(rowData[486][7]);
            // console.log(rowData[486][10]);
            //console.log(rowData); // Muestra los datos extraídos
            var bossWorld = await Boss.findOne({ World: data.World });

            if(!bossWorld){
                    const newBossWorld = new Boss({
                    World: data.World,
                    Boss: []
                });
                await newBossWorld.save();
            }
            bossWorld = await Boss.findOne({ World: data.World });
            //Inserta en mongodb el arreglo de bosses actualizados
            if (bossWorld) {
                
                // Si el mundo ya existe, añadir el nuevo boss al arreglo
                rowData.forEach(async (element) => {
                    if(element[10] == "-1" || element[10] == "1Low" ||  element[10] == "0No"){
                        element[10] = "0"
          
                    }
                    const bossData = {
                        Name: element[1],
                        LastSeen: String(element[7]),
                        Possibility: parseFloat(element[10]),
                        ExpectedIn: null,
                        Url: element[2]
                        };
                        const index = bossWorld.Boss.findIndex(boss => boss.Name === element[1]);
                        if (index !== -1) {
                            // Update existing element
                            bossWorld.Boss[index] = bossData;
                        } else {
                            // If element doesn't exist, push a new one
                            bossWorld.Boss.push(bossData);
                        }
            })
           
            const updatedBoss = await bossWorld.save();
            return NextResponse.json({ message: 'Bosses Insertados', data: bossWorld });
             } else {
                // Si el mundo no existe, crear un nuevo documento con el mundo y el boss
                // const newBossWorld = new Boss({
                //     World: data.World,
                //     Boss: [bossData]
                // });
                // const savedBossWorld = await newBossWorld.save();
                // console.log(savedBossWorld);
                // return NextResponse.json(savedBossWorld);
            }

            
        } else {
            return NextResponse.error();
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error();
    }
}