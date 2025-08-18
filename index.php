<?php
require_once 'config.php';
require_once 'email-handler.php';

// Initialize response
$response = ['success' => false, 'message' => ''];

try {
    // Get request method and URI
    $method = $_SERVER['REQUEST_METHOD'];
    $request = $_SERVER['REQUEST_URI'];
    
    // Parse request URI
    $path = parse_url($request, PHP_URL_PATH);
    
    // Handle API routes
    switch ($path) {
        case '/send-form1':
            if ($method === 'POST') {
                handleForm1Submission();
            } else {
                http_response_code(405);
                $response['message'] = 'Method not allowed';
            }
            break;
            
        case '/send-form2':
            if ($method === 'POST') {
                handleForm2Submission();
            } else {
                http_response_code(405);
                $response['message'] = 'Method not allowed';
            }
            break;
            
        case '/send-cta-form':
            if ($method === 'POST') {
                handleCTAFormSubmission();
            } else {
                http_response_code(405);
                $response['message'] = 'Method not allowed';
            }
            break;
            
        case '/api/contact':
            if ($method === 'POST') {
                handleContactFormSubmission();
            } else {
                http_response_code(405);
                $response['message'] = 'Method not allowed';
            }
            break;
            
        default:
            // Serve static files
            serveStaticFile($path);
            exit();
    }
    
} catch (Exception $e) {
    http_response_code(500);
    $response = [
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ];
}

// Return JSON response
echo json_encode($response);

