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
    app.get("/api/user", [authJwt.verifyToken], controller.user_controller.userBoard);
    app.get(
        "/api/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.user_controller.adminBoard
    );

};
