<?php
session_start();

// Function to check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['email']);
}

// Function to get current user's ID
function getCurrentUserId() {
    return $_SESSION['user_id'] ?? null;
}

// Function to get current user's name
function getCurrentUserName() {
    return $_SESSION['name'] ?? null;
}

// Function to get current user's email
function getCurrentUserEmail() {
    return $_SESSION['email'] ?? null;
}
?> 
