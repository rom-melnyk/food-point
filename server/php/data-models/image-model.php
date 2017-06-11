<?php
namespace model {
    const HTML_TARGET_DIR = '/gfx/uploaded/';
    $FS_TARGET_DIR = $_SERVER['DOCUMENT_ROOT'] . HTML_TARGET_DIR;
    $ALLOWED_EXTS = array('JPG', 'JPEG', 'PNG', 'GIF');


    function get_images() {
        global $FS_TARGET_DIR;

        $files = scandir($FS_TARGET_DIR) or array();
        $files = array_filter($files, function ($fname) {
            return helpers\is_extension_valid( pathinfo($fname, PATHINFO_EXTENSION) );
        });
        $files = array_values($files);
        return $files;
    }


    function create_image($image) {
        global $FS_TARGET_DIR;
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

        $target_basename = basename($image['name']);
        $target_full_filename = $FS_TARGET_DIR . $target_basename;
        $target_file_props = pathinfo($target_full_filename);

        if (!helpers\is_extension_valid($target_file_props['extension'])) {
            return array( 'error' => TRUE, 'debug' => 'Only JPG, JPEG, PNG & GIF files are allowed' );
        }

        // Make sure names are not duplicated
        $suffix = 0;
        while (file_exists($target_full_filename)) {
            $suffix++;
            $target_basename = $target_file_props['filename'] .
                "_$suffix." .
                $target_file_props['extension'];
            $target_full_filename = $target_file_props['dirname'] . '/' . $target_basename;
        }

        $moving_result = move_uploaded_file($image['tmp_name'], $target_full_filename);
        return $moving_result
            ? array(
                'error' => FALSE,
                'name' => $target_basename,
                'props' => $image_props
            )
            : array( 'error' => TRUE, 'debug' => 'Filesystem error ' );
    }


    function delete_image($name) {
        global $FS_TARGET_DIR;
        $result = unlink($FS_TARGET_DIR . $name);
        return $result
            ? array('result' => TRUE)
            : array( 'error' => TRUE, 'debug' => 'Filesystem error' );
    }
}

namespace model\helpers {
    function is_extension_valid($ext) {
        global $ALLOWED_EXTS;
        return in_array(strtoupper($ext), $ALLOWED_EXTS);
    }
}
?>
