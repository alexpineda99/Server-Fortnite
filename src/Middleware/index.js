const jwt = require('jsonwebtoken');
const _sign = "wSR85tGXgE2gdhEndMaFTIS7u16JTcQk";

exports.authHeader = function(req, res, next) {
    const token = req.headers['auth'];
    
    if (token == "null" || token === undefined) {
        console.log("No header..." + "Mira el token " + token);
        return res.status(401).send({
            msg: "Not authorizated",
        });
        
    }
    console.log("U got a auth ");
    next();
}

exports.validSign = function (req, res, next) {

    const token = req.headers['auth'];

    try {
        jwt.verify(token, _sign);
        next();
    }
    catch(error) {
        return res.status(401).send({
            msg: "You have no authorization"
        })
    }

}