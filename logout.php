<?php
session_start();        // Start the session
session_destroy();      // Destroy the session

// Redirect to index page after logout
header("Location: index.php");
exit();
?>
