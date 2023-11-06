var createError = require('http-errors');
var express = require('express');
var apth = require('path');
var logger = require('morgan');
const exp = require('constants');
const path = require('path');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(express.static(path.json(__dirname, 'public')));

module.exports = app;