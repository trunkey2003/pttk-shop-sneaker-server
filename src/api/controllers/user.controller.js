const verifySignUp = require('../../middlewares/verifySignup');
const db = require('../../integration');
const user = db.user;

class UserController{
    // [POST]
    registerUser(req,res){
        verifySignUp.checkDuplicateUsernameOrEmail(req, res)
    }
    login(req,res){

    }
    // [GET]
    adminBoard(req,res){

    }
    userBoard(req,res){

    }
    allAccess(req,res){

    }
}
module.exports = new UserController;