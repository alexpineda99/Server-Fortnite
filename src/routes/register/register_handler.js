const register = require("./register");

module.exports.dataValid = function (req, res, next) {
    const {name, country, region, phone, email, password} = req.body;

    let regLetter = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ]*$/i; // regular expression only letters
    let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/; // regular expression password
    let regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/; // regular expression email

    // if (!name) {
    //     return res.send({
    //         success: false,
    //         msg: "Name field is required"
    //     })
    // }

    // if (!country) {
    //     return res.send({
    //         success: false,
    //         msg: "Country field is required"
    //     })
    // }

    // if (!region) {
    //     return res.send({
    //         success: false,
    //         msg: "Region field is required"
    //     })
    // }

    // if (!phone) {
    //     return res.send({
    //         success: false,
    //         msg: "Phone field is required"
    //     })
    // }

    // if (!email) {
    //     return res.send({
    //         success: false,
    //         msg: "Email field is required"
    //     })
    // }

    // if (!password) {
    //     return res.send({
    //         success: false,
    //         msg: "Password field is required"
    //     })
    // }

    // if (regLetter.test(name)) {
    //     return res.send({
    //         success: false,
    //         msg: "Name field requires only letters"
    //     })
    // }

    next();
}

module.exports.registerUser = function (req, res, next) {
    const {name, country, region, phone, email, password} = req.body;

    console.log(name, country, region, phone, email, password);

    register.register(name, country, region, phone, email, password)
    .then(data=> {
        console.log(data);
        res.send({
            success: true,
            msg: "User succesfully registered"
        })
        next();
    })
    .catch(err => {

        console.log(err);
        res.send({
            msg: err
        })
    })
}