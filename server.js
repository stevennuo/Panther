'use strict';

var fs = require('fs');
var config = require('config');
var express = require('express');
var mongoose = require('mongoose');

var app = express();

/**
 * Connect to database.
 */
// Connect to mongodb
mongoose.connect(config.db, {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    },
    replSet: config.replSet
});

process.on('SIGINT', function () {
    console.warn('Express exit');
    if (mongoose.connection.readyState === 1) {
        mongoose.connection.close();
    } else {
        process.exit(0);
    }
});

mongoose.connection.on('connecting', function () {
    console.info('Connecting database to ' + config.db);
});
mongoose.connection.on('error', function (err) {
    console.error(err);
    console.info('Exit process');
    process.exit(1);
});
mongoose.connection.on('disconnected', function () {
    console.error('Database disconnected');
    console.info('Exit process');
    process.exit(1);
});
mongoose.connection.on('connected', function () {
    console.info('Database connected to ' + config.db);

// Bootstrap models
    fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
        if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
    });

// Bootstrap application settings
    require('./config/express')(app);

// Bootstrap routes
    require('./config/routes')(app);

    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log('Express app started on port ' + port);
});
