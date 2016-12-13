# Installation
1. Install NodeJS, MySQL.
1. Create your `./server/config.json`. See the structure below.
1. Create your `./server/express-api/token.es`. See the structure below.
1. `npm install`.
1. `npm run` to check options.

# Development
1. Make sure the MySQL service is up and running.
1. Run `npm run dev-server` in one terminal. That runs the server.
1. Run `npm run dev-client` in another terminal. that runs Webpack in watch mode.

# File structure and Data flow
- `./client/` contains client-related source files;
  - `./client/_compiled/` is the destination for Webpack compiler (JS and CSS files are moved to proper directory afterwards).
- `./server/` contains server-related stuff.
- `./static/` contains all the static files that are passed to HTML (compiled JS and CSS, images, `favicon.ico`, etc).

# Deploy new version to Production
1. Make sure to `set NODE_ENV=production`
1. Make sure the folder from `config.json # uploadDir` is writable.
1. Stop the server
  - if it's installed as service, do `systemctl stop node-server` (the process name may vary),
  - otherwise press `Ctrl-C`
1. Check out new version from appropriate tag: `git checkout -b v### v###`
1. Clean libraries nd reinstall dependencies: `git clean -df && npm cache clean && npm install`
1. Compile static resources: `npm run prod`
1. Apply MySQL if necessary: `mysql -uXXX -pYYY < sql/v###.sql` (replace "XXX" and "YYY" with appropriate values)
1. If no errors happened, start the server again
  - if it's installed as service, do `systemctl start node-server` (the process name may vary),
  - otherwise run `node --harmony server.es6`
1. Don't forget to change `isProduction` field in `config.json`

---

# The default `./server/config.json`
This file contains the server config. It's very private and sensitive so I don't share it. Create it by yourself.

```json
{
  "port": 8080,

  "mysql": {
    "mysql---comment": "----- Place MySQL auth params here -----",
    "host": "localhost",
    "user": "mysql_username",
    "password": "mysql_password",
    "database": "food_point"
  },

  "uploadDir---comment": "----- The path is relative to project directory -----",
  "uploadDir": "static/img/uploaded",

  "session": {
    "secret": "Place your text here",
    "comment": "----- duration is <number><s|m|h|d|w>, means number of seconds/.../days/weeks -----",
    "duration": "1d"
  },

  "facebook": {
    "api-id": 1234567890,
    "locale": "en_US"
  }
}
```

# The `./server/express-api/token.es`
For the security reason I don't share the mechanism of generating the token string _(SESSION cookie)._ So you have to implement it by yourself according to following interface.
You can use, for example, `md5(userId + timestamp + secret) + userId`; that provides the mechanism of transferring the `userId`, verifying it and invalidating the cookie value if it's _(?)_ spoiled.
Feel free to implement it on your own.

```js
module.exports = {
    /**
     * @param {String} userId
     * @param {*} [...params]           other optional params to generate tokens from (e.g., `timestamp`)
     */
    generate (userId) {/*...*/},

    /**
     * @param {String} token
     * @return {{hash: String|null, userId: String|null, ...}}      other key-value pairs are welcome
     */
    parse (token) {/*...*/},

    /**
     * @param {Object} parsed           same what {@link #parse} returns
     * @return {Boolean}
     */
    verify (parsed) {/*...*/}
};
```
