var express = require('express');
var router = express.Router();

const { personalError } = require('../utils/errors');
const { deleteData } = require('../utils/clean')

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
    deleteData(req.body)
        .then(() => {
            res.status(200).send()
        })
        .catch(err => {
            personalError(res, err, `CAN'T DELETE DATA ID ${req.body._id}`, 400)
        })
})

router.get('/', (req, res) => {
    let duration = 60*60*1000
    if(req.query.duration) {
        duration = req.query.duration * 1000
    }
    Weather.find({ updatedAt: { $gte: new Date(Date.now() - duration) } })
        .populate('misc')
        .populate('temperature')
        .populate('position')
        .populate('wind')
        .then(resWeather => {
            res.json(resWeather)
        })
        .catch(err => {
            personalError(res, err, "ERROR IN WEATHER QUERY", 400)
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
        .catch(err => {
            personalError(res, err, "ERROR IN WEATHER QUERY LAST HOUR", 400)
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
        .catch(err => {
            personalError(res, err, "ERROR IN WEATHER QUERY HISTORY", 400)
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
        .catch(err => {
            personalError(res, err, "ERROR IN WEATHER QUERY LATEST", 400)
        })
})
module.exports = router;