
var MongoClient = require('mongodb').MongoClient;
var uri = require('./uri');

var mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

var client = new MongoClient(uri, mongoOptions);
var connection = client.connect();

var queryOptions = { limit: 10 };

function getQueryParams(query) {
  return {
    $text: {
      $search: query
    }
  };
}



function makeQueryHandler(collectionName) {
  return function(query) {
    var queryParams = getQueryParams(query);
    return connection.then(function () {
      return client
        .db()
        .collection(collectionName)
        .find(queryParams, queryOptions)
        .toArray();
    });
  };
}

var getHeadwords = makeQueryHandler('sanat');
var getSentences = makeQueryHandler('citations');

module.exports = {
  word: getHeadwords,
  text: getSentences
};
