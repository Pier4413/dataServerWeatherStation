# Server part of the Weather station

This is the server part of the weather station for data storage and management

See also : 
 - TODO
 - TODO

## Create the log4jsConfig.json file

You need to create a log4jsConfig.json file with at least the minimal data in it :
```
  {
    "appenders": {
      "console": {
        "type": "console"
      }
    },
    "categories": {
      "default": {
        "appenders": ["console"], "level": "off"
      },
      "database": {
        "appenders": ["console"], "level": "warn"
      },
      "errorHandler": {
        "appenders": ["console"], "level": "error"
      },
      "logLog": {
        "appenders": ["console"], "level": "info"
      },
      "www": {
        "appenders": ["console"], "level": "debug"
      },
      "http": {
        "appenders": ["console"], "level": "info"
      }
    }
  }
```

## Settings file

You need to create a settings.js file with at least the minimal data in it :

You can parameter the host, port, user, password and dbName
```
const database = {
    host: "127.0.0.1",
    port: 27017,
    dbName: "weather",
    user: "",
    pwd: ""
}

module.exports = {database: database};
```
