const login = require('./login');
const token = require('../../model/token');

module.exports.dataValid = function(req, res, next) {

    const {email, password} = req.body;

    if (!email) {

        return res.send({
            success: false,
            msg: "Email input is required"
        })

    }

    if (!password) {

        return res.send({
            success: false,
            msg: "Password input is required"
        })

    }

    next();
}

module.exports.loginUser = function (req, res) {

    const {email, password} = req.body;

    login.login(email, password)
    .then(data=> {
        // console.log(data);
        if (data == undefined) {
            res.send({
                success: false,
                msg: "User doesn´t exist"
            })
        } else {
            const payload = {
                'id': data.id,
                'email': data.email
            }

            token.signToken(payload)
            .then(token=> {
                console.log(token);
                res.send({
                    success: true,
                    token: token
                })
            })
            .catch(err => {
                res.send({
                    success: false,
                    msg: "Error login"
                })
            })
        }
    })
    .catch(err => {
        console.log(err);
    })

}