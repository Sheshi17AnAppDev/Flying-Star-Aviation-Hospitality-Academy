# Email Configuration Quick Start Guide

## 🚀 Getting Started with Gmail SMTP

### 1. Create .env File
Create a `.env` file in your project root directory:

```bash
# .env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### 2. Get Gmail App Password
1. **Enable 2-Step Verification** on your Google account
2. **Generate App Password** at [Google Account Security](https://myaccount.google.com/security)
3. **Copy the 16-character password** and paste it in your .env file

### 3. Test Your Configuration
```javascript
const EmailConfig = require('./email-config');

// Quick test
EmailConfig.testConnection().then(success => {
    if (success) {
        console.log('Email system is ready!');
    }
});
```

### 4. Common Issues & Solutions

| Error | Solution |
|-------|----------|
| `535-5.7.8` | Use App Password instead of regular password |
| `Invalid login` | Check email and app password |
| `ENOTFOUND` | Check internet connection |

### 5. Usage Examples

```javascript
// Basic usage
const EmailConfig = require('./email-config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(EmailConfig.gmail);

// Send email
await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello from Flying Star!'
});
```

### 6. Validation
```javascript
// Check configuration
const errors = EmailConfig.validateConfig();
if (errors.length === 0) {
    console.log('✅ Configuration is valid');
}
```

## 📞 Support
- **Gmail Help**: https://support.google.com/accounts/answer/185833
- **App Password Guide**: https://support.google.com/accounts/answer/185833?hl=en
