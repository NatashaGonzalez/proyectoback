import express from "express";
import mongoose from "mongoose";
import videogameRouter from "./routers/videogame.router.js";
import viewsRouter from "./routers/views.router.js";
import Handlebars from "express-handlebars";
import __dirname from "./utils.js";
import cartsRouter from "./routers/carts.router.js"; 
//import cartsSetter from "./middleware/cartsSetter.js";
//import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log (`Listening ${PORT}`));

const connection = mongoose.connect( "mongodb+srv://CoderUser:123@cluster0.cft2mln.mongodb.net/coderGaming?retryWrites=true&w=majority ");

app.engine("handlebars", Handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

//app.use(cookieParser("palabrasecretashhhhh"));

//app.get("/", (req, res)=> {
//    const {accepted} = req.query;
//    if (accepted) {
 //       res
//  .cookie("cookievid", {title:"Arena of Valor", gender:"action"},{signed:true}).send({static:"success", payload: "Usuario"})
 //   .cookie("cookieRIP", {name:"gaby", lastname:"lopez"}, {maxAge:5000})
//}
 //   else{
  //      res.send({error:"No puedes seguir en la página"})
//    }
//});

//app.get("/getCookie",(req, res) => {
//    console.log(req.cookies);
//    res.send(`Hola, ${req.cookies?.cookievid?.name}`)
//})

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(cookieParser());
//app.use(cartsSetter);

app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/videogames", videogameRouter);