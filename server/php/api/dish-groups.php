<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/dish-group-model.php';

header('Content-Type: application/json; charset=utf-8');
$result = null;

/******************************************
Testing:

curl --include --request POST --data '{"name": "Borsch", "price": 11}' http://foodpoint.if.ua/api/dish-groups
curl --include --request PUT --data '{"name": "Borsch", "price": 11}' http://foodpoint.if.ua/api/dish-groups?id=...
curl --include --request DELETE http://foodpoint.if.ua/api/dish-groups?id=...

******************************************/


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = array_key_exists('id', $_REQUEST) ? get_dish_group($_REQUEST['id']) : get_dish_groups();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $group = file_get_contents('php://input');
    $group = json_decode($group, true);

    $result = is_array($group)
        ? count($group)
            ? create_dish_group($group)
            : generate_error('Nothing to update')
        : generate_error('Input not parsable as JSON');
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (array_key_exists('id', $_REQUEST)) {
        $group = file_get_contents('php://input');
        $group = json_decode($group, true);
        
        $result = is_array($group)
        ? count($group)
            ? update_dish_group($_REQUEST['id'], $group)
            : generate_error('Nothing to update')
        : generate_error('Input not parsable as JSON');
    } else {
        $result = generate_error('"id" param is missing');
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $result = array_key_exists('id', $_REQUEST) ? delete_dish_group($_REQUEST['id']) : generate_error('Missing "id" param in the URL');
}


$result = array_key_exists('error', $result) && $result['error']
    ? generate_error($result)
    : $result;
echo json_encode($result);


// --------------------------------- helpers ---------------------------------
function generate_error($info) {
    return array(
        'error' => TRUE,
        'debug' => $info
    );
}

?>
