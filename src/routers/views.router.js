import { Router } from "express";
import { getValidFilters } from "../utils.js";
import videogameManager from "../dao/mongo/managers/videogameManager.js";

const router = Router();
const videogameService = new videogameManager();

router.get("/", async(req, res)=>{
    let {page=1, limit=2, ...filters} = req.query;
    const cleanFilters = getValidFilters(filters, "videogame")
    console.log(cleanFilters);
    const pagination = await videogameService.getvideogame(cleanFilters, {page,lean:true, limit});
    console.log("Datos de videojuegos recuperados:", pagination.docs);
    res.render("Home",{
        css: "Home",
        videogames: pagination.docs,
        hasNextPage: pagination.hasNextPage,
        hasPrevPage: pagination.hasPrevPage,
        nextPage: pagination.nextPage,
        prevPage: pagination.prevPage,
        page: pagination.page
    })
})

export default router;