// const app = require("../../../app");
const { verifySignUp } = require("../../middlewares");
const controller = require("../controllers/auth.controller");
// var router = require('express').Router();
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        controller.signup
    );

    app.post("/auth/signin", controller.signin);
}
