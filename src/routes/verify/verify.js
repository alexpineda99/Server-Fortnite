const db = require("../../config/connection");

exports.verifyEmail = function (id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT user_verification.token_verification FROM user_verification INNER JOIN users ON 
        user_verification.userid = users.id WHERE user_verification.token_verification=?`,
      [id],
      (error, result) => {
        if (result.length === 0) {
          console.log("invalid token");
          return reject("invalid token");
        } else if (result.length === 1) {
          db.query(
            `SELECT user_verification.token_verification FROM user_verification INNER JOIN users 
                ON user_verification.userid = users.id WHERE users.verified = 0 AND user_verification.token_verification = ?`,
            [id],
            (error, result) => {
              if (result.length === 0) {
                console.log("User already aunthenticated");
                return reject("User already aunthenticated");
              }
              db.query(
                `UPDATE users INNER JOIN user_verification ON 
                        users.id = user_verification.userid  
                        SET users.verified = 1, user_verification.token_verification = "" WHERE user_verification.token_verification=?`,
                [id],
                (error, result) => {
                  if (error) {
                    console.log("Error authenticating user");
                    return reject("Error authenticating user");
                  }
                  console.log(result);
                  return resolve(result);
                }
              );
            }
          );
        } else {
          console.log("Error in server", error);
          return reject("Error in server", error);
        }
      }
    );
  });
};
