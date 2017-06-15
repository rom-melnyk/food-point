<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/php/session/session.php';

    $is_login_flow = preg_match('/^\/admin\?login/', $_SERVER['REQUEST_URI']);

    if ($is_login_flow) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (session\is_username_and_password_valid($_POST['username'], $_POST['password'])) {
                session\set_session_cookie();
                header('Location: http://foodpoint.if.ua/admin');
                die();
            } else {
                $error_msg = 'Невірний логін/пароль';
            }
        }
    } else {
        if (!session\is_cookie_valid()) {
            header('Location: http://foodpoint.if.ua/admin?login');
            die();
        }
    }

?>

<html>
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/php/includes/head.php'; ?>
</head>
<body <?php echo $is_login_flow ? '' : 'onload="FP.startAdminApp();"' ?>>
    <div class="main-content">
        <?php include $_SERVER['DOCUMENT_ROOT'] . '/php/includes/header.php'; ?>

        <?php
            if ($is_login_flow) {
                include $_SERVER['DOCUMENT_ROOT'] . '/php/includes/admin-login.php';
            } else {
                echo'<div class="admin-app"></div>';
            }
        ?>

        <?php include $_SERVER['DOCUMENT_ROOT'] . '/php/includes/footer.php'; ?>
    </div>
</body>
</html>
