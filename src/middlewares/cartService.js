const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const getUserId = (token) => {
    let result = { authozied: false, id: null };
    if (!token) {
        result.id = (new Date()).getTime().toString(36)
        return result;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return result;
        result.authozied = true;
        result.id = decoded.id;
    });
    return result;
}

module.exports = { getUserId };