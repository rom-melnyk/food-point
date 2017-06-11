<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/image-model.php';


function get_group_header($group) {
    $img = $group['image']
        ? '<img class="image" src="' . model\HTML_TARGET_DIR . $group['image'] . '" />'
        : '';
    $name = $group['name']
        ? '<div class="name">' . $group['name'] . '</div>'
        : '';
    $description = $group['description']
        ? '<div class="description">' . $group['description'] . '</div>'
        : '';

    return '<div class="row group-data">' . $img . $name . $description . '</div>';
}


function get_group_items($group, $should_wrap = TRUE) {
    $html= '';
    foreach ($group['items'] as $item) {
        $html .= array_key_exists('items', $item)
            ? get_group($item)
            : get_dish($item);
    }

    return $should_wrap
        ? ('<div class="group-items">' . $html . '</div>')
        : $html;
}


function get_group($group) {
    return $group['name'] && $group['name'] === '/'
        ? get_group_items($group, FALSE) // workaround the root
        : ('<div class="group">' . get_group_header($group) . get_group_items($group) . '</div>');
}


function get_dish($dish) {
    $img = $dish['image']
        ? '<img class="image" src="' . model\HTML_TARGET_DIR . $dish['image'] . '" />'
        : '';
    $name = $dish['name']
        ? '<div class="name">' . $dish['name'] . '</div>'
        : '';
    $description = $dish['description']
        ? '<div class="description">' . $dish['description'] . '</div>'
        : '';
    $size = $dish['size']
        ? '<div class="size">' . $dish['size'] . '</div>'
        : '';
    $price = $dish['price']
        ? '<div class="price">' . $dish['price'] . '</div>'
        : '';

    return '<div class="row group-data">' . $img . $name . $size . $description . $price . '</div>';
}

?>
