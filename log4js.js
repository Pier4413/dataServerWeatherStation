const log4js = require('log4js');
const pathLogConfig = "./server/log4jsConfig.json";

/*This is configuring log4js
* If you wanna add an appender or a logger please see the wiki on the gitlab server
*/
log4js.configure(pathLogConfig);
let logger = log4js.getLogger('logLog');

function logWatcher()
{
    logger.info('--- MODIFICATION DETECTED IN LOG CONFIG FILE. RELOADING PLEASE WAIT ---');
    log4js.shutdown(function()
    {
        log4js.configure(pathLogConfig);
        logger.info('--- RELOADING FINISH ---');
    })
}

module.exports = {log4js: log4js, pathLogConfig: pathLogConfig, logWatcher: logWatcher};