const ApiKey = require('../database/apiKey');

function checkApiKey(key, method) {

    return new Promise((resolve, reject) => {
        
    ApiKey.find()
        .then(testers => {
            let test = false;
            for(let i in testers) {
                if(testers[i].key == key && testers[i].methods.includes(method)) {
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
    checkApiKey
}