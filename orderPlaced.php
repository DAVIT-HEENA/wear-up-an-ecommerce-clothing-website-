<?php
session_start();

$conn = new mysqli("localhost", "root", "", "ecommerce");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo "Invalid input";
    exit();
}

$user_email = $_SESSION['email'] ?? 'guest@example.com';
$amount = $data['amount'];
$products = json_encode($data['products']);

$sql = "INSERT INTO orders (user_email, amount, products) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sds", $user_email, $amount, $products);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(500);
    echo "DB Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
