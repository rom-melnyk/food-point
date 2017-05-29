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
        !array_key_exists('name', $image) ||
        !array_key_exists('tmp_name', $image) ||
        !array_key_exists('size', $image)
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

    $target_file = $TARGET_DIR . basename($image['name']);
    $image_file_props = pathinfo($target_file);

    if (!in_array(strtoupper($image_file_props['extension']), $ALLOWED_EXTS)) {
        return array( 'error' => TRUE, 'debug' => 'Only JPG, JPEG, PNG & GIF files are allowed' );
    }

    // Make sure names are not duplicated
    $suffix = 0;
    while (file_exists($target_file)) {
        $suffix++;
        $target_file = $image_file_props['dirname'] . '/' .
            $image_file_props['filename'] . "_$suffix" .
            $image_file_props['extension'];
    }

    $moving_result = move_uploaded_file($image['tmp_name'], $target_file);
    return $moving_result
        ? array(
            'error' => FALSE,
            'name' => $suffix
                ? $image_file_props['filename'] . "_$suffix" . $image_file_props['extension']
                : $image_file_props['basename'],
            'props' => $image_props
        )
        : array( 'error' => TRUE, 'debug' => 'Filesystem error occurred' );
}


function delete_dish($name) {
    return array();
}

?>
