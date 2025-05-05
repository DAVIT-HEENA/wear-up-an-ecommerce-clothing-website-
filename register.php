<?php
session_start();

// Database connection
$conn = new mysqli("localhost", "root", "", "ecommerce");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get values from form
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

// Validate passwords match
if ($password !== $confirm_password) {
    die("Passwords do not match");
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Check if email already exists
$check_sql = "SELECT * FROM users WHERE email = ?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("s", $email);
$check_stmt->execute();
$result = $check_stmt->get_result();

if ($result->num_rows > 0) {
    die("Email already exists");
}

// Insert new user
$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $hashed_password);

if ($stmt->execute()) {
    $_SESSION['email'] = $email;
    header("Location: index.php");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
