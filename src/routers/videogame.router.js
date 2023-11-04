import { Router } from "express";
import videogameManager from "../dao/mongo/managers/videogameManager.js";

const router = Router();
const videogameService = new videogameManager();

router.get("/", async(req, res) => {
    const videogame = await videogameService.getvideogame();
    res.send({status:"success", payload:videogame})
})

router.get("/indexacion", async (req,res) => {
    const ind = await videogameService.getvideogame({title:"Brawl Stars"}).explain("executionStats");
    console.log(ind);
    res.sendStatus(200);
})

router.post("/", async (req, res) => {
    const newVideogameData = req.body;
    try {
        const result = await videogameService.createVideogame(newVideogameData);
        res.status(201).json({ status: "success", payload: result._id });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ status: "error", message: "Error al crear el producto" });
    }
});

    //const images = req.files.map(file => `${req.protocol}://${req.hostname}:${process.env.PORT || 8080}/img/${file.filename}`);
    //newVideogame.images = images

//    const result = await videogameService.createVideogame(newVideogame);
    
  //  res.send({status: "success", payload:result._id});
//})

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