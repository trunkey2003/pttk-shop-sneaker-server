const config = require("../../config/auth.config.js");
const db = require("../../integration");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    user.save()
        .then(user => {
            Role.findOne({ name: "user" })
                .then(role => {
                    user.roles = [role._id];
                    user.save()
                        .then(user => {
                            res.send({ message: "User was registered successfully!" });
                        })
                        .catch(err => {
                            res.status(500).send({ message: err });
                        })
                })
                .catch(err => {
                    res.status(500).send({ message: err });
                })
        })
        .catch(err => {
            res.status(500).send({ message: err });
            return;
        })
}

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("role_" + user.roles[i].name);
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err });
            return;
        }
        )
}

exports.signout = (req, res) => {
    req.logout();
    res.status(200).json({ message: 'You have signed out successfully' });
}