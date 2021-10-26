const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const _sign = keys.signs.emailTokenSign;
const algorithm = { algorithm: "HS256" };

exports.hassPass = async function (data) {
  return new Promise((resolve, reject) => {
    jwt.sign( {data:data}, algorithm.algorithm, { expiresIn: "1d"}, function (err, token) {
        try {
          console.log(token);
          return resolve(token);
        } catch (err) {
          console.log(err);
          return reject(err);
        }
      }
    );

  });
};
