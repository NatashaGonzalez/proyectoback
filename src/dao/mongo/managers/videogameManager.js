import videogamesModel from "../models/videogames.js";

export default class videogameManager {
    
    getvideogame = (params) => {
        return videogamesModel.find(params).lean();
    }

    paginateVideogames = (params, options) => {
        return videogamesModel.paginate(params, options)
    }

    getVideogameBy = (params) => {
        return videogamesModel.findOne(params).lean();
    }

    createVideogame = (videogame) => {
        return videogamesModel.create(videogame);
    }

    updateVideogame = (id, videogame) => {
        return videogamesModel.updateOne({_id:id}, {$set:videogame})
    }

    deleteVideogame = (id) => {
        return videogamesModel.deleteOne({_id:id});
    }
}