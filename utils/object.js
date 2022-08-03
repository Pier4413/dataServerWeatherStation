const ApiKey = require('../database/apiKey');

const { crossOrigins } = require('../settings');

const logger = require('../log4js').log4js.getLogger('weather');

function checkAccess(res, key, method, origin) {


    return new Promise((resolve, reject) => {
    ApiKey.find()
        .then(testers => {
            
            let test = 1;

            logger.debug(origin)
            if(!crossOrigins.includes(origin) && origin != undefined) {
                test = 2;
                reject("The origin is not allowed");
            } else {
                if(testers.length == 0) {
                    test = 4;
                    reject("There is no keys on this server");
                }
                for(let i in testers) {
                    if(testers[i].key == key) {
                        if(testers[i].methods.includes(method)) {
                            test = 0;
                        } else {
                            test = 3;
                        }
                        break;
                    }
                }

                if(test == 1) {
                    reject(`The key ${key} is not allowed`)
                }

                if(test == 3) {
                    reject(`The method ${method} is not allowed for the key ${key}`) 
                }
                
                res.header("Access-Control-Allow-Origin", origin);
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                resolve(test);
            }
        }).catch(err => {
            reject("Probleme with keys database : "+err);
        })
    })    
}
module.exports = {
    checkAccess
}