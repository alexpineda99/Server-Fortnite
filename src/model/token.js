const jwt = require('jsonwebtoken');
const _sign = "wSR85tGXgE2gdhEndMaFTIS7u16JTcQk";
const algorithm = { algorithm: 'HS256'};
// { algorithm: 'ES512'}
exports.verifyToken = async function (token) {

    try {

        return jwt.verify(token, _sign);
        
      } catch(err) {

        return "Invalid token";
      }

    }


exports.signToken = function(data) {
    return new Promise ((resolve, reject) => {

        try {

            const token = jwt.sign(data, _sign, { expiresIn: '1h' }, algorithm);
            resolve(token)

        } catch(err) {

           return reject(err)

        }
    })
}
