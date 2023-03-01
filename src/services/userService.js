const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define constants for salt rounds and secret key
const SALT_ROUNDS = 10;
const SECRET_KEY = 'some_secret_key';

// Define functions for user service

// Function to register a new user
async function registerUser(username, email, password) {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        throw new Error('Email already taken');
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user document using the user model
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
    });

    // Save the new user document to the database
    await newUser.save();

    // Return the new user data without the password field
    return newUser.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; } });
}

// Function to log in an existing user
async function loginUser(email, password) {
    // Find the user document by email in the database 
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        throw new Error('Invalid email or password');
    }

    // Compare the password with the hashed password using bcrypt 
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
        throw new Error('Invalid email or password');
    }

    // Generate a token using jwt 
    const token = jwt.sign({ id: existingUser._id }, SECRET_KEY);

    // Return the token and the user data without the password field 
    return { token: token, userData: existingUser.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; } }) };
}

// Function to get the current user profile 
async function getUserProfile(token) {
    // Verify the token using jwt 
    const payload = jwt.verify(token, SECRET_KEY);

    // Find the user document by id in the database 
    const existingUser = await User.findById(payload.id);
    if (!existingUser) {
        throw new Error('Invalid token or user not found');
    }

    // Return the user data without the password field 
    return existingUser.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; } });
}

// Export functions as an object 
module.exports = { registerUser, loginUser, getUserProfile };