<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/dishes-structure-model.php'; ?>
<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/php/includes/dishes.php'; ?>

<html>
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/php/includes/head.php'; ?>
</head>
<body onload="FP.startApp();">
    <div class="main-content">
        <?php include $_SERVER['DOCUMENT_ROOT'] . '/php/includes/header.php'; ?>

        <div class="dishes">
<?php
    $structure = get_dishes_structure();
    echo get_group($structure);
?>
        </div>

        <?php include $_SERVER['DOCUMENT_ROOT'] . '/php/includes/footer.php'; ?>
    </div>
</body>
</html>

<?php
?>
