# Server part of the Weather station

This is the server part of the weather station for data storage and management

See also : 
 - [Embedded (Python)](https://github.com/Pier4413/embeddedPythonWeatherStation.git)
 - [Web Interface (Vue.js)](https://github.com/Pier4413/webInterfaceWeatherStation.git)

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

const retentionTime = 4

module.exports = {database: database, retentionTime: retentionTime};
```

The retention time correspond to the time we want to keep data (to not create a too big database). You can pass 0 or a negative value to never clean the data. The time is in hours
