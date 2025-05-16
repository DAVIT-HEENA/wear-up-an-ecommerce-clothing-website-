<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wear-Up | E-Commerce Website</title>

    <!-- Favicon -->
    <link rel="icon" href="https://yt3.ggpht.com/a/AGF-l78km1YyNXmF0r3-0CycCA0HLA_i6zYn_8NZEg=s900-c-k-c0xffffffff-no-rj-mo" type="image/gif" sizes="16x16">

    <!-- Fonts & Icons -->
    <script src="https://kit.fontawesome.com/4a3b1f73a2.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">

    <!-- Slick Slider -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css">

    <!-- jQuery -->
    <script src="js/jQuery3.4.1.js"></script>

    <style>
        body {
            font-family: 'Lato', sans-serif;
            margin: 0;
            padding: 0;
        }
    </style>
</head>

<body>

    <!-- HEADER (now includes login status via PHP session) -->
    <?php include 'header.php'; ?>

    <!-- SLIDER -->
    <?php include 'slider.html'; ?>

    <!-- CONTENT -->
    <?php include 'content.html'; ?>

    <!-- FOOTER -->
    <?php include 'footer.html'; ?>

    <!-- SLIDER JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#containerSlider').slick({
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 1500
            });
        });
    </script>

    <!-- CONTENT JS -->
    <script src="content.js"></script>

</body>
</html>
