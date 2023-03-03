const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
// var router = require('express').Router();

module.export = (app) => {

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/test/all", controller.allAccess);

    app.get("/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
}
// module.exports = app;