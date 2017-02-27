# foodpoint.if.ua v03
This version is made for basic PHP/Apache-powered server.

# Development
1. `sudo apt-get install apache2 php7.0 php7.0-mysql php7.0-curl php7.0-json php7.0-cgi libapache2-mod-php7.0`
1. Remap `foodpoint.if.ua` to `127.0.0.1` in `/etc/hosts`.
1. Go to the project directory.
1. Create the symlink from `apache2.conf` to the config file responsible for the project in Apache config directory (mind the correct path to the project dir):  
   `cd /etc/apache2/sites-available && sudo ln -s /home/rom/Prj/foodpoint.if.ua/apache2.conf foodpoint.if.ua.conf && cd -`
1. Adjust directories in `apache2.conf` by running `cat apache2.conf | sed "s:/home.*\.if\.ua:$(pwd):g" > apache2.conf`
1. Restart the Apache2: `sudo systemctl restart apache2.service`

## Some tricks:
- `tail -f logs/error.log` to track the Apache/PHP errors.
- `rm -fr ___upload-me*` to clean-up latest compiled versions.
 

## Directories and files
- **`src/`** contains JS and CSS dev files. should not be upoaded to the server!
- **`___upload-me___`** will contain everything you need to upload to the server.
- **`index.php`**
- **`.htaccess`**
- PHP scripts.
- all the XML or JSON files.
- static content like images.

After making appropriate updates, run `./compile.sh` and upload the content of the `_upload-me_/` to the server via FTP.


## JS and CSS development
TBD


---

# Credits
Roman Melnyk <email.rom.melnyk@gmail.com>

