var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

module.exports = {
    development: development,
    test: test,
    production: production
}[process.env.NODE_ENV || 'development'];
