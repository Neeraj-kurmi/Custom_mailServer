const nodemailer = require('nodemailer');
const imaps = require('imap-simple');

// Send email using SMTP
const sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    await transporter.sendMail({ from: process.env.EMAIL, to, subject, text });
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve emails using IMAP
const getEmails = async (req, res) => {
  try {
    const config = {
      imap: {
        user: process.env.EMAIL,
        password: process.env.EMAIL_PASSWORD,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 10000,
        tlsOptions: { rejectUnauthorized: false }, // Allow self-signed certificates for development
      },
    };

    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');

    // Search for all emails
    const messages = await connection.search(['ALL'], {
      bodies: ['HEADER', 'TEXT'], // Fetch the full header and text
      struct: true,
    });

    // Process emails
    const emails = messages.map((msg) => {
      const headerPart = msg.parts.find((part) => part.which === 'HEADER');
      const bodyPart = msg.parts.find((part) => part.which === 'TEXT');

      return {
        from: headerPart?.body?.from?.join(', ') || 'Unknown',
        subject: headerPart?.body?.subject?.join(', ') || 'No Subject',
        body: bodyPart?.body || 'No Body', // Optional: Include the email body
      };
    });

    res.status(200).json(emails);
  } catch (err) {
    console.error('Error retrieving emails:', err.message);
    res.status(500).json({ error: 'Failed to retrieve emails' });
  }
};






module.exports = { sendEmail, getEmails };
