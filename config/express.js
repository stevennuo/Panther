var express = require('express');
var logger = require('express-log');
var bodyParser = require('body-parser');
var config = require('config');

module.exports = function (app, passport) {
    //logger
    app.use(logger());

    // bodyParser should be above methodOverride
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
};
