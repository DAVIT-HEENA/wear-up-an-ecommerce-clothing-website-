<?php
session_start();
header('Content-Type: application/json');

// Check login
if (!isset($_SESSION['email'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

// Read input JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validate data
if (
    !isset($data['amount']) || 
    !isset($data['products']) || 
    !is_array($data['products']) || 
    empty($data['products'])
) {
    echo json_encode(['success' => false, 'message' => 'Missing amount or product data']);
    exit;
}

$user_email = $_SESSION['email'];
$amount = $data['amount'];
$products_json = json_encode($data['products']);
$order_date = date('Y-m-d H:i:s');

// DB connection
$conn = new mysqli("localhost", "root", "", "ecommerce");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Insert order
$stmt = $conn->prepare("INSERT INTO orders (order_date, user_email, amount, products) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssis", $order_date, $user_email, $amount, $products_json);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database insert failed']);
}

$conn->close();
?>
