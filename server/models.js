
var MongoClient = require('mongodb').MongoClient;
var uri = require('./uri');

var mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

var client = new MongoClient(uri, mongoOptions);

var connection = client.connect();

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
