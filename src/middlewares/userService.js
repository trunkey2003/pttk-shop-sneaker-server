const User = require('../integration/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const SECRET_KEY = 'some_secret_key';

async function registerUser(username, email, password) {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        throw new Error('Email already taken');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
    });

    await newUser.save();

    return newUser.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; } });
}


async function loginUser(email, password) {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        throw new Error('Invalid email or password');
    }


    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
        throw new Error('Invalid email or password');
    }


    const token = jwt.sign({ id: existingUser._id }, SECRET_KEY);


    return { token: token, userData: existingUser.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; } }) };
}


async function getUserProfile(token) {
    const payload = jwt.verify(token, SECRET_KEY);
    const existingUser = await User.findById(payload.id);
    if (!existingUser) {
        throw new Error('Invalid token or user not found');
    }
    return existingUser.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; } });
}

module.exports = { registerUser, loginUser, getUserProfile };