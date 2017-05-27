<?php
namespace db;

require_once $_SERVER['DOCUMENT_ROOT'] . '/php/db/config.php';

$mysqli = new \mysqli(DB_CONFIG['host'], DB_CONFIG['user'], DB_CONFIG['password'], DB_CONFIG['database']);


function query($query = '') {
    global $mysqli;

    if ($mysqli->connect_errno) {
        return array(
            'error' => $mysqli->connect_error,
            'type' => 'MySQL connection',
            'no' => $mysqli->connect_errno
        );
    }

    $result = $mysqli->query($query);
    if(!$result) {
        return array(
            'error' => $mysqli->error,
            'type' => 'MySQL query',
            'no' => $mysqli->errno
        );
    }

    if ($result === TRUE || $result === FALSE || $result === NULL) {
        return array('error' => FALSE, 'result' => $result);
    }

    $result_array = array();
    while ($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
    return $result_array;
}


function sanitize($value, $wrap_in_quotes = TRUE) {
    global $mysqli;
    if (is_numeric($value)) {
        return $value;
    } else {
        $value = $mysqli->escape_string($value);
        if ($wrap_in_quotes) {
            $value = "'$value'";
        }
        return $value;
    }
}


?>