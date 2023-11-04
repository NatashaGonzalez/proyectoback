import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import usersManager from "../dao/mongo/managers/usersManager.js";
import authService from "../service/authService.js";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const userService = new usersManager();

const initializePassport = () => {
    //valida los datos del usuario por primera vez
    passport.use("register",new LocalStrategy({passReqToCallback:true, usernameField:"email", session:false}, async(req, email, password, done) => {
        try {
            const {firtsName, lastName} = req.body;
        if (!firtsName || !lastName) return done(null, false,{message:"incomplete values"});

        //corrobora que el usuario no exista
        const exist = await userService.getUserBy({mail});
        if(exist) return done(null, false, {message:"user exist"});

        const hashedPassword = await authService.createHash(password);
        //crear usuario
        const newUser = {
            firtsName,
            lastName,
            email,
            password:hashedPassword
        }
        const result = await userService.createUsers(newUser);
        return done(null, result);
        } catch (error) {
        console.log(error);
        return done(error);
        }
    }));

    passport.use("login", new LocalStrategy({usernameField:"email", session:false}, async(email,password, done) => {
        try {
            //existe usuario
            const user= await userService.getUserBy({email});
            if(!user) return done(null, false, {message:"existe credencial"});
            //validar contraseña
            const validPassword = await authService.validatePassword(password, user.password);
            if(!validPassword) return done(null, false,{message:"credencial inválida"})
            return done(null, user);
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }));

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest:ExtractJwt.fromExtractors([authService.extractorAuth]),
        secretOrKey:"jwSecret"
    }, async(payload, done) => {
        return done(null, payload);
    }))

}

export default initializePassport;