<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/data-models/dish-model.php';

header('Content-Type: application/json; charset=utf-8');
$result = null;

/******************************************
Testing:

curl --include --request POST --data '{"name": "Borsch", "price": 11}' http://foodpoint.if.ua/api/dishes.php
curl --include --request PUT --data '{"name": "Borsch", "price": 11}' http://foodpoint.if.ua/api/dishes.php?id=...
curl --include --request DELETE http://foodpoint.if.ua/api/dishes.php?id=...

******************************************/


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = array_key_exists('id', $_REQUEST) ? get_dish($_REQUEST['id']) : get_dishes();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dish = file_get_contents('php://input');
    $dish = json_decode($dish);

    $result = $dish ? create_dish($dish) : generate_error('Input not parseable as JSON');
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (array_key_exists('id', $_REQUEST)) {
        $dish = file_get_contents('php://input');
        $dish = json_decode($dish);
        
        $result = update_dish($_REQUEST['id'], $dish);
    } else {
        $result = generate_error('"id" param is missing');
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $result = array_key_exists('id', $_REQUEST) ? delete_dish($_REQUEST['id']) : generate_error('"id" param is missing');
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
