# Gmail Setup Complete Guide

## Current App Password
Your App Password: `wjmwtondiahrtbji` (remove spaces)

## Step-by-Step Setup

### 1. Create/Update .env File
Create a `.env` file in your project root with:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=wjmwtondiahrtbji
RECIPIENT_EMAIL=your-recipient@email.com
```

### 2. Verify Gmail Configuration
- **Email**: Replace `your-email@gmail.com` with your actual Gmail
- **Password**: Use `wjmwtondiahrtbji` (16 characters, no spaces)
- **Recipient**: Set where you want to receive form submissions

### 3. Test Connection
Run these commands:
```bash
npm install
npm start
```

Then visit: `http://localhost:3000/api/test-connection`

### 4. Troubleshooting
- ✅ App password format: 16 characters, no spaces
- ✅ 2FA enabled on Google account
- ✅ Using Gmail SMTP (not regular password)
- ✅ Environment variables set correctly

### 5. Quick Validation
The server will automatically validate your setup on startup and show:
- ✅ "Gmail connection successful!" if working
- ❌ Specific error messages if issues exist

Your Gmail setup is ready to send emails from the Flying Star website forms!
