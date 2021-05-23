const db = require('../../config/connection');

exports.login = function(email, password) {
    return new Promise((resolve, reject) => {

        db.query("SELECT email, password FROM users WHERE email=? AND password=?", [email, password], (error, result)=> {

            if(error) {
                console.log("Error en el login ", error.stack);
                return reject("Error en login");
            }
            else if(result.length === 0) {

                console.log("Usuario inexistente");
                return reject("Usuario inexistente");

            } else {

                console.log("*Inicio de sesión exitoso*");
                return resolve("*Inicio de sesión exitoso*");
            }


        })


    })
}