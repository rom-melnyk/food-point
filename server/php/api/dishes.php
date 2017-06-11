<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/api/api-helpers.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/dish-model.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/dish-group-model.php';

$result = NULL;

/******************************************
Testing:

curl --include --request POST --data '{"name": "Borsch", "price": 11}' http://foodpoint.if.ua/api/dishes.php
curl --include --request PUT --data '{"name": "Borsch", "price": 11}' http://foodpoint.if.ua/api/dishes.php?id=...
curl --include --request DELETE http://foodpoint.if.ua/api/dishes.php?id=...

******************************************/


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = array_key_exists('id', $_REQUEST)
        ? model\get_dish($_REQUEST['id'])
        : model\get_dishes();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dish = file_get_contents('php://input');
    $dish = json_decode($dish, true);

    $result = is_array($dish)
        ? count($dish)
            ? model\create_dish($dish)
            : generate_api_error('Nothing to update')
        : generate_api_error('Input not parsable as JSON');
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (array_key_exists('id', $_REQUEST)) {
        $dish = file_get_contents('php://input');
        $dish = json_decode($dish, true);

        $result = is_array($dish)
            ? count($dish)
                ? model\update_dish($_REQUEST['id'], $dish)
                : generate_api_error('Nothing to update')
            : generate_api_error('Input not parsable as JSON');
    } else {
        $result = generate_api_error('"id" param is missing');
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $result = array_key_exists('id', $_REQUEST)
        ? model\delete_dish($_REQUEST['id'])
        : generate_api_error('Missing "id" param in the URL');
}


send_api_output($result);

?>
