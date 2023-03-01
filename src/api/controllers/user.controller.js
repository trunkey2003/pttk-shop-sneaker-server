const express = require('express');
const router = express.Router();
const userService = require('../services/userservice.js');
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({ error: 'Missing fields' });
        }
        const newUser = await userService.registerUser({ username, email, password });
        // res.status(201).send(user);
        const newuser = await userService.registerUser({ username, email, password });
        return res.status(201).json({ message: 'User registered successfully', data: newuser });
    } catch (err) {
        return res.status(500).json({ message: 'User registration failed' });
    }

}
);
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: 'Missing fields' });
        }
        const { token, userData } = await userService.loginUser(email, password);
        res.status(200).send({ token, userData });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});
router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({ error: 'Missing token' });
        }
        const userData = await userService.getUserProfile(token);
        res.status(200).send(userData);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
})
module.exports = router;