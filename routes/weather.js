var express = require('express');
var router = express.Router();

const { personalError } = require('../utils/errors');

const Weather = require('../database/weather');
const Miscellaneous = require('../database/miscellaneous');
const Wind = require('../database/wind')
const Position = require('../database/position')
const Temperature = require('../database/temperature')

const logger = require('../log4js').log4js.getLogger('weather');

router.post('/', function (req, res) {
    Wind.create(
        req.body.wind
    ).then(resWind => {
        Temperature.create(
            req.body.temperature
        ).then(resTemperature => {
            Position.create(
                req.body.position
            ).then(resPosition => {
                Miscellaneous.create(
                    req.body.misc
                ).then(resMisc => {
                    Weather.create({
                        "misc": resMisc._id,
                        "temperature": resTemperature._id,
                        "wind": resWind._id,
                        "position": resPosition._id
                    }).then(resWeather => {
                        res.json(resWeather)
                    })
                })
            })
        })
    }).catch(err => {
        personalError(res, err, null, 400);
    })
})

router.delete('/', (req, res) => {
    logger.info("TEST")
    Weather.deleteOne({
        "_id": req.body.weather_id
    }).then(() => {
        Wind.deleteOne({
            "_id": req.body.wind_id
        }).then(() => {
            Position.deleteOne({
                "_id": req.body.position_id
            }).then(() => {
                Temperature.deleteOne({
                    "_id": req.body.temperature_id
                }).then(() => {
                    Miscellaneous.deleteOne({
                        "_id": req.body.misc_id
                    }).then(() => {
                        res.status(200).send()
                    })
                })
            })
        })
    }).catch(err => {
        personalError(res, err, null, 400);
    })
})

router.get('/last_hour', (req, res) => {
    Weather.find({ updatedAt: { $gte: new Date(Date.now() - 60*60 * 1000) } })
        .populate('misc')
        .populate('temperature')
        .populate('position')
        .populate('wind')
        .then(resWeather => {
            res.json(resWeather)
        })
})

router.get('/history', (req, res) => {
    Weather.find()
        .populate('misc')
        .populate('temperature')
        .populate('position')
        .populate('wind')
        .then(resWeather => {
            res.json(resWeather)
        })
})

router.get('/latest', (req, res) => {
    Weather.find()
        .sort({ createdAt: -1 })
        .limit(1)
        .populate('misc')
        .populate('temperature')
        .populate('position')
        .populate('wind')
        .then(resWeather => {
            if (resWeather.length > 0) {
                res.json(resWeather[0])
            } else {
                res.json({})
            }
        })
})
module.exports = router;