const verify = require("./verify");

module.exports.verifyinfo = function (req, res, next) {

    const id = req.params.id;

    verify.verifyEmail(id)
    .then(data=> {
        console.log(data);
        res.send({
            msg: "User verified succesfully",
            data: data
        })
        res.redirect("/login")
    })
    .catch(err=> {
        console.log(err);
        res.send({
            msg: "Error",
            err: err
        })
    })

    
}