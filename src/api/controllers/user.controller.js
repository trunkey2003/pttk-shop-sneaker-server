exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
}
exports.adminBoard = (req, res, next) => {
    res.status(200).send("Admin Content.");
}
exports.userBoard = (req, res, next) => {
    res.status(200).send("User Content.");
}