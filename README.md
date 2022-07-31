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
    host: <ip of the database>,
    port: <port of the database>,
    dbName: <db name>,
    user: <user if any. Optional>,
    pwd: <password of the use if any. Optional>
}

const retentionTime = <The retention time for data in hours>

const crossOrigins = [<values of cross origins in the form of strings>]

const adminPassword = <The admin password we want to set>

const log4jsConfigPath = <path of the log4js config file in a json format>

const https = {
  key: <path of the private key>,
  cert: <path of the public cert>
};

module.exports = {database: database, retentionTime: retentionTime, crossOrigins: crossOrigins, adminPassword: adminPassword, log4jsConfigPath: log4jsConfigPath, https: https};
```

The retention time correspond to the time we want to keep data (to not create a too big database). You can pass 0 or a negative value to never clean the data. The time is in hours

Please not that the https option is optional and if none is provided the server will launch in http mode