# Gmail SMTP Setup Complete Guide

## ✅ Your Current Configuration
- **Email**: ysheshipreetham@gmail.com
- **Current Password**: wjmw tond iahr tbji (16 characters - looks like App Password)
- **Recipient**: ysheshipreetham@gmail.com

## 🔍 Testing Your Current Setup

### Test 1: Check Environment Variables
```bash
node -e "require('dotenv').config(); console.log('Email:', process.env.EMAIL_USER); console.log('Password length:', process.env.EMAIL_PASS?.length);"
```

### Test 2: Test Connection
```bash
node -e "const EmailConfig = require('./email-config'); EmailConfig.testConnection().then(console.log)"
```

### Test 3: Start Server
```bash
npm start
```

## 🚨 If Still Failing

### Option 1: Regenerate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Delete existing "Flying Star" app password
3. Create new one: Security → App passwords → Mail → Other → "Flying Star"
4. Copy the new 16-character password
5. Update .env file manually

### Option 2: Enable Less Secure Apps (Not Recommended)
If App Password doesn't work, you can temporarily enable:
1. Go to https://myaccount.google.com/lesssecureapps
2. Enable "Less secure app access"
3. Use regular password (not recommended for production)

### Option 3: Use Gmail OAuth2 (Advanced)
For production, consider using Gmail OAuth2 instead of App Passwords.

## ✅ Verification Steps

After updating credentials:
1. **Check server logs** - should show "✅ Gmail connection successful!"
2. **Test endpoints**:
   - http://localhost:3000/api/test-connection
   - http://localhost:3000/api/instructions
3. **Send test email** via your website form

## 📞 Support Resources
- Gmail App Passwords: https://support.google.com/accounts/answer/185833
- Gmail SMTP Troubleshooting: https://support.google.com/mail/answer/7126229
