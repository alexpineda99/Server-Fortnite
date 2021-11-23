const register = require("./register");
const hasher = require("../../model/hashUser");
const emailSender = require("../email-server/email");

module.exports.dataValid = function (req, res, next) {
    const {name, country, region, phone, email, password} = req.body;

    let regLetter = /^[a-zA-Z\s]{3,25}*$/; // regular expression only letters
    let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/; // regular expression password
    let regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/; // regular expression email
    let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    if (name.length === 0) {
        return res.send({
            success: false,
            msg: "Name field is required"
        })
      }
      else if (!regLetter.test(name)) {
        return res.send({
            success: false,
            msg: "Name field requires only letters"
        })
      }
      else if (name.length < 3 && name.length > 26) {
        return res.send({
            success: false,
            msg: "Your name must be at least 3 characters and no more than 25"
        })
      }
      //Email validation
      else if (email.length === 0) {
        return res.send({
            success: false,
            msg: "Email field required"
        })
      }
      else if (!regEmail.test(email)) {
        return res.send({
            success: false,
            msg: "Please enter a valid email address"
        })
      }
      //Region validation
      else if (region.length === 0) {
        return res.send({
            success: false,
            msg: "Region field required"
        })
      }
      //Phone validation
      else if (phone.length === 0) {
        return res.send({
            success: false,
            msg: "Phone field required"
        })
      }
    //   else if (!regPhone.test(phone)) {
    //     setmsg("Please enter a valid phone number");
    //     setLoading(false);
    //   }

      //Pass validation
      else if (pass.length === 0) {
        return res.send({
            success: false,
            msg: ''
        })
      }
      else if (pass.length < 8 && pass.length > 16) {
        return res.send({
            success: false,
            msg: "Your name must be between 8 and 16 characters"
        })
        
      }
      else if (!regPass.test(pass)) {
        return res.send({
            success: false,
            msg: ` Your password must have:
            At least one digit
            At least one lowercase character
            At least one uppercase character
            At least one special character
            At least 8 characters`
        })
      }

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