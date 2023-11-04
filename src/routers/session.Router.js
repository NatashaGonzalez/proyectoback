import  jwt  from "jsonwebtoken";
import passportCall from "../middleware/passportCall.js";
import baseRouter from "./baseRouter.js";

class sessionsRouter extends baseRouter {
    init(){
        this.post("/register", passportCall("register"), async(req, res)=>{
            res.sendSuccess("Registered");
        })
        this.post("/login",passportCall("login"), async(req, res) =>{
            const tokenUser = {
                name: `${req.user.firtsName} ${req.user.lastName}`,
                id: req.user._id,
                role: req.user.role
            }
            const token = jwt.sign(tokenUser, "jwSecret",{expiresIn:"1d"});
            res.cookie("authcookie", token);
            res.sendSuccess("Logged In")
        })
    }
}

const sessionRouter = new sessionsRouter(); 

export default sessionRouter.getRouter();