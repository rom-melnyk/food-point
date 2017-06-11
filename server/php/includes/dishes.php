<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/data-models/image-model.php';


function get_group_header($group) {
    if ($group['name'] === '/') {
        return '';
    }

    $img = '';
    if ($group['image']) {
        if ($group['name'] || $group['description']) {
            $img = '<div class="column-2">'
                . '<div class="image-wrapper">'
                . '<span class="image" style="background-image: url(\''
                    . model\HTML_TARGET_DIR . $group['image']
                    . '\');"></span>'
                . '</div>'
                . '</div>';
        } else {
            $img = '<div class="column-12">'
                . '<img class="image" src="' . model\HTML_TARGET_DIR . $group['image'] . '" />'
                . '</div>';
        }
    }

    $text_cell_classname = $group['image'] ? 'column-10 all-text' : 'column-12';
    $name = $group['name']
        ? '<div class="name">' . $group['name'] . '</div>'
        : '';
    $description = $group['description']
        ? '<div class="description">' . $group['description'] . '</div>'
        : '';
    $all_text = $name || $description
        ? (
            '<div class="' . $text_cell_classname . '">'
            . $name . $description
            . '</div>'
        )
        : '';

    return '<div class="row group-data">'
        . $img
        . $all_text
        . '</div>';
}


function get_group_items($group) {
    $html= '';
    foreach ($group['items'] as $item) {
        $html .= array_key_exists('items', $item)
            ? get_group($item)
            : get_dish($item);
    }

    return '<div class="group-items">' . $html . '</div>';
}


function get_group($group) {
    return '<div class="group">'
        . get_group_header($group)
        . get_group_items($group)
        . '</div>';
}


function get_dish($dish) {
    $img = $dish['image']
        ? (
            '<div class="column-2">'
            . '<div class="image-wrapper">'
            . '<span class="image" style="background-image: url(\''
                . model\HTML_TARGET_DIR . $dish['image']
                . '\')"></span>'
            . '</div>'
            . '</div>'
        )
        : '';


    $name = $dish['name']
        ? '<span class="name">' . $dish['name'] . '</span>'
        : '';
    $size = $dish['size']
        ? '<span class="size">' . $dish['size'] . '</span>'
        : '';
    $description = $dish['description']
        ? '<div class="description">' . $dish['description'] . '</div>'
        : '';
    $all_text = '<div class="column-' . ($dish['image'] ? 8 : 10) . ' all-text">'
        . $name . $size
        . $description
        . '</div>';

    $price = $dish['price']
        ? (
            '<div class="column-2">'
            . '<div class="price">' . $dish['price'] . '</div>'
            . '</div>'
        )
        : '';

    return '<div class="row dish">'
        . $img
        . $all_text
        . $price
        . '</div>';
}

?>
