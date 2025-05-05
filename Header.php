<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HEADER | E-COMMERCE WEBSITE</title>

    <!-- Favicon -->
    <link rel="icon" href="https://yt3.ggpht.com/a/AGF-l78km1YyNXmF0r3-0CycCA0HLA_i6zYn_8NZEg=s900-c-k-c0xffffffff-no-rj-mo" type="image/gif" sizes="16x16">

    <!-- External Links -->
    <link rel="stylesheet" href="css/header.css">
    <script src="https://kit.fontawesome.com/4a3b1f73a2.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">

    <style>
        /* Additional CSS for Dropdown */
        .user-dropdown {
            position: relative;
            display: inline-block;
            cursor: pointer;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            background-color: white;
            min-width: 180px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
            padding: 10px;
            z-index: 1000;
            border-radius: 8px;
        }

        .user-dropdown:hover .dropdown-content {
            display: block;
        }

        .dropdown-content a {
            display: block;
            padding: 8px 0;
            color: #333;
            text-decoration: none;
        }

        .dropdown-content a:hover {
            text-decoration: underline;
        }

        #userInfo {
            position: absolute;
            right: 20px;
            top: 10px;
            font-size: 14px;
            z-index: 1000;
        }
        #userInfo a {
            margin-left: 10px;
            color: #007BFF;
            text-decoration: none;
        }
    </style>

</head>
<body>

<header>
    <section>
        <!-- MAIN CONTAINER -->
        <div id="container">
            <!-- SHOP NAME -->
            <div id="shopName"><a href="index.php"> <b>Wear-</b>Up </a></div>

            <!-- COLLECTIONS ON WEBSITE -->
            <div id="collection">
                <div id="clothing"><a href="clothing.html"> CLOTHING </a></div>
                <div id="accessories"><a href="accessories.html"> ACCESSORIES </a></div>
            </div>

            <!-- SEARCH SECTION -->
            <div id="search">
                <i class="fas fa-search search"></i>
                <input type="text" id="input" name="searchBox" placeholder="Search for Clothing and Accessories">
            </div>

            <!-- USER SECTION (CART AND USER ICON) -->
            <div id="user">
                <a href="cart.php">
                    <i class="fas fa-shopping-cart addedToCart">
                        <div id="badge">0</div>
                    </i>
                </a>

                <div class="user-dropdown">
                    <i class="fas fa-user-circle userIcon"></i>
                    <div class="dropdown-content">
                        <?php if (isset($_SESSION['email'])): ?>
                            <p>Welcome, <strong><?php echo htmlspecialchars($_SESSION['email']); ?></strong></p>
                            <a href="logout.php">Logout</a>
                        <?php else: ?>
                            <a href="login.html">Login</a>
                            <a href="register.html">Register</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
</header>

<script>
// Update badge from localStorage on every page load
function updateCartBadge() {
    var badge = document.getElementById("badge");
    var orderIds = JSON.parse(localStorage.getItem('orderIds') || '[]');
    var count = orderIds.length;
    if (badge) badge.innerHTML = count;
}
document.addEventListener('DOMContentLoaded', updateCartBadge);
</script>

</body>
</html>
