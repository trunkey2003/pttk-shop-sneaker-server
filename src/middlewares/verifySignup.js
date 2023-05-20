const db = require("../integration");

const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                res.status(400).send({ message: "Failed! Username is already used!" });
                return;
            }
            User.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        res.status(400).send({ message: "Failed! Email is already used!" });
                        return;
                    }
                    next();
                })
                .catch(err => {
                    res.status(500).send({ message: err });
                })
        })
        .catch(err => {
            res.status(500).send({ message: err });
        })
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;