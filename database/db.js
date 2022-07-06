const mongoose = require('mongoose');
const database = require('../settings.js').database
const {host,port,dbName,user,pwd} = database;

const logger = require('../log4js').log4js.getLogger("database");

const databaseOpen = function()
{
    const connectString = "mongodb://"+host+":"+port+"/"+dbName;
    if(user&&pwd)
    {
        connectString = "mongodb://"+user+":"+pwd+"@"+host+":"+port+"/"+dbName;
    }

    const db = mongoose.connect(connectString, { useNewUrlParser: true });
    logger.info("Mongo base connected : "+connectString);
    return db;
}

const databaseClose = function(callback)
{
	mongoose.connection.close(callback);
}

//Connected
mongoose.connection.on('connected', function () {  
    logger.info('Mongoose default connection open');
}); 
  
// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  logger.info('Mongoose default connection error: ' + err);
}); 
  
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  logger.info('Mongoose default connection disconnected'); 
});

module.exports = {
	databaseOpen,
	databaseClose
};
