// var express = require('express');
// var router = require('express').Router();
// var router = express.Router();
const verifySignUp = require('../../middlewares/verifySignup');
const db = require('../../integration');
const user = db.user;
// app.post('/registerUser', (req, res) => {
//     verifySignUp.checkDuplicateUsernameOrEmail(req, res)

// })
exports.registerUser = (req, res) => {
    // Save User to Database
    user.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(() => {
        res.send("User registered successfully!");
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
}
