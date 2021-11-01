const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.infouser = function (req, res) {
  // create reusable transporter object using the default SMTP transport
  let transporter = {
    service: "gmail",
    auth: {
      user: "alex.fortine.app@gmail.com", // generated ethereal user
      pass: "alexfortnite99", // generated ethereal password
    },
  }
 
    return transporter;
  
  // console.log(transporter)

}
