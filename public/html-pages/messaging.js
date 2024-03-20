const { Nylas } = require('nylas');

Nylas.config({
  clientId: 'b165b261-3dc3-4b94-87f1-757ee9949eb7',
  clientSecret: 'b165b261-3dc3-4b94-87f1-757ee9949eb7',
});

const nylas = Nylas.with('yk_v0_r8YhihrDLrCbWnlWVrWia5e46E5faK9x6TueTRkmFclti4YiNHWnW2DieQSUCYBl');

nylas.messages.send({
  to: [{ email: 'recipient@example.com' }],
  from: 'sender@example.com',
  subject: 'Hello from Nylas!',
  body: 'This is a test email sent using Nylas.',
}).then(message => {
  console.log('Email sent successfully:', message);
}).catch(error => {
  console.error('Error sending email:', error);
});



