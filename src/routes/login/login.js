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

                console.log("*Inicio de sesión exitoso*", result[0]);
                return resolve(result[0]);
            }


        })


    })

    
}