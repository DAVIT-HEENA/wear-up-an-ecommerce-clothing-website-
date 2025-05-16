<?php
session_start(); // Start the session at the top

// Database connection
$conn = new mysqli("localhost", "root", "", "ecommerce");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get values from form
$email = $_POST['email'];
$password = $_POST['password'];

// Query the user
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $hashed_password = $row['password'];

    // Verify password
    if (password_verify($password, $hashed_password)) {
        $_SESSION['email'] = $email;
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['name'] = $row['name'];
        header("Location: index.php");
        exit();
    } else {
        echo "Incorrect password";
    }
} else {
    echo "Email not found";
}

$conn->close();
?>
