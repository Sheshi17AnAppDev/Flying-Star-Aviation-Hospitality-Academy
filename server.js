require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

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

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes for pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'privacy-policy.html'));
});

app.get('/terms-conditions', (req, res) => {
  res.sendFile(path.join(__dirname, 'terms-conditions.html'));
});

app.get('/thank-you', (req, res) => {
  res.sendFile(path.join(__dirname, 'thank-you-page.html'));
});

// API Routes for form submissions
app.post('/send-form1', async (req, res) => {
  const { first_name, last_name, phone, email, city, branch, dob, qualification } = req.body;

  if (!first_name || !last_name || !phone || !email || !city || !branch || !dob || !qualification) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  const mailOptions = {
    from: `"Flying Star Website" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
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

app.post('/send-form2', async (req, res) => {
  const { name, email, phone, course, city } = req.body;

  if (!name || !email || !phone || !course || !city) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  const mailOptions = {
    from: `"Flying Star Website" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
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

// API route for contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, course, message } = req.body;

  if (!name || !email || !phone || !course || !message) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  const mailOptions = {
    from: `"Flying Star Website" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Course:</b> ${course}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error sending message. Please try again later.' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Privacy Policy available at: http://localhost:${PORT}/privacy-policy`);
});
