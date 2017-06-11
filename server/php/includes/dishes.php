<?php

function get_group_header($group) {
    $name = array_key_exists('name', $group)
        ? '<div class="name">' . $group['name'] . '</div>'
        : '';
    $description = array_key_exists('description', $group)
        ? '<div class="description">' . $group['description'] . '</div>'
        : '';
    $img = array_key_exists('image', $group)
        ? '<img class="image" src="' . $group['image'] . '" />'
        : '';

    return '<div class="group-header">' . $img . $name . $description . '</div>';
}

function get_group_items($group) {
    $html= '<div class="group-items">';
    foreach ($group['items'] as $item) {
        $html .= array_key_exists('items', $item)
            ? get_group($item)
            : get_dish($item);
    }
    $html .= '</div>';
    return $html;
}

function get_group($group) {
    $html = '<div class="group">';
    $html .= get_group_header($group);
    $html .= get_group_items($group);
    $html .= '</div>';
}


function get_dish($dish) {
    $name = array_key_exists('name', $group)
        ? '<div class="name">' . $group['name'] . '</div>'
        : '';
    $description = array_key_exists('description', $group)
        ? '<div class="description">' . $group['description'] . '</div>'
        : '';
    $size = array_key_exists('size', $group)
        ? '<div class="size">' . $group['size'] . '</div>'
        : '';
    $price = array_key_exists('price', $group)
        ? '<div class="price">' . $group['price'] . '</div>'
        : '';
    $img = array_key_exists('image', $group)
        ? '<img class="image" src="' . $group['image'] . '" />'
        : '';

    return $img . $name . $size . $description . $price;
}

?>
