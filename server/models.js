var mongo = require('mongodb').MongoClient;

var dbUser = process.env.SUOMI_USERNAME,
    dbPass = process.env.SUOMI_PASSWORD,
    dbHost = dbUser + ":" + dbPass + "@ds043037.mongolab.com",
    dbPort = 43037,
    uri = 'mongodb://' + dbHost + ':' + dbPort + '/suomi';


var wordCache = {},
    textCache = {};

var models = {};

models.getHeadword = function (query, callback) {
  query = query.toString();
  if (wordCache[query]) {
    callback(wordCache[query]);
  } else {
    mongo.connect(uri, function (err, db) {
      db.collection("sanat").find(
        { $text: { $search: query } },  
        { limit : 10, sort : "headword" }, 
        function (err, cursor) {
          cursor.toArray(function (err, docs) {
            wordCache[query] = docs;
            callback(docs);
            db.close();
          });
        });
    });
  }
};

models.getCitations = function (query, callback) {
  query = query.toString();
  if (textCache[query]) {
    callback(textCache[query]);
  } else {
    mongo.connect(uri, function (err, db) {
      db.collection("citations").find(
        { $text: { $search: query } },  
        { limit : 10 }, 
        function (err, cursor) {
          cursor.toArray(function (err, docs) {
            textCache[query] = docs;
            callback(docs);
            db.close();
          });
        });
    });
  }
};

module.exports = models;
