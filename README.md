# Flying Star Email Server

A Node.js email server for Flying Star Aviation to send data via email using Gmail SMTP.

## 🚀 Quick Start

### 1. Setup Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env file with your Gmail credentials
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📧 API Endpoints

### Send Email
```http
POST http://localhost:3000/api/send-email
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "New Form Submission",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Hello, this is a test message"
  },
  "template": "contact"
}
```

### Test Connection
```http
GET http://localhost:3000/api/test-connection
```

### Get Setup Instructions
```http
GET http://localhost:3000/api/instructions
```

## 📋 Available Templates

- **form-data**: For general form submissions
- **contact**: For contact form inquiries
- **generic**: For any other data

## 🔐 Gmail Setup Instructions

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use the 16-character app password in your .env file

## 🧪 Testing

You can test the email functionality using the provided endpoints or use tools like Postman.

## 📞 Support

For any issues with email configuration, check the `/api/instructions` endpoint for detailed setup guidance.
