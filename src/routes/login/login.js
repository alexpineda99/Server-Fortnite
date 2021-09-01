const db = require('../../config/connection');

exports.login = function(email, password) {
    return new Promise((resolve, reject) => {

        db.query("SELECT id, email, password FROM users WHERE email=? AND password=?", [email, password], (error, result)=> {

            if(error) {
                console.log("Error in login ", error.stack);
                return reject(error);
            }
            else if(result.length === 0) {

                // console.log("Wrong User or password.");
                return resolve(undefined);

            } else {
                db.query(`SELECT users.id, users.email, users.password FROM users INNER JOIN user_verification 
                ON users.id = user_verification.userid WHERE users.email=? AND users.password=? AND users.verified = 0`, [email, password], (error, result)=> {

                if(result.length === 0) {
                    console.log("Please, verify your email");
                    return reject("Please, verify your email");
                } else {
                    console.log("*Inicio de sesión exitoso*", result[0]);
                    return resolve(result[0]);
                }
            })
            }


        })


    })

    
}