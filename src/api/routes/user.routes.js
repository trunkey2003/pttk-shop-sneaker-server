const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");
const user_router = require("express").Router();

user_router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

user_router.get("/test/all", userController.allAccess);

user_router.get("/test/user", [authJwt.verifyToken], userController.userBoard);

user_router.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
);
user_router.post("/registerUser",userController.registerUser)
user_router.post("/login",userController.login)
module.exports = user_router;