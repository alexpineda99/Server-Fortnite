const verify = require("./verify");

module.exports.verifyinfo = function (req, res, next) {

    const id = req.params.id;

    verify.verifyEmail(id)
    .then(data=> {
        console.log(data);
        res.send({
            msg: "bien",
            data: data
        })
    })
    .catch(err=> {
        console.log(err);
        res.send({
            msg: "Error",
            err: err
        })
    })

    
}