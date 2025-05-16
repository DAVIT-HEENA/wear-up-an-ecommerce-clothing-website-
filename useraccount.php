<?php
session_start();

if (!isset($_SESSION['email'])) {
    header("Location: login.html");
    exit();
}

$email = $_SESSION['email'];

$servername = "localhost";
$username = "root";
$password = "";
$database = "ecommerce";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user info
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$userResult = $stmt->get_result();
$user = $userResult->fetch_assoc();

if (!$user) {
    echo "User not found.";
    exit();
}

// Get orders using user_email
$orderQuery = $conn->prepare("SELECT * FROM orders WHERE user_email = ?");
$orderQuery->bind_param("s", $email);
$orderQuery->execute();
$orderResult = $orderQuery->get_result();

$address = "Street 24, Fashion Colony, Jaipur, Rajasthan - 302001";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Account</title>
    <link rel="stylesheet" href="css/useraccount.css">
</head>
<body>
    <div class="account-container">
        <h2>User Account</h2>
        <p><strong>Name:</strong> <?= htmlspecialchars($user['name']) ?></p>
        <p><strong>Email:</strong> <?= htmlspecialchars($user['email']) ?></p>
        <p><strong>Address:</strong> <?= $address ?></p>

        <h3>Order History</h3>
        <?php if ($orderResult->num_rows > 0): ?>
            <ul>
                <?php while ($order = $orderResult->fetch_assoc()): ?>
                    <?php
                        $orderDate = new DateTime($order['order_date']);
                        $deliveryDate = clone $orderDate;
                        $deliveryDate->modify('+10 days');

                        $products = json_decode($order['products'], true); // Decode JSON
                        foreach ($products as $product):
                    ?>
                        <li>
                            <?= htmlspecialchars($product['name']) ?><br>
                            <small>Ordered on: <?= $orderDate->format('d M Y, h:i A') ?> |
                            Expected Delivery: <strong><?= $deliveryDate->format('d M Y') ?></strong></small>
                        </li>
                    <?php endforeach; ?>
                <?php endwhile; ?>
            </ul>
        <?php else: ?>
            <p>You have no orders.</p>
        <?php endif; ?>

        <button onclick="window.location.href='logout.php'">Logout</button>
    </div>
</body>
</html>
