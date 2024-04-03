// Email sending route
app.post("/send-email", (req, res) => {
    const { recipientEmail, subject, message } = req.body;
  
    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'MentorMe.cis440@gmail.com',
        pass: 'MentorMe<3!'
      }
    });
  
    // Email configuration
    const mailOptions = {
      from: 'MentorMe', 
      to: recipientEmail,
      subject: subject,
      text: message
    };
  
    // Send email
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
  
  