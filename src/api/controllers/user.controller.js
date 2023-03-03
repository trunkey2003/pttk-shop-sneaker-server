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
