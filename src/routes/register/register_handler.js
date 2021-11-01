const register = require("./register");
const hasher = require("../../model/hashUser");
const emailSender = require("../email-server/email");

module.exports.dataValid = function (req, res, next) {
    const {name, country, region, phone, email, password} = req.body;

    let regLetter = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ]*$/i; // regular expression only letters
    let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/; // regular expression password
    let regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/; // regular expression email

    if (!name) {
        return res.send({
            success: false,
            msg: "Name field is required"
        })
    }

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

module.exports.registerUser = function (req, res) {
    const {name, country, region, phone, email, password} = req.body;

    const datauser = name+country+region+phone+email+password;

    console.log(name, country, region, phone, email, password);

    hasher.hassPass(datauser)
    .then(data => {
        // console.log(datauser)
        const hashed = data;
        if (data === null || data === undefined) {
        res.send({
            success: false,
            msg: "Error in data",
            error: data
        })
        } else {
        
        register.register(name, country, region, phone, email, password, data)
        .then(data=> {
        if (data === null || data === undefined) {
            res.send({
                success: false,
                msg: "Error in register"
            })

        } 
        
        else {
            console.log("registrando")
        emailSender.sendEmail(email, hashed, name)
        .then(data => {
                res.send({
                    success: true,
                    msg: "User succesfully registered and email sent"
                })
        })
        .catch(err => {
            console.log(err)
            res.send({
                success: err,
                msg: "Error in server"
            })
        })


    }

    })
    .catch(err => {

        console.log(err);
        res.send({
            msg: err
        })
    })
    }
    })
    .catch(err => {
        console.log(err);
        res.send({
            success: false,
            msg: err
        })
    })
    // register.register(name, country, region, phone, email, password)
    // .then(data=> {
    //     console.log(data);
    //     res.send({
    //         success: true,
    //         msg: "User succesfully registered"
    //     })
    // })
    // .catch(err => {

    //     console.log(err);
    //     res.send({
    //         msg: err
    //     })
    // })
}