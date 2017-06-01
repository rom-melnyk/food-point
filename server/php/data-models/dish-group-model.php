<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/db/db.php';

function get_dish_groups() {
    $query = 'SELECT * FROM dish_groups;';
    $result = db\query($query);
    // make sure the root is always there
    if (!count($result)) {
        create_dish_group(array('name' => '/'));
    }
    return db\query($query);
}


function get_dish_group($id) {
    $query = 'SELECT * FROM dish_groups WHERE id = ' . db\sanitize($id) . ';';
    return db\query($query);
}


function create_dish_group($group) {
    $columns = array();
    $values = array();

    foreach ($group as $column => $value) {
        array_push($columns, db\sanitize($column, FALSE));
        array_push($values, db\sanitize($value));
    }
    $columns = implode(', ', $columns);
    $values = implode(', ', $values);

    $query = 'INSERT INTO dish_groups (' . $columns . ') VALUES (' . $values . ');';
    return db\query($query);
}


function update_dish_group($id, $group) {
    $values = array();

    foreach ($group as $column => $value) {
        array_push($values, db\sanitize($column, FALSE) . '=' . db\sanitize($value));
    }
    $values = implode(', ', $values);

    $query = 'UPDATE dish_groups SET ' . $values . ' WHERE id = ' . db\sanitize($id) . ';';
    return db\query($query);
}


function delete_dish_group($id) {
    $query = 'DELETE FROM dish_groups WHERE id = ' . db\sanitize($id) . ';';
    return db\query($query);
}

?>
