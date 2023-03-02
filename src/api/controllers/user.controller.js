const express = require('express');
const verifySignUp = require('../../middlewares/verifySignup');
const router = express.Router();
const db = require('../../integration');
const user = db.user;
router.post('/registerUser', (req, res) => {
    verifySignUp.checkDuplicateUsernameOrEmail(req, res)
    
})
// router.get('/users', (req, res) => {
router.post('/login', (req, res) => {

})