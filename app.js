var express = require('express');
var path = require('path');
var log4js = require('log4js');
var cors = require('cors');

var indexRouter = require('./routes/index');
var weatherRouter = require('./routes/weather');
var apiRouter = require('./routes/api')

var app = express();

const {personalError} = require('./utils/errors');
const {checkAccess} = require('./utils/object');
const { crossOrigins } = require('./settings');

// view engine setup

const loggerLog4js = log4js.getLogger('http');
app.use(log4js.connectLogger(loggerLog4js, {level: 'auto', format:  ':remote-addr - :method :url :status'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.options('*', cors({
    origin: crossOrigins
  })
);

app.use('/api', apiRouter)

app.use((req, res, next) => {
  checkAccess(res, req.headers['api_key'], req.method, req.headers.origin).then(result => {
    if(result == 0) {
      next();
    } else {
      personalError(res, null, "NOT AUTHORIZED API KEY DOESN'T MATCH", 401);
    }
  }).catch(err => {
    personalError(res, null, err, 403);
  })
});

app.use('/', indexRouter);
app.use('/weather', weatherRouter)

app.use(function(req, res, next) {
  personalError(res, null, "Generic not found", 404);
});

// error handler
app.use(function(err, req, res, next) {
  personalError(res, err, "Unknown error", 500);
});

module.exports = app;
