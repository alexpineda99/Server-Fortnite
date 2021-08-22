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
        if (data === undefined) {
            res.send({
                success: false,
                msg: "Wrong user or password."
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
                // localStorage.setItem("user", "Alex"); --- throw error
            })
            .catch(err => {
                res.send({
                    msg: err
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