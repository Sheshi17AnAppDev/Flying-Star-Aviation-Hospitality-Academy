<?php
require_once 'config.php';
require_once 'email-handler.php';

// Test script to verify email functionality
header('Content-Type: text/html');

echo "<h1>Flying Star Aviation - PHP Backend Test</h1>";

// Check if PHPMailer is installed
if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    echo "<p style='color: red;'>❌ PHPMailer not found. Run: composer install</p>";
    exit();
} else {
    echo "<p style='color: green;'>✅ PHPMailer is installed</p>";
}

// Test email configuration
global $emailConfig;
echo "<h2>Email Configuration</h2>";
echo "<pre>";
print_r($emailConfig);
echo "</pre>";

// Test branch routing
echo "<h2>Branch Routing Test</h2>";
$branches = ['dilsuknagar', 'amreepet', 'default'];
foreach ($branches as $branch) {
    echo "<p>Branch '$branch' -> " . $emailConfig[$branch]['to_email'] . "</p>";
}

// Test form validation
echo "<h2>Form Validation Test</h2>";

// Test data
$testData = [
    'first_name' => 'Test',
    'last_name' => 'User',
    'phone' => '1234567890',
    'email' => 'test@example.com',
    'city' => 'Hyderabad',
    'branch' => 'dilsuknagar',
    'dob' => '2000-01-01',
    'qualification' => 'Graduate'
];

$emailHandler = new EmailHandler();
$errors = $emailHandler->validateRequired($testData, ['first_name', 'email']);

if (empty($errors)) {
    echo "<p style='color: green;'>✅ Form validation passed</p>";
} else {
    echo "<p style='color: red;'>❌ Form validation failed: " . implode(', ', $errors) . "</p>";
}

// Test email validation
$validEmail = filter_var('test@example.com', FILTER_VALIDATE_EMAIL);
echo "<p>Email validation test: " . ($validEmail ? "✅ Valid" : "❌ Invalid") . "</p>";

// Test phone validation
$validPhone = preg_match('/^[0-9+\-\s()]+$/', '1234567890');
echo "<p>Phone validation test: " . ($validPhone ? "✅ Valid" : "❌ Invalid") . "</p>";

echo "<h2>Next Steps</h2>";
echo "<ol>";
echo "<li>Run: <code>composer install</code> to install PHPMailer</li>";
echo "<li>Update email credentials in <code>config.php</code></li>";
echo "<li>Test form submissions via the website</li>";
echo "<li>Check email delivery</li>";
echo "</ol>";

?>
