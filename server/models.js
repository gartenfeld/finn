var mongo = require('mongodb').MongoClient;

var dbUser = process.env.SUOMI_USERNAME,
    dbPass = process.env.SUOMI_PASSWORD,
    dbHost = dbUser + ":" + dbPass + "@ds063180.mongolab.com",
    dbPort = 63180,
    uri = 'mongodb://' + dbHost + ':' + dbPort + '/suomi';

var models = {};

models.getHeadword = function (searchString, callback) {
  mongo.connect(uri, function (err, db) {
    db.collection("sanat", function (err, collection) {
      collection.find(
        { $text: { $search: searchString.toString() } },  
        { limit : 10, sort : "headword" }, 
        function (err, cursor) {
          cursor.toArray(
            function (err, docs) {
              callback(docs);
            });
        });
    });
  });
};

models.getCitations = function (searchText, callback) {
  mongo.connect(uri, function (err, db) {
    db.collection("citations", function (err, collection) {
      collection.find(
        { $text: { $search: searchText.toString() } },  
        { limit : 10 }, 
        function (err, cursor) {
          cursor.toArray(
            function (err, docs) {
              callback(docs);
            });
        });
    });
  });
};

module.exports = models;
