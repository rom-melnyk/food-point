<h1>Введи логін та пароль</h1>
<?php
    // Expects $error_msg from the caller file
    $error_msg = isset($error_msg)
        ? '<h2 class="red error">' . $error_msg . '</h2>'
        : '';
    echo $error_msg;
?>
<form class="form" method="POST" action="/admin?login">

<div class="row">
    <div class="label column-3">Логін</div>
    <div class="column-9">
        <input type="text" name="username"/>
    </div>
</div>

<div class="row">
    <div class="label column-3">Пароль</div>
    <div class="column-9">
        <input type="password" name="password"/>
    </div>
</div>

<div class="controls">
    <span class="button green" onClick="javascript: document.querySelector('form').submit();" title="Увійти">
        <i class="fa fa-check"></i>
    </span>
    <span class="button grey" onClick="javascript: document.querySelector('form').reset();" title="Скасувати">
        <i class="fa fa-times"></i>
    </span>
</div>
</form>
