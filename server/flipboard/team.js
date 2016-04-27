var Explorer = require('./explorer');

var Team = function(maze) {
  this.map = { answer: [] };
  this.maze = maze;
  this.started = false;
  this.finished = false;
  this.audience = [];
};

Team.prototype.subscribe = function(cb) {
  this.audience.push(cb);
  if (!this.started) {
    new Explorer(this).go(0, 0);
    this.started = true;
  }
  if (this.finished) {
    this.publish();
  }
};

Team.prototype.publish = function() {
  while (this.audience.length) {
    this.audience.shift()(this.map);
  }
};

module.exports = Team;
