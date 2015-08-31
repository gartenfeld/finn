var models = require('./models');

var api = {};

api.findWord = function (req, res) {
  models.getHeadword(req.params.query, function (docs) {
    res.status(200).json(docs);
  });
};

api.findText = function (req, res) {
  models.getCitations(req.params.query, function (docs) {
    res.status(200).json(docs);
  });
};

module.exports = api;
