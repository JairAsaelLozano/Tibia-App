import { NextResponse } from "next/server";
import {connectDB} from "../../../utils/mongoose";
import Boss from '../../../models/Boss';
import Creature from '../../../models/Creature';
// export const runtime = 'edge'; // 'nodejs' is the default
export async function GET(req,{params}){
    const World =  params.world;

    connectDB();

    try {
      const bosses = await Boss.find({ World: World }, { Boss: { $slice: 10 } }).exec();
        
        const bosssort = bosses[0].Boss;
        bosssort.sort(function (b, a) {
            if (a.Possibility > b.Possibility) {
              return 1;
            }
            if (a.Possibility < b.Possibility) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
        return NextResponse.json(bosssort);
    } catch (error) {
    
        return NextResponse.error();
    }
}

// export async function POST(request) {
//     const data = await request.json();
//     connectDB();
    
//     try {
//         const bossData = {
//             Name: data.Boss.Name,
//             LastSeen: data.Boss.LastSeen,
//             Possibility: data.Boss.Possibility,
//             ExpectedIn: data.Boss.ExpectedIn ,
//             Url: data.Boss.Url
//         };

//         // Buscar el mundo correspondiente en la base de datos
//         const bossWorld = await Boss.findOne({ World: data.World });

//         if (bossWorld) {
//             // Si el mundo ya existe, añadir el nuevo boss al arreglo
//             bossWorld.Boss.push(bossData);
//             const updatedBoss = await bossWorld.save();
//             console.log(updatedBoss);
//             return NextResponse.json(updatedBoss);
//         } else {
//             // Si el mundo no existe, crear un nuevo documento con el mundo y el boss
//             const newBossWorld = new Boss({
//                 World: data.World,
//                 Boss: [bossData]
//             });
//             const savedBossWorld = await newBossWorld.save();
//             console.log(savedBossWorld);
//             return NextResponse.json(savedBossWorld);
//         }
//     } catch (error) {
//         console.error(error);
//         return NextResponse.error();
//     }
// };
