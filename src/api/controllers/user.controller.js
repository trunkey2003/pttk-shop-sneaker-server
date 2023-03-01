const express = require('express');
const router = express.Router();
const userService = require('../services/userservice.js');
router.post('/login', (req, res) => {
  res.send('Hello World!');
}
router.post('/register', async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        if(!username || !email || !password){
            return res.status(400).send({ error: 'Missing fields' });
        }
        // res.status(201).send(user);
        const newuser = await.userService
    }