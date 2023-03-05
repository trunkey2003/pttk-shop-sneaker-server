
const db = require("./src/integration")
const User = db.user;
const Role = db.role;
var bcrypt = require("bcryptjs");

module.exports = () => {
    const admin = new User({
        username: 'admin',
        email: 'admin@2003.wds',
        password: bcrypt.hashSync('admin@123', 10),
        roles: []
    })
    admin.save()
        .then(user => {
            Role.findOne({ name: "admin" })
                .then(role => {
                    user.roles.push(role._id);
                    user.save()
                        .then(user => {
                            console.log("Admin created successfully");
                        })
                        .catch(err => {
                            console.error(err);
                        })
                })
                .catch(err => {
                    console.error(err);
                })
        })
        .catch(err => {
            console.error(err);
            return;
        })
}