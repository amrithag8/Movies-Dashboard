const nodemailer = require("nodemailer");
const SendEmail = async (useremail, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "g8amrutha@gmail.com",
      pass: "ogeolqqkzivzxiln",
    },
    from: 'no-reply@moviedashboard.com',
  });

  const info = await transporter.sendMail({
    from: '"no-reply@moviedashboard.com" <g8amrutha@gmail.com>', // sender address
    to: useremail, // list of receivers
    subject: "OTP", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><h1>Hello ${useremail}</h1> <br/> <p>Your one time password is ${otp} </p></div>`, // html body
  });

  
};

module.exports = SendEmail;
