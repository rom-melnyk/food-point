<?php
$TARGET_DIR = $_SERVER['DOCUMENT_ROOT'] . '/gfx/uploaded/';
$ALLOWED_EXTS = array('JPG', 'JPEG', 'PNG', 'GIF');


function get_images() {
    return array();
}


function create_image($image) {
    global $TARGET_DIR;
    global $ALLOWED_EXTS;

    if (
        !$image ||
        !is_array($image) ||
        array_key_exists('name', $image) ||
        array_key_exists('tmp_name', $image) ||
        array_key_exists('size', $image)
    ) {
        return array('error' => TRUE, 'debug' => 'No file provided');
    }

    // Check if image file is a actual image or fake image
    $image_props = getimagesize($image['tmp_name']);
    if ($image_props === FALSE) {
        return array( 'error' => TRUE, 'debug' => 'Image corrupted' );
    }

    if ($image['size'] > 500000) {
        return array( 'error' => TRUE, 'debug' => 'File is bigger than 500k' );
    }

    $image_file_props = pathinfo($target_file);
    if (!in_array(strtoupper($image_file_props['extension']), $ALLOWED_EXTS)) {
        return array( 'error' => TRUE, 'debug' => 'Only JPG, JPEG, PNG & GIF files are allowed' );
    }

    $target_file = $TARGET_DIR . basename($image['name']);

    if (file_exists($target_file)) {
        // TODO Implement me
        
    }

    $moving_result = move_uploaded_file($image['tmp_name'], $target_file);
    return $moving_result
        ? array( 'error' => FALSE, 'name' => $target_file )
        : array( 'error' => TRUE, 'debug' => 'Filesystem error occurred' );
}


function delete_dish($name) {
    return array();
}

?>
