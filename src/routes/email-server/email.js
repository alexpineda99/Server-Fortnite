const nodemailer = require("nodemailer");
const transport = require("./config");
const emailTemplate = require("../../Templates/verifyEmailTemplate");

exports.sendEmail = function (email, data, name) {
  return new Promise ((resolve, reject) => {

  try {
  let transporter = nodemailer.createTransport(transport.infouser());

    transporter.verify(async function(error, success) {
        // send mail with defined transport object
      let info = await transporter.sendMail({
          from: 'alex.fortine.app@gmail.com', // sender address
          to: email, // list of receivers
          subject: "Verify your Fortnite´s email", // Subject line
          html: emailTemplate.verifytemplate(data, name), // html body
        });

    resolve(success)
    console.log("Server is ready to take our messages");
    });

  } catch(error) {
    console.log(error);
    return reject(error)
  }
  })
}
