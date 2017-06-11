<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/api/api-helpers.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/image-model.php';

$result = NULL;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = model\get_images();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = array_key_exists('image', $_FILES)
        ? model\create_image($_FILES['image'])
        : generate_api_error('Missing "image" field in the form data');
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $result = array_key_exists('name', $_REQUEST)
        ? model\delete_image($_REQUEST['name'])
        : generate_api_error('Missing "name" param in the URL');
} else {
    $result = generate_api_error('Method not supported');
}

send_api_output($result);

?>