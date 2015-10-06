var mongo = require('mongodb').MongoClient;

// var dbUser = process.env.SUOMI_USERNAME,
//     dbPass = process.env.SUOMI_PASSWORD,
//     dbHost = dbUser + ":" + dbPass + "@ds063180.mongolab.com",
//     dbPort = 63180,
//     uri = 'mongodb://' + dbHost + ':' + dbPort + '/suomi';

var uri = '127.0.0.1:27017/finn';
// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  uri = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

uri = 'mongodb://' + uri;

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
