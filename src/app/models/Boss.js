import { Schema, model, models } from "mongoose";



const BossSchema = new Schema({
    World:{
        type: String,
        required: [true, 'El nombre del servidor']
    },
    Boss:[{
        Name:{
            type: String,
            required: [true, 'El nombre del boss']
        },
        LastSeen:{
            type: String
        },
        Possibility:{
            type: Number
        },
        ExpectedIn:{
            type: String
        },
        Url:{
            type: String,
            required: [true, 'El nombre del boss']
        },
    }]
})

export default models.Boss || model('Boss', BossSchema)
