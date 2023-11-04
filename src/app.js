import express from "express";
import mongoose from "mongoose";
import videogameRouter from "./routers/videogame.router.js";
import viewsRouter from "./routers/views.router.js";

import Handlebars from "express-handlebars";
import __dirname from "./utils.js";
import cartsRouter from "./routers/carts.router.js"; 
import cartsSetter from "./middleware/cartsSetter.js";
import cookieParser from "cookie-parser";
import sessionRouter from "./routers/session.Router.js";
import initializePassport from "./config/passport.config.js";

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log (`Listening ${PORT}`));

const connection = mongoose.connect( "mongodb+srv://CoderUser:123@cluster0.cft2mln.mongodb.net/coderGaming?retryWrites=true&w=majority ");

app.engine("handlebars", Handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(cookieParser("palabrasecretashhhhh"));

app.get("/", (req, res) => {

  if (!req.cookies.cookievid || !req.cookies.cookieRIP) {
      res
          .cookie("cookievid", JSON.stringify({ title: "Arena of Valor", gender: "action" }), { signed: true })
          .cookie("cookieRIP", { name: "gaby", lastname: "lopez" }, { maxAge: 10000 });
  }
  res.send({ static: "success", payload: "Usuario" });
});

app.get("/getCookie", (req, res) => {
  console.log(req.cookies);
  res.send(`Hola, ${req.cookies?.cookievid?.title}`);
});

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cartsSetter);

initializePassport();

app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/videogames", videogameRouter);
app.use("/api/sessions", sessionRouter);