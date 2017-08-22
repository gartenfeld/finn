var DB_USER = process.env.SUOMI_USERNAME;
var DB_PASS = process.env.SUOMI_PASSWORD;
var DB_PREFIX = DB_USER + ':' + DB_PASS + '@';
var DB_HOST = 'ds043037.mongolab.com';
var DB_PORT = 43037;
var DB_NAME = 'suomi';
var DB_URI = 'mongodb://' + DB_PREFIX + DB_HOST + ':' + DB_PORT + '/' + DB_NAME;

module.exports = DB_URI;
