<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/db/db.php';

function get_dishes() {
    $query = 'SELECT * FROM dishes;';
    return db\query($query);
}


function get_dish($id) {
    $query = 'SELECT * FROM dishes WHERE id = ' . db\sanitize($id) . ';';
    return db\query($query);
}


function create_dish($dish) {
    $columns = array();
    $values = array();

    foreach ($dish as $column => $value) {
        array_push($columns, db\sanitize($column, FALSE));
        array_push($values, db\sanitize($value));
    }
    $columns = implode(', ', $columns);
    $values = implode(', ', $values);

    $query = 'INSERT INTO dishes (' . $columns . ') VALUES (' . $values . ');';
    return db\query($query);
}


function update_dish($id, $dish) {
    $values = array();

    foreach ($dish as $column => $value) {
        array_push($values, db\sanitize($column, FALSE) . '=' . db\sanitize($value));
    }
    $values = implode(', ', $values);

    $query = 'UPDATE dishes SET ' . $values . ' WHERE id = ' . db\sanitize($id) . ';';
    return db\query($query);
}


function delete_dish($id) {
    $query = 'DELETE FROM dishes WHERE id = ' . db\sanitize($id) . ';';
    return db\query($query);
}

?>
