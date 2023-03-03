exports.registerUser = (req, res) => {
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
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
}
exports.adminBoard = (req, res, next) => {
    res.status(200).send("Admin Content.");
}
exports.userBoard = (req, res, next) => {
    res.status(200).send("User Content.");
}