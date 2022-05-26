var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var cors = require('cors')
// load environment variables from .env file
dotenv.config();

// Load Database Connection
require('./db/connections');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


var indexRouter = require('./routes/index');
app.use('/', indexRouter);

module.exports = app;
