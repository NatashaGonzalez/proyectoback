import { Router } from "express";
import videogameManager from "../dao/mongo/managers/videogameManager.js";
//import { getValidFilters } from "../utils.js";
import cartsManager from "../dao/mongo/managers/cartsManager.js";

const router = Router();
const cartsService = new cartsManager();

router.get("/", async(req, res)=>{
    let {page=1, limit=2,} = req.query;
    //const cleanFilters = getValidFilters(filters, "videogame")
    //console.log(cleanFilters);
    const pagination = await cartsService.getcarts({}, {page,lean:true, limit});
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