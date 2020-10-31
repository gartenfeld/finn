var DB_USER = process.env.SUOMI_USERNAME;
var DB_PASS = process.env.SUOMI_PASSWORD;
var DB_PREFIX = DB_USER + ':' + DB_PASS + '@';
var DB_HOST = 'suomi.ckdtn.mongodb.net';
var DB_URI_PARAMS = 'retryWrites=true&w=majority'
var DB_NAME = 'suomi';
var DB_URI = 'mongodb+srv://' + DB_PREFIX + DB_HOST + '/' + DB_NAME + '?' + DB_URI_PARAMS;

if (!DB_USER) {
    throw 'Database variables not loaded'
}

module.exports = DB_URI;
