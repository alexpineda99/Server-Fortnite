const register = require("./register");

module.exports.dataValid = function (req, res, next) {
    const {name, country, region, phone, email, password} = req.body;

    if (!name) {
        return res.send({
            success: false,
            msg: "Name field is required"
        })
    }

    if (!country) {
        return res.send({
            success: false,
            msg: "Country field is required"
        })
    }

    if (!region) {
        return res.send({
            success: false,
            msg: "Region field is required"
        })
    }

    if (!phone) {
        return res.send({
            success: false,
            msg: "Phone field is required"
        })
    }

    if (!email) {
        return res.send({
            success: false,
            msg: "Email field is required"
        })
    }

    if (!password) {
        return res.send({
            success: false,
            msg: "Password field is required"
        })
    }

    next();
}

module.exports.registerUser = function (req, res) {
    const {name, country, region, phone, email, password} = req.body;

    console.log(name, country, region, phone, email, password);

    register.register(name, country, region, phone, email, password)
    .then(data=> {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
}