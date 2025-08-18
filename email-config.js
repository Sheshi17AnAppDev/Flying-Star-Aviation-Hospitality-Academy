// Email configuration for JavaScript forms
const emailConfig = {
    // Gmail SMTP settings
    smtp: {
        host: 'smtp.gmail.com',
        port: 587, // TLS/STARTTLS
        secure: false, // Use TLS
        auth: {
            user: 'connect@flyingstaraviation.com',
            pass: 'your-app-password-here' // Replace with actual Gmail App Password
        }
    },
    
    // Alternative SSL settings
    smtpSSL: {
        host: 'smtp.gmail.com',
        port: 465, // SSL
        secure: true,
        auth: {
            user: 'connect@flyingstaraviation.com',
            pass: 'your-app-password-here' // Replace with actual Gmail App Password
        }
    },
    
    // Email addresses
    recipients: {
        dilsuknagar: 'connect@flyingstaraviation.com',
        amreepet: 'info@flyingstaraviation.com',
        default: 'connect@flyingstaraviation.com'
    },
    
    // Instructions for fixing SMTP authentication
    setupInstructions: `
        To fix SMTP authentication issues:
        
        1. Go to Google Account settings
        2. Enable 2-factor authentication
        3. Generate App Password for "Mail"
        4. Replace 'your-app-password-here' with the 16-character app password
        
        Alternative solutions:
        - Use environment variables for sensitive data
        - Consider using email services like SendGrid, Mailgun, or AWS SES
        - Use PHP mail() function as fallback (less reliable)
    `
};

// Export for use in PHP files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = emailConfig;
}
