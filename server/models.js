var mongo = require('mongodb').MongoClient;
var uri = require('./uri');

// @return {<Promise>}
var connection = mongo.connect(uri);

function getQueryParams(query) {
  return {
    $text: {
      $search: query
    }
  };
}

function makeQueryHandler(collectionName, limits) {
  return function(query) {
    var queryParams = getQueryParams(query);
    return connection.then(function(db) {
      return db.collection(collectionName)
        .find(queryParams, limits).toArray();
    });
  };
}

var getHeadwords = makeQueryHandler('sanat', { limit: 10 });
var getSentences = makeQueryHandler('citations', { limit : 10 });

module.exports = {
  word: getHeadwords,
  text: getSentences
};
