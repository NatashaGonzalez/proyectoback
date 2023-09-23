import mongoose from "mongoose";

const collection = "Videogamestypes";

const videogameSubSchema = new mongoose.Schema({
    videogame: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Videogames"
    },
    quantity: Number,
    description:String
},{_id:false})

const schema = new mongoose.Schema({
    videogames: [videogameSubSchema]
}, {timestamps:true})

const typesModel = mongoose.model(collection, schema);

export default typesModel;