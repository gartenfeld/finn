var fetch = require('request');
var Team = require('./team');
var URL = 'https://challenge.flipboard.com/start';
var RE = /(?:s=)(.+)(?=&x)/;
var teams = {};
var Maze = {};

Maze.init = function(req, res) {
  fetch(URL, function (err, data) {
    var query = data.request.uri.query || '';
    var match = query.match(RE);
    if (match) {
      res.send(match[1]);
    }
  });
};

Maze.update = function(req, res) {
  var maze = req.params.id;
  var team = teams[maze] = teams[maze] || new Team(maze);
  team.subscribe(res.json.bind(res));
};

module.exports = Maze;
