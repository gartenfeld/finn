var fetch = require('request');
var API = 'https://challenge.flipboard.com/step';

var Explorer = function(team) {
  this.team = team;
  this.history = '';
};

Explorer.prototype.go = function(x, y) {
  var url = API + '?s=' + this.team.maze + '&x=' + x + '&y=' + y;
  var me = this;
  fetch(url, function (err, data) {
    data = JSON.parse(data.body);
    var found = data.end;
    var letter = data.letter;
    var paths = data.adjacent.filter(function(cell) {
      var key = JSON.stringify([cell.x, cell.y]);
      return !me.team.map[key];
    });
    var codes = {
      0: 'deadend',
      1: 'continue'
    };
    var status = codes[paths.length] || 'fork';
    var here = JSON.stringify([x, y]);
    me.history += me.history === '' ? '' : '_';
    me.history += here;
    if (found) {
      me.team.finished = true;
      me.team.map.answer = me.history.split('_');
    }
    me.team.map[here] = {
      letter: letter,
      status: status
    };
    me.team.publish();

    if (!me.team.finished) {
      var first = paths.shift();
      paths.forEach(function(next) {
        var buddy = new Explorer(me.team);
        buddy.history = me.history;
        buddy.go(next.x, next.y);
      });
      me.go(first.x, first.y);
    }

  });
};

module.exports = Explorer;