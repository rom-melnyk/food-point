<?php
namespace session {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/php/creds.php';

    const SESSION_COOKIE = 'admin-session';
    const SESSION_DURATION = 7; //days


    /**
     * Expects cookie to be ${hash} . ${date} . ${user_id}
     * where ${hash} = md5($date . $user_id . <salt>).
     * Checks if ${hash} matches ${date} and ${used_id}.
     */
    function is_cookie_valid() {
        $cookie = array_key_exists(SESSION_COOKIE, $_COOKIE) ? $_COOKIE[SESSION_COOKIE] : FALSE;
        if (!$cookie) {
            return FALSE;
        }

        $hash = substr($cookie, 0, 32); // md5 length
        $date_txt = substr($cookie, 32, 16); // UNIX timestamp length for nearest couple of decades
        $user_id = substr($cookie, 32 + 16);
        $date = FALSE;

        try {
            $date = \DateTime::createFromFormat('U', $date_txt); // UNIX timestamp
        } catch (\Exception $e) {}

        if (!$date) {
            return FALSE;
        }

        $diff = $date->diff(new \DateTime());
        if (!$diff || $diff->days < 0 || $diff->days > SESSION_DURATION) {
            return FALSE;
        }

        return helpers\generate_cookie_hash($date_txt, $user_id) === $hash;
    }


    function set_session_cookie($user_id = '') {
        $date = \time();
        $cookie_exp_time = $date + SESSION_DURATION * 24 * 60 * 60;
        $cookie_value = helpers\generate_cookie_hash($date, $user_id) . $date . $user_id;
        setcookie(SESSION_COOKIE, $cookie_value, $cookie_exp_time, '/admin');
    }


    function is_username_and_password_valid($username, $psw) {
        return $username = ADMIN_CREDS['username'] && $psw === ADMIN_CREDS['password']; // TODO rework this
    }
};


namespace session\helpers {

    function generate_cookie_hash($date, $user_id = '') {
        return md5($date . $user_id . SESSION_SALT);
    }

    function generate_password_hash($psw, $user_id = '') {
        return md5($psw . $user_id . SESSION_SALT);
    }

};
?>
