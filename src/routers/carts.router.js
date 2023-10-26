import { Router} from "express";
import cartsManagers from "../dao/mongo/managers/cartsManager.js";
import videogamesManager from "../dao/mongo/managers/videogameManager.js";

const router = Router();
const cartsService = new cartsManagers();
const VideogameService = new videogamesManager();

router.get("/", async(req,res)=>{
    const {cid} = req.params;
    const getcarts = await cartsService.getcarts();
    if (!getcarts) return res.status(404).send({status:"error", error:"carrito no encontrado"});
    res.send({status:"success", payload:getcarts});
})

router.post("/", async(req, res) => {
    const result = await cartsService.createCarts();
    res.send({status:"success", payload:result._id})
})

router.put("/cid/videogames/:vid", async(req,res) =>{
    const {cid,vid} = req.params;
    const getcarts = await cartsService.getcartsById({_id:cid});
    if (!getcarts) return res.status(400).send({status:"error",error:"El carrito no existe"});
    const videogame = await VideogameService.getVideogameBy({_id:vid});
    if (!videogame) return res.status(400).send ({status:"error", error:"El videojuego no existe"});
    const gameExist = getcarts.videogames.find(e =>{
        return e.videogame.toString() === vid;
    })
    if (gameExist) return res.status(400).send({status:"error",error:"El juego ya existe"});
    getcarts.videogames.push({
        videogame:vid,
        title: String,
        gender: String,
        description: String
    })
    await cartsService.updateCarts(cid,{videogames:getcarts.videogames});
    res.send({status:"success",menssage:"Videojuego agregado"})
})

router.delete("/:cart", async(req, res) => {
    const {cart} = req.params;
    const result = await cartsService.deleteCarts(cart);
    res.send({status:"success", menssage: "Carrito borrado"})
})

export default router;


