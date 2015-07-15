var expand  = require('brace-expansion');
var async = require('async');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = function(path, _callback) {

  if (!path || typeof path !== 'string') throw new Error('No valid path(s) provided!');

  var expandedPath = expand(path);
  async.each(expandedPath, function(path, callback) {

    try {  var defined = fs.statSync(path, function(err, stats) { return true }); }
    catch (err) { var defined = false; };

    /* if the path is not defined, make it */
    if (!defined) {
      mkdirp(path);
    }

    callback(null);

  });

  _callback(null);

};
