const login = require('./login');

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
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

}