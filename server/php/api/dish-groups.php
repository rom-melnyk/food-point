<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/dish-group-model.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/api/api-helpers.php';

$result = NULL;

/******************************************
Testing:

curl --include --request POST --data '{"name": "Borsch", "price": 11}' http://foodpoint.if.ua/api/dish-groups
curl --include --request PUT --data '{"name": "Borsch", "price": 11}' http://foodpoint.if.ua/api/dish-groups?id=...
curl --include --request DELETE http://foodpoint.if.ua/api/dish-groups?id=...

******************************************/


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = array_key_exists('id', $_REQUEST)
        ? model\get_dish_group($_REQUEST['id'])
        : model\get_dish_groups();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $group = file_get_contents('php://input');
    $group = json_decode($group, true);

    $result = is_array($group)
        ? count($group)
            ? model\create_dish_group($group)
            : generate_api_error('Nothing to update')
        : generate_api_error('Input not parsable as JSON');
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (array_key_exists('id', $_REQUEST)) {
        $group = file_get_contents('php://input');
        $group = json_decode($group, true);
        
        $result = is_array($group)
        ? count($group)
            ? model\update_dish_group($_REQUEST['id'], $group)
            : generate_api_error('Nothing to update')
        : generate_api_error('Input not parsable as JSON');
    } else {
        $result = generate_api_error('"id" param is missing');
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $result = array_key_exists('id', $_REQUEST)
        ? model\delete_dish_group($_REQUEST['id'])
        : generate_api_error('Missing "id" param in the URL');
}


send_api_output($result);

?>
