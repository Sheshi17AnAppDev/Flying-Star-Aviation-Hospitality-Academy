<?php
// Email configuration based on branch - Hostinger mail settings
$emailConfig = [
    'dilsuknagar' => [
        'host' => 'smtp.hostinger.com',
        'username' => 'connect@flyingstaraviation.com',
        'password' => 'Connect.fly@2024',
        'from_email' => 'connect@flyingstaraviation.com',
        'from_name' => 'Flying Star Aviation - Dilsukhnagar',
        'to_email' => 'connect@flyingstaraviation.com',
        'port' => 587,
        'encryption' => 'tls'
    ],
    'amreepet' => [
        'host' => 'smtp.hostinger.com',
        'username' => 'info@flyingstaraviation.com',
        'password' => 'MT.w2w@2023',
        'from_email' => 'info@flyingstaraviation.com',
        'from_name' => 'Flying Star Aviation - Ameerpet',
        'to_email' => 'info@flyingstaraviation.com',
        'port' => 587,
        'encryption' => 'tls'
    ],
    'default' => [
        'host' => 'smtp.hostinger.com',
        'username' => 'connect@flyingstaraviation.com',
        'password' => 'Connect.fly@2024',
        'from_email' => 'connect@flyingstaraviation.com',
        'from_name' => 'Flying Star Aviation',
        'to_email' => 'connect@flyingstaraviation.com',
        'port' => 587,
        'encryption' => 'tls'
    ]
];

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
