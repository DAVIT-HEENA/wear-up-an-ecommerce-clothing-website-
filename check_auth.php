<?php
session_start();
header('Content-Type: application/json');

$response = array(
    'isLoggedIn' => isset($_SESSION['email']),
    'email' => isset($_SESSION['email']) ? $_SESSION['email'] : null
);

echo json_encode($response);
?> 