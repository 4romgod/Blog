const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const theDate = require("../util/date");


// SEND A MESSAGE
router.post("/message", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const output = `
      <p>You have a new contact request</p>
      <h3>Contact details</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Subject: ${subject}</li>
      </ul>
      <h3>Message</h3>
      <p>${message}</p>
    `

    // Use Smtp Protocol to send Email
    const smtpTransport = nodemailer.createTransport({
        service: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "4romgod@gmail.com",
            pass: "AdonaiGodI$TheMa$ter365"
        }
    });

    const mailOptions = {
        from: "4romgod@gmail.com",
        to: "ebenezermathebula@gmail.com",
        subject: "Send Email Using Node.js",
        text: "Node.js New world for me",
        html: output
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
    });

});

module.exports = router;
