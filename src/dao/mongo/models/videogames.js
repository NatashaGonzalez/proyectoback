import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "Videogames";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    gender: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},{timestamps:true})

schema.plugin(mongoosePaginate);

const videogameModel = mongoose.model(collection,schema);

export default videogameModel;