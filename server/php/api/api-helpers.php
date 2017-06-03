<?php

function generate_api_error($info) {
    return array(
        'error' => TRUE,
        'debug' => $info
    );
}

function send_api_output($result) {
    $is_error = FALSE;

    if (!is_array($result) && !$result) {
        $result = generate_api_error('Method not implemented');
        $is_error = TRUE;
    } else if (array_key_exists('error', $result) && $result['error'] && !array_key_exists('debug', $result)) {
        $result = generate_api_error($result);
        $is_error = TRUE;
    }

    if ($is_error) {
        header("HTTP/1.0 500 Internal Server Error");
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}

?>
