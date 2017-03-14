<?php
$FILE_PATH = $_SERVER['DOCUMENT_ROOT'] . '/dishes/dishes.xml';

/**
 * @return SimpleXMLElement|false
 */
function get_page_as_xml($page) {
    if (!file_exists($GLOBALS['FILE_PATH'])) {
        return false;
    }
    $ret = simplexml_load_file($GLOBALS['FILE_PATH']);
    return $ret;
}

/**
 * @return String
 */
function get_page_value($xml, $key) {
    if (array_key_exists($key, $xml)) {
        return (string) $xml->$key;
    } else {
        return '';
    }
}

/**
 * @return String|Array         depending on `mode` value
 */
function serialize_page($xml, $mode = 'json') {
    if ($xml !== false) {
        $arr = array(
            'title' => get_page_value($xml, 'title'),
            'icon' => get_page_value($xml, 'icon'),
            'description' => get_page_value($xml, 'description'),
            'body' => get_page_value($xml, 'body'),
            'action' => get_page_value($xml, 'action'),
            'link' => get_page_value($xml, 'link'),
            'script' => get_page_value($xml, 'script')
        );
    } else {
        $arr = array();
    }

    if ($mode !== 'arr' && $mode !== 'array') {
        return json_encode($arr);
    } else {
        return $arr;
    }
}
?>
