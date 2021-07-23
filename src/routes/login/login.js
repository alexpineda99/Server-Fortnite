const db = require('../../config/connection');

exports.login = function(email, password) {
    return new Promise((resolve, reject) => {

        db.query("SELECT id, email, password FROM users WHERE email=? AND password=?", [email, password], (error, result)=> {

            if(error) {
                console.log("Error en el login ", error.stack);
                return reject("Error en login");
            }
            else if(result.length == 0) {

                // console.log("Wrong User or password.");
                return reject("Wrong User or password.");

            } else {

                console.log("*Inicio de sesión exitoso*", result[0]);
                return resolve(result[0]);
            }


        })


    })
}