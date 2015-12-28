# Installation
1. Install NodeJS, MySQL.
1. Make sure the `./config.json` exists. See the structure below.
1. `npm i`
1. `npm run` to check options
1. `npm run dev` to start the development

# the default `./config.json`
```json
{
  "port": 8080,

  "mysql": {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "food_point"
  },

  "authDuration": "1d"
}
```
