<?php
require_once 'config.php';
require_once 'vendor/autoload.php'; // PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailHandler {
    private $mail;
    private $config;
    
    public function __construct($branch = 'default') {
        global $emailConfig;
        
        $this->config = isset($emailConfig[$branch]) ? $emailConfig[$branch] : $emailConfig['default'];
        
        $this->mail = new PHPMailer(true);
        $this->setupMailer();
    }
    
    private function setupMailer() {
        try {
            $this->mail->isSMTP();
            $this->mail->Host = $this->config['host'];
            $this->mail->SMTPAuth = true;
            $this->mail->Username = $this->config['username'];
            $this->mail->Password = $this->config['password'];
            
            // Use TLS encryption for Hostinger mail
            $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $this->mail->Port = isset($this->config['port']) ? $this->config['port'] : 587;
            $this->mail->CharSet = 'UTF-8';
            
            $this->mail->setFrom($this->config['from_email'], $this->config['from_name']);
            $this->mail->addAddress($this->config['to_email']);
            
            $this->mail->isHTML(true);
        } catch (Exception $e) {
            throw new Exception("Mailer setup failed: " . $e->getMessage());
        }
    }
    
    public function sendEnquiryEmail($data) {
        try {
            $this->mail->Subject = "New Form 1 Submission from {$data['first_name']} {$data['last_name']}";
            
            $body = "
                <h3>New Form Submission Details</h3>
                <p><b>Name:</b> {$data['first_name']} {$data['last_name']}</p>
                <p><b>Phone:</b> {$data['phone']}</p>
                <p><b>Email:</b> {$data['email']}</p>
                <p><b>City:</b> {$data['city']}</p>
                <p><b>Branch:</b> {$data['branch']}</p>
                <p><b>Date of Birth:</b> {$data['dob']}</p>
                <p><b>Qualification:</b> {$data['qualification']}</p>
            ";
            
            $this->mail->Body = $body;
            $this->mail->AltBody = strip_tags(str_replace('<br>', "\n", $body));
            
            return $this->mail->send();
        } catch (Exception $e) {
            throw new Exception("Failed to send enquiry email: " . $e->getMessage());
        }
    }
    
    public function sendCourseEmail($data) {
        try {
            $this->mail->Subject = "New Form 2 Submission from {$data['name']}";
            
            $body = "
                <h3>New Form 2 Submission Details</h3>
                <p><b>Name:</b> {$data['name']}</p>
                <p><b>Email:</b> {$data['email']}</p>
                <p><b>Phone:</b> {$data['phone']}</p>
                <p><b>Course Selected:</b> {$data['course']}</p>
                <p><b>City:</b> {$data['city']}</p>
            ";
            
            $this->mail->Body = $body;
            $this->mail->AltBody = strip_tags(str_replace('<br>', "\n", $body));
            
            return $this->mail->send();
        } catch (Exception $e) {
            throw new Exception("Failed to send course email: " . $e->getMessage());
        }
    }
    
    public function sendCTAEmail($data) {
        try {
            $this->mail->Subject = "New CTA Form Submission from {$data['name']}";
            
            $body = "
                <h3>New CTA Form Submission Details</h3>
                <p><b>Name:</b> {$data['name']}</p>
                <p><b>Email:</b> {$data['email']}</p>
                <p><b>Phone:</b> {$data['phone']}</p>
                <p><b>Course Selected:</b> {$data['course']}</p>
            ";
            
            $this->mail->Body = $body;
            $this->mail->AltBody = strip_tags(str_replace('<br>', "\n", $body));
            
            return $this->mail->send();
        } catch (Exception $e) {
            throw new Exception("Failed to send CTA email: " . $e->getMessage());
        }
    }
    
    public function sendContactEmail($data) {
        try {
            $this->mail->Subject = "New Contact Form Submission from {$data['name']}";
            
            $body = "
                <h3>New Contact Form Submission</h3>
                <p><b>Name:</b> {$data['name']}</p>
                <p><b>Email:</b> {$data['email']}</p>
                <p><b>Phone:</b> {$data['phone']}</p>
                <p><b>Course:</b> {$data['course']}</p>
                <p><b>Message:</b> {$data['message']}</p>
            ";
            
            $this->mail->Body = $body;
            $this->mail->AltBody = strip_tags(str_replace('<br>', "\n", $body));
            
            return $this->mail->send();
        } catch (Exception $e) {
            throw new Exception("Failed to send contact email: " . $e->getMessage());
        }
    }
    
    public function sanitizeInput($data) {
        $sanitized = [];
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $sanitized[$key] = htmlspecialchars(strip_tags(trim($value)));
            } else {
                $sanitized[$key] = $value;
            }
        }
        return $sanitized;
    }
    
    public function validateRequired($data, $requiredFields) {
        $errors = [];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty(trim($data[$field]))) {
                $errors[] = "Please fill all required fields. Missing: $field";
            }
        }
        return $errors;
    }
}
?>
