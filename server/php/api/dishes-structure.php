<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/api/api-helpers.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/dishes-structure-model.php';

$result = $_SERVER['REQUEST_METHOD'] === 'GET'
    ? get_dishes_structure()
    : NULL;

send_api_output($result);

?>
