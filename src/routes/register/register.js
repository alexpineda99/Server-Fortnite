const db = require("../../config/connection");

exports.register = function(name, country, region, phone, email, password, data) {
    return new Promise((resolve, reject)=> {

        

        db.query("SELECT email, phone FROM users WHERE email=? OR phone=?", [email, phone], (error, result)=> {

            if (result.length === 0) {

        db.query('INSERT INTO users SET name=?, country=?, region=?, phone=?, email=?, password=?, verified=0', [name, country, region, phone, email, password], (error, result) => {

            if (error) {
                console.log("Error en el registro ", error.stack);
                return reject("Error in register. Try Again.");
            }
            let userid = result.insertId;
            resolve(result);
        db.query('INSERT INTO user_verification SET userid=?, token_verification=?', [userid, data], (error, result) => {
            
            if (error){
                console.log("Error en el registro ", error.stack);
                return reject("Error in register. Try Again.");
            }
            resolve(result);
        })

        })
    } else if (result[0].email === email) {
        return reject("Email already registered");

    } else if (result[0].phone === phone) {
        return reject("Number phone already registered");
        
    } else {
        return reject("Error server");
    }

    })
})



}