const { verifySignUp } = require("../middlewares");
const authController = require("../controllers/auth.controller");
const auth_router = require("express").Router();
auth_router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


auth_router.post(
    "/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail
    ],
    authController.signup
);

router.post("/auth/signin", authController.signin);
module.exports = auth_router;