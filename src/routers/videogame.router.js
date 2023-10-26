import { Router } from "express";
import videogameManager from "../dao/mongo/managers/videogameManager.js";
import uploader from "../service/uploadService.js";
import videogameModel from "../dao/mongo/models/videogames.js";

const router = Router();
const videogameService = new videogameManager();

router.get("/", async(req, res) => {
    const videogame = await videogameService.getvideogame();
    res.send({status:"success", payload:videogame})
})

router.get("/indexacion", async (req,res) => {
    const ind = await videogameModel.find({title:"Brawl Stars"}).explain("executionStats");
    console.log(ind);
    res.sendStatus(200);
})

router.post("/", uploader.array("images"), async(req, res) => {
    console.log(req.files);
    console.log(req.body);
    const {
        title,
        category,
        gender,
        price
    } = req.body;

    if (!title || !gender || !category || !price) return res.status(400).send({status:"error", error:"incomplete values"});

    const newVideogame = {
        title,
        category,
        gender,
        price
    }
    const images = req.files.map(file => `${req.protocol}://${req.hostname}:${process.env.PORT || 8080}/img/${file.filename}`);
    newVideogame.images = images

    const result = await videogameService.createVideogame(newVideogame);
    
    res.send({status: "success", payload:result._id});
})

router.put("/:vid", async(req,res) => {
    const {vid} = req.params;
    const {
        title,
        category,
        gender,
        price
    } = req.body;

    const updateVideogame = {
        title,
        category,
        gender,
        price
    }

    const videogame = await videogameService.getVideogameBy({_id:vid});
    if(!videogame) return res.status(400).send({status:"error",error:"El producto no existe"});
    await videogameService.updateVideogame(vid,updateVideogame);
    res.send({status:"success",message:"Producto actualizado"});
})

router.delete("/:vid", async(req,res) => {
    const {vid} = req.params;
    const result = await videogameService.deleteVideogame(vid);
    res.send({status: "success", menssage: "Producto borrado"})
})

export default router;