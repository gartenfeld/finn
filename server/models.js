var mongo = require('mongodb');

var dbUser = process.env.SUOMI_USERNAME,
    dbPass = process.env.SUOMI_PASSWORD,
    dbHost = dbUser + ":" + dbPass + "@ds063180.mongolab.com",
    dbPort = 63180,
    uri = 'mongodb://' + dbHost + ':' + dbPort + '/suomi';

var models = {};

models.getHeadword = function (searchString, callback) {

  mongo.MongoClient.connect(uri, function(err, db) {
  if(err) throw err;
    db.collection("sanat", function(error, collection){
      collection.find({ 
        $text: { $search: searchString.toString() } 
        },  { "limit" : 10 , "sort" : "headword"}, 
      function(error, cursor){
        cursor.toArray(
          function(error, docs){
            if (docs.length === 0) {
              callback(false);
            } else {
              callback(docs);
            }
          });
      });
    });
  });
};

models.getCitations = function (searchText, callback) {

  mongo.MongoClient.connect(uri, function(err, db) {
  if(err) throw err;
    db.collection("citations", function(error, collection){
      collection.find({ 
        $text: { $search: searchText.toString() } 
        },  { limit : 10 }, 
      function(error, cursor){
        cursor.toArray(
          function(error, docs){
            if (docs.length === 0) {
              callback(false);
            } else {
              callback(docs);
            }
          });
      });
    });
  });
};

module.exports = models;
