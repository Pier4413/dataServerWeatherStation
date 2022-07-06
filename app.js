var express = require('express');
var path = require('path');
var log4js = require('log4js');
var cors = require('cors');

var indexRouter = require('./routes/index');
var weatherRouter = require('./routes/weather');

var app = express();

const {personalError} = require('./utils/errors');
const {checkApiKey} = require('./utils/object');

// view engine setup

const loggerLog4js = log4js.getLogger('http');
app.use(log4js.connectLogger(loggerLog4js, {level: 'auto', format:  ':remote-addr - :method :url :status'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.options('*', cors({
    origin: ["http://localhost:8080"]
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var test = checkApiKey(req.headers['api_key'], req.method).then(res => {
    if(test) {
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
