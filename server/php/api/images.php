<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/image-model.php';

header('Content-Type: application/json; charset=utf-8');
$result = null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = get_images();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = array_key_exists('image', $_FILES)
        ? create_image($_FILES['image'])
        : array('error' => TRUE, 'debug' => 'Missing "image" field in the form data');
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $result = array_key_exists('name', $_REQUEST)
        ? delete_dish($_REQUEST['name'])
        : array('error' => TRUE, 'debug' => 'Missing "name" param in the URL');
} else {
    $result = array('error' => TRUE, 'debug' => 'Method not supported');
}

echo json_encode($result);
