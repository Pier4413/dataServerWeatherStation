var express = require('express');
var router = express.Router();

const ApiKey = require('../database/apiKey')
const { personalError } = require('../utils/errors')
const { adminPassword } = require('../settings')

router.post('/', function (req, res) {
    if(req.body.password == adminPassword) {
      ApiKey.create({
        key: req.body.key,
        methods: req.body.methods
      }).then(result => {
        res.json(result)
      }).catch(err => {
        console.log(err)
        personalError(res, err, "CAN'T CREATE API KEY", 400)
      })
    } else {
      personalError(res, null, "BAD PASSWORD", 403)
    }
})

module.exports = router