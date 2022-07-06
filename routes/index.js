const express = require('express');
const router = express.Router();

const settings = require('../settings');
const {personalError} = require('../utils/errors')

/* GET home page. */
router.get('/', function(req, res, next) {
  personalError(res);
});

module.exports = router;