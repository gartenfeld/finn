var mongo = require('mongodb').MongoClient;

var dbUser = process.env.SUOMI_USERNAME,
    dbPass = process.env.SUOMI_PASSWORD,
    dbCred = dbUser + ':' + dbPass + '@',
    dbHost = 'ds043037.mongolab.com',
    dbPort = 43037,
    uri = 'mongodb://' + dbCred + dbHost + ':' + dbPort + '/suomi';

var db;

var CACHE_TIMEOUT = 300000;

var clearCachedItem = function(cache, query) {
  var timer = setTimeout(function() {
    delete cache[query];
    clearTimeout(timer);
  }, CACHE_TIMEOUT);
};

mongo.connect(uri, function (err, pool) {
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
