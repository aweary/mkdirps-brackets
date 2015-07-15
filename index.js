var expand  = require('brace-expansion');
var async = require('async');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = function(path, _callback) {

  if (!path || typeof path !== 'string') {
    _callback(new Error('No valid path(s) provided!'));
    return;
  }

  var expandedPath = expand(path);
  async.each(expandedPath, function(path, callback) {

    try {  var defined = fs.statSync(path, function(err, stats) { return true }); }

    catch (err) { var defined = false; };

    if (!defined) {
      mkdirp(path);
    }

    callback(null);
  });

  _callback(null);

};
