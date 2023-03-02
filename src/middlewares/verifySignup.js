const db = require("../integration");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500)
                .send({
                    ok: false,
                    message: err
                });
            return;
        }

        if (user) {
            res.status(400).send({
                ok: false,
                message: "Failed! Username is already in use!"
            });
            return;
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({
                    ok: false,
                    message: err
                });
                return;
            }

            if (user) {
                res.status(400).send({
                    ok: false,
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};


const verifySignUp = {
    checkDuplicateUsernameOrEmail,

};

module.exports = verifySignUp;