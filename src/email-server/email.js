const nodemailer = require("nodemailer");
const transport = require("./config");

module.exports.sendEmail = function (req, res) {

  const {emailUser, id} = req.body;

  let transporter = nodemailer.createTransport(transport.infouser());

    transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
      res.send({
        success: false,
        msg: "Error verifying email."
      })
    } else {
        // send mail with defined transport object
        let info = transporter.sendMail({
            from: 'alex.fortine.app@gmail.com', // sender address
            to: emailUser, // list of receivers
            subject: "Verify your Fortnite´s email", // Subject line
            text: "Hello boss?", // plain text body
            html: `this is your id: ${id}`, // html body
          });

              res.send({
                success: true,
                msg: "Email verification sent"
              })
    console.log(success);
    console.log("Server is ready to take our messages");
    }});

  
}
