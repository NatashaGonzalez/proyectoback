import { Router } from "express";
import videogameManager from "../dao/mongo/managers/videogameManager.js";
import { getValidFilters } from "../utils.js";

const router = Router();
const videogameService = new videogameManager();

router.get("/", async(req, res)=>{
    let {page=1, limit=2, ...filters} = req.query;
    const cleanFilters = getValidFilters(filters, "videogame")
    console.log(cleanFilters);
    const pagination = await videogameService.paginateVideogames(cleanFilters, {page,lean:true, limit});
    res.render("Home",{
        css: "Home",
        videogame: pagination.docs,
        hasNextPage: pagination.hasNextPage,
        hasPrevPage: pagination.hasPrevPage,
        nextPage: pagination.nextPage,
        prevPage: pagination.prevPage,
        page: pagination.page
    })
})

export default router;