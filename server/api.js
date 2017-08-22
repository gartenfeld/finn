var models = require('./models');

function getData(model) {
  return function(req, res) {
    var query = String(req.params.query);
    return models[model](query).then(function(docs) {
      return res.status(200).json(docs);
    });
  };
}

module.exports = {
  word: getData('word'),
  text: getData('text')
};
