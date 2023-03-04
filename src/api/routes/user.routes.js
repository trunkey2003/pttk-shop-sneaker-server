const { authJwt } = require("../../middlewares");
const controller = require("../controllers");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.user_controller.allAccess);
    app.post('',)
    app.post("/api/test/registerUser", controller.auth_controller.signup);
    app.get("/api/test/user", [authJwt.verifyToken], controller.user_controller.userBoard);
    app.post("/api/test/signin", controller.auth_controller.signin);
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.user_controller.adminBoard
    );
};
