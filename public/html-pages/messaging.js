const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// POST endpoint to send message
app.post("/send-message", (req, res) => {
    const { sendEmail, subject, message } = req.body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mentorme.cis440@gmail.com',
            pass: 'yvke ksxu raks lmds'
        }
    });

    // Email message options
    const mailOptions = {
        from: 'mentorme.cis440@gmail.com',
        to: sendEmail,
        subject: subject || 'Message from your mentor', // Use provided subject or default value
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).send("Failed to send message.");
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send("Message sent successfully!");
        }
    });
});
