# Flying Star Aviation - PHP Backend

This is the PHP backend replacement for the Node.js server, providing the same functionality with branch-based email routing.

## Features

- **Branch-based Email Routing**: Automatically routes emails to the correct branch based on form selection
  - Dilsuknagar branch: connect@flyingstaraviation.com
  - Amreepet branch: info@flyingstaraviation.com
- **Form Handling**: Handles all 4 form types from the frontend
- **Email Validation**: Validates email addresses and phone numbers
- **Security**: Input sanitization and validation
- **CORS Support**: Cross-origin resource sharing enabled
- **Static File Serving**: Serves HTML, CSS, JS, and image files

## Installation

1. **Install PHP dependencies**:
   ```bash
   composer install
   ```

2. **Configure email settings** in `config.php`:
   - Update email credentials for each branch
   - Configure SMTP settings if needed

3. **Set up web server**:
   - Apache: Ensure `.htaccess` is enabled
   - Nginx: Configure appropriate location blocks

4. **Test the setup**:
   - Visit `http://localhost` to see the website
   - Test form submissions

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/send-form1` | POST | Enquiry form submission |
| `/send-form2` | POST | Course form submission |
| `/send-cta-form` | POST | CTA form submission |
| `/api/contact` | POST | Contact form submission |

## Form Data Structure

### Form 1 (Enquiry)
```json
{
  "first_name": "string",
  "last_name": "string",
  "phone": "string",
  "email": "string",
  "city": "string",
  "branch": "dilsuknagar|amreepet",
  "dob": "YYYY-MM-DD",
  "qualification": "string"
}
```

### Form 2 (Course)
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "course": "string",
  "city": "string"
}
```

### CTA Form
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "course": "string"
}
```

### Contact Form
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "course": "string",
  "message": "string"
}
```

## Response Format

All endpoints return JSON responses:

**Success:**
```json
{
  "success": true,
  "message": "Form data sent successfully!",
  "redirect": "/thank-you-page.html"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Security Features

- Input sanitization using `htmlspecialchars()`
- Email validation using `filter_var()`
- Phone number validation
- XSS protection headers
- CSRF protection (can be added)
- Rate limiting (can be added)

## Troubleshooting

### Common Issues

1. **PHPMailer not found**:
   - Run `composer install` to install dependencies

2. **Email not sending**:
   - Check Gmail SMTP settings
   - Verify email credentials in `config.php`
   - Enable "Less secure app access" in Gmail (or use App Passwords)

3. **Permission denied**:
   - Ensure proper file permissions: `chmod 644` for PHP files
   - Check web server user permissions

4. **CORS errors**:
   - Verify CORS headers in `config.php`
   - Check browser console for specific errors

### Testing

Test each endpoint using curl:

```bash
# Test Form 1
curl -X POST http://localhost/send-form1 \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Test","last_name":"User","phone":"1234567890","email":"test@example.com","city":"Hyderabad","branch":"dilsuknagar","dob":"2000-01-01","qualification":"Graduate"}'

# Test Form 2
curl -X POST http://localhost/send-form2 \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","course":"Aviation","city":"Hyderabad"}'
```

## Migration from Node.js

This PHP backend maintains full compatibility with the existing frontend JavaScript. No changes are required to the HTML or JavaScript files.

The key differences from Node.js:
- Uses PHPMailer instead of Nodemailer
- Apache/Nginx instead of Express
- PHP sessions instead of Node.js middleware
- File-based routing instead of Express routes
