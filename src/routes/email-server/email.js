const nodemailer = require("nodemailer");
const transport = require("./config");
const emailTemplate = require("../../Templates/verifyEmailTemplate");

exports.sendEmail = function () {
  return new Promise ((resolve, reject) => {

  try {
  let transporter = nodemailer.createTransport(transport.infouser());

    transporter.verify(async function(error, success) {
        // send mail with defined transport object
      let info = await transporter.sendMail({
          from: 'alex.fortine.app@gmail.com', // sender address
          to: "alexandropinedam1310@gmail.com", // list of receivers
          subject: "Verify your Fortnite´s email", // Subject line
          html: "<h1> hh </h1>", // html body
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


// {
//   from: 'alex.fortine.app@gmail.com', // sender address
//   to: "alexandropinedam1310@gmail.com", // list of receivers
//   subject: "Verify your Fortnite´s email", // Subject line
//   html: "<h1> hh </h1>", // html body
// }