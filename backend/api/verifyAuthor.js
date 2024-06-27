const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');



const emailVerification = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS
    }
  })

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready for message");
      console.log(success);
    }
  })
}

module.exports = {emailVerification};