function handleForm1Submission() {
    global $response;
    
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        $response['message'] = 'Invalid JSON input';
        return;
    }
    
    $emailHandler = new EmailHandler();
    $sanitized = $emailHandler->sanitizeInput($input);
    
    // Validate required fields
    $required = ['first_name', 'last_name', 'phone', 'email', 'city', 'branch', 'dob', 'qualification'];
    $errors = $emailHandler->validateRequired($sanitized, $required);
    
    if (!empty($errors)) {
        http_response_code(400);
        $response['message'] = implode(', ', $errors);
        return;
    }
    
    // Validate email
    if (!filter_var($sanitized['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        $response['message'] = 'Invalid email format';
        return;
    }
    
    // Validate phone
    if (!preg_match('/^[0-9+\-\s()]+$/', $sanitized['phone'])) {
        http_response_code(400);
        $response['message'] = 'Invalid phone format';
        return;
    }
    
    try {
        // Determine branch for email routing
        $branch = strtolower($sanitized['branch']);
        $emailHandler = new EmailHandler($branch);
        
        if ($emailHandler->sendEnquiryEmail($sanitized)) {
            $response = [
                'success' => true,
                'message' => 'Form 1 data sent successfully!',
                'redirect' => '/thank-you-page.html'
            ];
        } else {
            throw new Exception('Failed to send email');
        }
    } catch (Exception $e) {
        http_response_code(500);
        $response['message'] = 'Error sending email: ' . $e->getMessage();
    }
}

function handleForm2Submission() {
    global $response;
    
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        $response['message'] = 'Invalid JSON input';
        return;
    }
    
    $emailHandler = new EmailHandler();
    $sanitized = $emailHandler->sanitizeInput($input);
    
    // Validate required fields
    $required = ['name', 'email', 'phone', 'course', 'city'];
    $errors = $emailHandler->validateRequired($sanitized, $required);
    
    if (!empty($errors)) {
        http_response_code(400);
        $response['message'] = implode(', ', $errors);
        return;
    }
    
    // Validate email
    if (!filter_var($sanitized['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        $response['message'] = 'Invalid email format';
        return;
    }
    
    // Validate phone
    if (!preg_match('/^[0-9+\-\s()]+$/', $sanitized['phone'])) {
        http_response_code(400);
        $response['message'] = 'Invalid phone format';
        return;
    }
    
    try {
        // Determine branch for email routing (use city as fallback if branch not provided)
        $branch = isset($sanitized['branch']) ? strtolower($sanitized['branch']) : 'default';
        $emailHandler = new EmailHandler($branch);
        
        if ($emailHandler->sendCourseEmail($sanitized)) {
            $response = [
                'success' => true,
                'message' => 'Form 2 data sent successfully!',
                'redirect' => '/thank-you-page.html'
            ];
        } else {
            throw new Exception('Failed to send email');
        }
    } catch (Exception $e) {
        http_response_code(500);
        $response['message'] = 'Error sending email: ' . $e->getMessage();
    }
}

function handleCTAFormSubmission() {
    global $response;
    
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        $response['message'] = 'Invalid JSON input';
        return;
    }
    
    $emailHandler = new EmailHandler();
    $sanitized = $emailHandler->sanitizeInput($input);
    
    // Validate required fields
    $required = ['name', 'email', 'phone', 'course'];
    $errors = $emailHandler->validateRequired($sanitized, $required);
    
    if (!empty($errors)) {
        http_response_code(400);
        $response['message'] = implode(', ', $errors);
        return;
    }
    
    // Validate email
    if (!filter_var($sanitized['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        $response['message'] = 'Invalid email format';
        return;
    }
    
    // Validate phone
    if (!preg_match('/^[0-9+\-\s()]+$/', $sanitized['phone'])) {
        http_response_code(400);
        $response['message'] = 'Invalid phone format';
        return;
    }
    
    try {
        // Determine branch for email routing
        $branch = isset($sanitized['branch']) ? strtolower($sanitized['branch']) : 'default';
        $emailHandler = new EmailHandler($branch);
        
        if ($emailHandler->sendCTAEmail($sanitized)) {
            $response = [
                'success' => true,
                'message' => 'CTA form data sent successfully!',
                'redirect' => '/thank-you-page.html'
            ];
        } else {
            throw new Exception('Failed to send email');
        }
    } catch (Exception $e) {
        http_response_code(500);
        $response['message'] = 'Error sending email: ' . $e->getMessage();
    }
}

function handleContactFormSubmission() {
    global $response;
    
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        $response['message'] = 'Invalid JSON input';
        return;
    }
    
    $emailHandler = new EmailHandler();
    $sanitized = $emailHandler->sanitizeInput($input);
    
    // Validate required fields
    $required = ['name', 'email', 'phone', 'course', 'message'];
    $errors = $emailHandler->validateRequired($sanitized, $required);
    
    if (!empty($errors)) {
        http_response_code(400);
        $response['message'] = implode(', ', $errors);
        return;
    }
    
    // Validate email
    if (!filter_var($sanitized['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        $response['message'] = 'Invalid email format';
        return;
    }
    
    // Validate phone
    if (!preg_match('/^[0-9+\-\s()]+$/', $sanitized['phone'])) {
        http_response_code(400);
        $response['message'] = 'Invalid phone format';
        return;
    }
    
    try {
        // Determine branch for email routing
        $branch = isset($sanitized['branch']) ? strtolower($sanitized['branch']) : 'default';
        $emailHandler = new EmailHandler($branch);
        
        if ($emailHandler->sendContactEmail($sanitized)) {
            $response = [
                'success' => true,
                'message' => 'Thank you for your message! We will get back to you soon.'
            ];
        } else {
            throw new Exception('Failed to send email');
        }
    } catch (Exception $e) {
        http_response_code(500);
        $response['message'] = 'Error sending message. Please try again later.';
    }
}

function serveStaticFile($path) {
    // Remove leading slash
    $file = ltrim($path, '/');
    
    // Default to index.html for root
    if (empty($file) || $file === '/') {
        $file = 'index.html';
    }
    
    // Security check - prevent directory traversal
    $file = str_replace('..', '', $file);
    
    // Check if file exists
    if (file_exists($file)) {
        $mimeTypes = [
            'html' => 'text/html',
            'css' => 'text/css',
            'js' => 'application/javascript',
            'json' => 'application/json',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            'svg' => 'image/svg+xml',
            'ico' => 'image/x-icon',
            'webp' => 'image/webp'
        ];
        
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        $mime = isset($mimeTypes[$ext]) ? $mimeTypes[$ext] : 'text/plain';
        
        header('Content-Type: ' . $mime);
        readfile($file);
    } else {
        // Fallback to index.html for SPA routing
        if (file_exists('index.html')) {
            header('Content-Type: text/html');
            readfile('index.html');
        } else {
            http_response_code(404);
            echo 'File not found';
        }
    }
}
?>
