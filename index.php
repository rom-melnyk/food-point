<html>
<head>
    <title>Food Point</title>
    <link rel="stylesheet" href="./style.css"/>
    <script type="text/javascript" src="./script.js"></script>
</head>
<body onload="FP.run();">
    <header>
        <div class="top-level-wrapper">
            <span class="logo"></span>
        </div>
    </header>

    <nav class="site-menu">
        <div class="top-level-wrapper">
            <?php include './php/components/site-menu.php'; ?>
        </div>
    </nav>

    <section class="dishes">
        <div class="top-level-wrapper">
            <h1>Що є поїсти?</h1>
            Here be menu
        </div>
    </section>

    <section class="order">
        <div class="top-level-wrapper">
            <h1>Замовити їжу просто!</h1>
            The order info here
        </div>
    </section>

    <footer class="row">
        <div class="top-level-wrapper">
            <div class="col-1">
                &laquo;Фуд Поінт&raquo;<br/>
                вул. Валова 5а<br/>
                Івано-Франківськ<br/>
                <span class="phone-num">(067)11-67-130</span>
            </div>
            <div class="col-1">
                Інші контакти для скарг та пропозицій з 10:00 до 19:00<br/>
                <span class="phone-num">(067) 11-67-130</span>
            </div>
            <div class="col-1">
                <?php include './php/components/site-menu.php'; ?>
            </div>
            <div class="col-1">
                <span class="logo"></span>
                &copy; Food Point 2014&ndash;2017<br/>
                Вдосконалюємось кожного дня!
            </div>
        </div>
    </footer>
</body>
</html>
