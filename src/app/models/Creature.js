import { Int32 } from "mongodb";
import { Schema, model, models } from "mongoose";



const CreatureSchema = new Schema({
    Name:{
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    Deaths:{
        type: String,
        required: true
    }
})

export default models.Creature || model('Creature', CreatureSchema)
