const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Set up a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: 'MentorMe.cis440@gmail.com',
        pass: 'MentorMe<3!'
    }
});

// Route to handle form submission and send email
app.post('/send-email', (req, res) => {
    const { recipientEmail, message } = req.body;

    const mailOptions = {
        from: 'MentorMe.cis440@gmail.com',
        to: recipientEmail,
        subject: 'Message from MentorMe',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully');
        }
    });
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// <!-- creditials -->
// <!-- EMAIL: MentorMe.cis440@gmail.com   PASSWORD: MentorMe<3! -->