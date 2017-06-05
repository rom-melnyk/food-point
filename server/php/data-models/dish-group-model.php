<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/db/db.php';

// ------------------------------- helpers -------------------------------
function items_to_array($group) {
    $items = $group['items'] ? explode(',', $group['items']) : array();
    $group['items'] = array_map(function ($val) { return is_numeric($val) ? (int) $val : $val; }, $items);
    return $group;
}
// -----------------------------------------------------------------------


function get_dish_groups() {
    $query = 'SELECT * FROM dish_groups;';
    $result = db\query($query);
    // make sure the root is always there
    // not very pure but app-safe
    if (!count($result)) {
        create_dish_group(array('name' => '/'));
        $result = db\query($query);
    }

    return array_key_exists('error', $result)
        ? $result
        : array_map('items_to_array', $result);
}


function get_dish_group($id) {
    $query = 'SELECT * FROM dish_groups WHERE id = ' . db\sanitize($id) . ';';
    $result = db\query($query);

    return array_key_exists('error', $result) || !count($result)
        ? $result
        : items_to_array($result[0]);
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
        if ($column === 'items' && is_array($value)) {
            $value = implode(',', $value);
        }
        array_push($values, db\sanitize($column, FALSE) . '=' . db\sanitize($value));
    }
    $values = implode(', ', $values);

    $query = 'UPDATE dish_groups SET ' . $values . ' WHERE id = ' . db\sanitize($id) . ';';
    return db\query($query);
}


function delete_dish_group($id) {
    // TODO move dishes and groups to parent before deleting
    $query = 'DELETE FROM dish_groups WHERE id = ' . db\sanitize($id) . ';';
    return db\query($query);
}

?>
