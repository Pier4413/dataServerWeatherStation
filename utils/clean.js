const Weather = require('../database/weather');
const Miscellaneous = require('../database/miscellaneous');
const Wind = require('../database/wind')
const Position = require('../database/position')
const Temperature = require('../database/temperature');

const logger = require('../log4js').log4js.getLogger('app');

function cleanData(retentionTime = 4) {
    Weather.deleteMany({
      updatedAt: { $lt: new Date(Date.now() - retentionTime * 60 * 60 * 1000) }
    }).then(() => {
        Wind.deleteMany({
          updatedAt: { $lt: new Date(Date.now() - retentionTime * 60 * 60 * 1000) }
        }).then(() => {
            Position.deleteMany({
              updatedAt: { $lt: new Date(Date.now() - retentionTime * 60 * 60 * 1000) }
            }).then(() => {
                Temperature.deleteMany({
                  updatedAt: { $lt: new Date(Date.now() - retentionTime * 60 * 60 * 1000) }
                }).then(() => {
                    Miscellaneous.deleteMany({
                      updatedAt: { $lt: new Date(Date.now() - retentionTime * 60 * 60 * 1000) }
                    }).then(() => {
                        logger.info("Cleaning function end")
                    })
                })
            })
        })
    }).catch(err => {
      logger.error(`Cleaning function failed ${err}`)
    })
}

function deleteData(data) {
  return new Promise((resolve, reject) => {
    Weather.deleteOne({
      "_id": data.weather
    }).then(() => {
        Wind.deleteOne({
            "_id": data.wind
        }).then(() => {
            Position.deleteOne({
                "_id": data.position
            }).then(() => {
                Temperature.deleteOne({
                    "_id": data.temperature
                }).then(() => {
                    Miscellaneous.deleteOne({
                        "_id": data.misc
                    }).then(() => {
                        resolve()
                    })
                })
            })
        })
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = { deleteData, cleanData }