var mongo = require('mongodb').MongoClient;
var uri = require('./uri');

var db;

mongo.connect(uri, function (err, pool) {
  db = pool;
});

var models = {};

models.getHeadword = function (query, callback) {
  query = query.toString();
  db.collection("sanat").find(
    { $text: { $search: query } },
    { limit: 10, sort: "headword" },
    function (err, cursor) {
      cursor.toArray(function (err, docs) {
        callback(docs);
      });
  });
};

models.getCitations = function (query, callback) {
  query = query.toString();
  db.collection("citations").find(
    { $text: { $search: query } },
    { limit : 10 },
    function (err, cursor) {
      cursor.toArray(function (err, docs) {
        callback(docs);
      });
  });
};

module.exports = models;
