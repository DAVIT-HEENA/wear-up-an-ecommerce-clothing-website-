<?php
session_start();
if (!isset($_GET['id'])) {
    echo "No product selected.";
    exit;
}

$productId = $_GET['id'];

// Connect to the database (update with your DB credentials)
$conn = new mysqli('localhost', 'root', '', 'wearup');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch product details
$sql = "SELECT * FROM products WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $productId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $product = $result->fetch_assoc();
} else {
    echo "Product not found.";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($product['name']); ?> | Wear-Up</title>
</head>
<body>
    <h1><?php echo htmlspecialchars($product['name']); ?></h1>
    <p><?php echo htmlspecialchars($product['description']); ?></p>
    <p>Price: $<?php echo htmlspecialchars($product['price']); ?></p>
    <a href="index.php">Back to Products</a>
</body>
</html>