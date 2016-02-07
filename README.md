# Installation
1. Install NodeJS, MySQL
1. Create your `./config.json`. See the structure below
1. Create your `./api/token.es6`. See the structure below
1. `npm install`
1. `npm run` to check options
1. `npm run dev` to start the development

# Deploy new version to Production
1. Make sure to `set NODE_ENV=production`
1. Stop the server
  - if it's installed as service, do `systemctl stop node-server` (the process name may vary),
  - otherwise press `Ctrl-C`
1. Check out new version from appropriate tag: `git checkout -b v### v###`
1. Clean libraries: `git clean -df && npm cache clean`
1. Compile static resources: `npm run compile-js && npm run compile-css`
1. Apply MySQL if necessary: `mysql -uXXX -pYYY < sql/v###.sql` (replace "XXX" and "YYY" with appropriate values)
1. If no errors happened, start the server again
  - if it's installed as service, do `systemctl start node-server` (the process name may vary),
  - otherwise run `node --harmony server.es6`

---

# The default `./config.json`
This file contains the server config. It's very private and sensitive so I don't share it. Create it by yourself.

```json
{
  "port": 8080,

  "mysql": {
    "comment": "----- Place MySQL auth params here -----",
    "host": "localhost",
    "user": "mysql_username",
    "password": "mysql_password",
    "database": "food_point"
  },

  "session": {
    "secret": "Place your text here",
    "comment": "----- duration is <number><s|m|h|d|w>, means number of seconds/.../days/weeks -----",
    "duration": "1d"
  },

  "facebook": {
    "api-id": 1234567890,
    "comment": "----- must be Number, not String! -----"
  }
}
```

# The `api/token.es6`
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
