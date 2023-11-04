import { Router } from "express";

export default class baseRouter {
    constructor (){
        this.router = Router();
        this.init();
    }

    init(){}

    getRouter(){
        return this.router;
    }

    get(path,...callbacks){
        this.router.get(path, this.customResponses,this.applyCallbacks(callbacks) )
    }
    post(path,...callbacks){
        this.router.post(path, this.customResponses,this.applyCallbacks(callbacks) )
    }
    put(path,...callbacks){
        this.router.put(path, this.customResponses, this.applyCallbacks(callbacks))
    }
    delete(path,...callbacks){
        this.router.delete(path, this.customResponses, this.applyCallbacks(callbacks))
    }

    customResponses(req, res, next){
        res.sendSuccess = message => res.send({status:"success", message});
        res.sendSuccessPayload = payload => res.send({status:"success", payload});
        res.sendIntervalError = error => res.status(500).send({status:"error", error});
        next();
    }
//de todos los callbacks, los mapea y para cada callbacks que se ejecuta, se llama a una función que toma los parametros de ese callback  
    applyCallbacks(callbacks){
        return callbacks.map(callback => async(...params) =>{
            try{
                await callback.apply(this, params);
            } catch(error){
                console.log(error);
                params[1].sendIntervalError(error);
            }
        })
    }
}