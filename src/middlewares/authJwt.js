const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../integration");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ message: 'You are not authorized' });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      User.findById(decoded.id)
        .populate("roles", "-__v")
        .then((user) => {
          if (user.roles.find(r => r.name === "admin")) {
            next();
            return;
          } else {
            return res.status(403).json({ message: "You don't have permission" });
          }
        })
        .catch((err) => {
          return res.status(500).json({ message: err.message });
        })
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
