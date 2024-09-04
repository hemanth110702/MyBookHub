const nodeMailer = require('nodemailer');
const crypto = require('crypto');
const Otp = require('../model/otpModel');

const sendOtp = async (req, res) => {
  const { email, checkFP } = req.body;
  if (!email)
    return res.status(400).send("Email is required");

  const otp = crypto.randomInt(100000, 999999).toString();

  try {

    if (checkFP === 1) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: "User not registered" });
      }
    }

    await Otp.findOneAndUpdate(
      { email },
      { otp },
      { upsert: true, new: true }
    );

    // nodemailer execution
    const transport = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASS
      }
    });

    await transport.sendMail({
      from: process.env.NM_FROM,
      to: email,
      subject: "MyBookHub - Account Verification",
      text: "Otp to verify account " + otp,
      html: `
            <h1>Verify your account</h1>
            <p>Here is your verification code is <b>${otp}</b></p>
          `,
    });
    return res.status(200).send({ message: 'OTP sent' });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to send OTP' });
  }
}

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).send({ error: 'Email and OTP are required' });

  try {
    const otpDoc = await Otp.findOne({ email });
    if (otpDoc && otpDoc.otp == otp) {
      await Otp.deleteOne({ email });
      return res.status(200).send({ message: "OTP verified" });
    } else {
      return res.status(400).send({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Failed to verify OTP" });
  }
}

module.exports = { sendOtp, verifyOtp }
