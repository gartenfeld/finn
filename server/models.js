var mongo = require('mongodb').MongoClient;

var DB_USER = process.env.SUOMI_USERNAME;
var DB_PASS = process.env.SUOMI_PASSWORD;
var DB_PREFIX = DB_USER + ':' + DB_PASS + '@';
var DB_HOST = 'ds043037.mongolab.com';
var DB_PORT = 43037;
var DB_NAME = 'suomi';
var DB_URI = 'mongodb://' + DB_PREFIX + DB_HOST + ':' + DB_PORT + '/' + DB_NAME;

var db;

var CACHE_TIMEOUT = 30 * 1000;

var clearCachedItem = function(cache, query) {
  var timer = setTimeout(function() {
    delete cache[query];
    clearTimeout(timer);
  }, CACHE_TIMEOUT);
};

mongo.connect(DB_URI, function (err, pool) {
  db = pool;
});

var wordCache = {},
    textCache = {};

var models = {};

models.getHeadword = function (query, callback) {
  query = query.toString();
  if (wordCache[query]) {
    callback(wordCache[query]);
  } else {
    db.collection("sanat").find(
      { $text: { $search: query } },  
      { limit: 10, sort: "headword" }, 
      function (err, cursor) {
        cursor.toArray(function (err, docs) {
          callback(docs);
          wordCache[query] = docs;
          clearCachedItem(wordCache, query);
        });
      });
  }
};

models.getCitations = function (query, callback) {
  query = query.toString();
  if (textCache[query]) {
    callback(textCache[query]);
  } else {
    db.collection("citations").find(
      { $text: { $search: query } },  
      { limit : 10 }, 
      function (err, cursor) {
        cursor.toArray(function (err, docs) {
          callback(docs);
          textCache[query] = docs;
          clearCachedItem(textCache, query);
        });
      });
  }
};

module.exports = models;
