# foodpoint.if.ua v02 (PHP)
This version is made for basic PHP/Apache-powered server.


# Development


## Server setup
1. `sudo apt-get install apache2 php7.0 php7.0-mysql php7.0-curl php7.0-json php7.0-cgi php7.0-mbstring libapache2-mod-php7.0`
1. Remap `foodpoint.if.ua` to `127.0.0.1` in `/etc/hosts`.
1. Go to the project directory.
1. Create the symlink from `apache2.conf` to the config file responsible for the project in Apache config directory (mind the correct path to the project dir):  
   `cd /etc/apache2/sites-available && sudo ln -s /home/rom/Prj/foodpoint.if.ua/apache2.conf foodpoint.if.ua.conf && cd -`
1. Adjust directories in `apache2.conf` by running `cat apache2.conf | sed "s:/home.*\.if\.ua:$(pwd):g" > apache2.conf`
1. Restart the Apache2: `sudo systemctl restart apache2.service`


## MySQL
Create `server/db/config.php`:
```
<?php
const DB_CONFIG = array(
    'host' => '...',
    'user' => '...',
    'password' => '...',
    'database' => '...'
);
?>
```


## Facebook essentials
Facebook API v5 requires PHP v5.4+.

**TBD!**
Create `develop/php/fb-app-credentials.php`:
```
<?php
$FB_APP_CREDENTIALS = [
    'app_id' => '...',
    'app_secret' => '...',
    'default_graph_version' => 'v2.8'
];
?>
```

## Develop and deploy
1. `npm run dev`: compiles all the client assets, copies them to **`server/`** folder.
1. `npm run prod`: behaves similar but generates minified files (prod-friendly).
1. Upload the content of **`server/`** to the server via FTP.
  - Make sure that folder is writable and `gfx/uploaded/` is writable too.
  - Remove `.gitignore` from the server :)
  - Update `sitemap.xml` and `robots.txt` if needed.
  - Update Google site verification file.
1. Make sure there are following modules installed on server:
  - `mbstring` (required for Facebook);
  - `mod_rewrite` (required for `.htaccess`).


## Some tricks:
- `tail -f logs/error.log` to track the Apache/PHP errors.
- `echo '<?php phpinfo(); ?>' | php | grep <...>` to theck if an option if enabled in PHP config (works locally and via SSH).



# Architecture
**TBD!**

---


# Credits
Roman Melnyk <email.rom.melnyk@gmail.com>

