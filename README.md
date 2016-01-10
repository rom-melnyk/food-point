# Installation
1. Install NodeJS, MySQL.
1. Create your `./config.json`. See the structure below.
1. Create your `./api/token.es6`. See the structure below.
1. `npm i`
1. `npm run` to check options
1. `npm run dev` to start the development
1. Make sure to `set NODE_ENV=PROD` for production

# The default `./config.json`
This file contains the server config. It's very private and sensitive so I don't share it. Create it by yourself.

```json
{
  "port": 8080,

  "mysql": {
    "comment": "----- Place MySQL auth params here -----",
    "host": "localhost",
    "user": "mysql_username",
    "password": ""mysql_password,
    "database": "food_point"
  },

  "session": {
    "secret": "Place your text here",
    "comment": "----- duration is <number><s|m|h|d|w>, means number of seconds/.../days/weeks -----",
    "duration": "1d"
  }
}
```

# The `api/token.es6`
For the security reason I don't share the mechanism of generating the token string _(SESSION cookie)._
So you have to implement it by yourself according to following interface.

```js
module.exports = {
    /**
     * @param {String} userId
     */
    generate (userId) {/*...*/},

    /**
     * @param {String} token
     * @return {{userId: String|null, hash: String|null}}
     */
    parse (token) {/*...*/},

    /**
     * @param {Object} parsed
     * @return {Boolean}
     */
    verify (parsed) {/*...*/}
};
```
