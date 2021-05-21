const db = require("../../config/connection");

exports.register = function(name, country, region, phone, email, password) {
    return new Promise((resolve, reject)=> {
        db.query('INSERT INTO users SET name=?, country=?, region=?, phone=?, email=?, password=?', [name, country, region, phone, email, password], (error, result) => {

            if (error) {
                console.log("Error en el registro ", error.stack);
                return reject("Error en el registro");
            }

            resolve(result);

        })


    })

}