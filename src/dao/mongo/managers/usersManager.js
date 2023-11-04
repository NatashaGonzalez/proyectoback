import userModel from "../models/user.js";

export default class usersManager {

    getUsers = (params) => {
        return userModel.find(params);
    }

    getUserBy = (params) => {
        return userModel.findOne(params);
    }

    createUsers = (user) => {
        return userModel.create(user);
    }

    updateUser = (id,user) => {
        return userModel.updateOne({_id:id},user);
    }

    deleteUser = (_id) => {
        return userModel.deleteOne({_id:id});
    }
}