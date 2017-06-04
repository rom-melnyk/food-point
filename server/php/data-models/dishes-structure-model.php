<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/db/db.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/dish-model.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/dish-group-model.php';

function get_dishes_structure() {
    $query = 'SELECT * FROM dishes;';
    $dishes = db\query($query);
    $groups = get_dish_groups();

    return build_dishes_structure($dishes, $groups);
}


// ------------------------ helpers ------------------------
function build_dishes_structure($dishes, $groups) {
    function get_child($id, $dishes, $groups) {
        if (is_numeric($id)) { // dish
            $filtered = array_filter($dishes, function ($dish) use ($id) { return $dish['id'] === $id; });
            return count($filtered) ? array_values($filtered)[0] : NULL;
        }

        // group
        $id = (int) substr($id, 1);
        $filtered = array_filter($groups, function ($group) use ($id) { return $group['id'] === $id; });
        $group = count($filtered) ? array_values($filtered)[0] : NULL;

        if (is_array($group)) {
            $items = array_map(
                function ($id) use ($dishes, $groups) {
                    return get_child($id, $dishes, $groups);
                },
                $group['items']
            );
            $group['items'] = array_filter($items, function ($ch) { return is_array($ch); });
        }

        return $group;
    };

    $filtered = array_filter($groups, function ($group) { return $group['name'] === '/'; });
    $root = count($filtered) ? array_values($filtered)[0] : NULL;

    return is_array($root)
        ? get_child('g' . $root['id'], $dishes, $groups) // traverse root as regular group
        : array('error' => TRUE, 'debug' => 'Root group (/) not found');
}

?>
