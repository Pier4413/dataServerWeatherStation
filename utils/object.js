const ApiKey = require('../database/apiKey');

const { crossOrigins } = require('../settings');

function checkAccess(res, key, method, origin) {


    return new Promise((resolve, reject) => {
    ApiKey.find()
        .then(testers => {
            let test = false;
            for(let i in testers) {
                if(testers[i].key == key && testers[i].methods.includes(method)) {
                    res.header("Access-Control-Allow-Origin", origin);
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    test = true;
                    break;
                }
            }
            resolve(test);
        }).catch(err => {
            reject("Probleme with keys database : "+err);
        })
    })    
}
module.exports = {
    checkAccess
}