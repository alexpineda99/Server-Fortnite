const verify = require("./verify");

module.exports.verifyinfo = function (req, res, next) {

    const id = req.params.id;

    verify.verifyEmail(id)
    .then(data=> {
        console.log(data);
        res.redirect("https://alex-fortnite.netlify.app/signin")
        // res.send({
        //     msg: "User verified succesfully",
        //     data: data
        // })

    })
    .catch(err=> {
        console.log(err);
        res.send({
            msg: "Error",
            err: err
        })
    })

    
}