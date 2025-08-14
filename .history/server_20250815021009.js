require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint for Form 1 submission
app.post('/send-form1', async (req, res) => {
  const { first_name, last_name, phone, email, city, branch, dob, qualification } = req.body;

  if (!first_name || !last_name || !phone || !email || !city || !branch || !dob || !qualification) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  const mailOptions = {
    from: `"Flying Star Website" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL, // Your email to receive submissions
    subject: `New Form 1 Submission from ${first_name} ${last_name}`,
    html: `
      <h3>New Form Submission Details</h3>
      <p><b>Name:</b> ${first_name} ${last_name}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>City:</b> ${city}</p>
      <p><b>Branch:</b> ${branch}</p>
      <p><b>Date of Birth:</b> ${dob}</p>
      <p><b>Qualification:</b> ${qualification}</p>
    `,
  };

  try {
            await transporter.sendMail(mailOptions);
            res.json({ message: 'Form 1 data sent successfully!', redirect: '/thank-you-page.html' });
  } catch (error) {
    console.error('Error sending email:', error.message || error);
    res.status(500).json({ message: 'Error sending email.', error: error.message || error });
  }
});

// Endpoint for Form 2 submission
app.post('/send-form2', async (req, res) => {
  const { name, email, phone, course, city } = req.body;

  if (!name || !email || !phone || !course || !city) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  const mailOptions = {
    from: `"Flying Star Website" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL, // Your email to receive submissions
    subject: `New Form 2 Submission from ${name}`,
    html: `
      <h3>New Form 2 Submission Details</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Course Selected:</b> ${course}</p>
      <p><b>City:</b> ${city}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: 'Form 2 data sent successfully!', 
      redirect: '/thank-you-page.html' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error sending email.', 
      error: error.message 
    });
  }
});

// Endpoint for CTA form submission
app.post('/send-cta-form', async (req, res) => {
  const { name, email, phone, course } = req.body;

  if (!name || !email || !phone || !course) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  const mailOptions = {
    from: `"Flying Star Website" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New CTA Form Submission from ${name}`,
    html: `
      <h3>New CTA Form Submission Details</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Course Selected:</b> ${course}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: 'CTA form data sent successfully!', 
      redirect: '/thank-you-page.html' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error sending email.', 
      error: error.message 
    });
  }
});


const path = require('path');

// Serve frontend static files from current directory
app.use(express.static(path.join(__dirname)));

// Serve index.html on root request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
