const logger = require('../log4js').log4js.getLogger('errorHandler');

const personalError = function(res,err=null,message=null,status=418)
{
    logger.error(`Error ${status} : ${message}`);
    if(message||err)
    {
        res.status(status).json({status: status, err: err, message: message});
    }
    else
    {
        res.status(status).json({status: status});
    }
}

module.exports= {
    personalError
};