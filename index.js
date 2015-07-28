var expand  = require('brace-expansion')
var async = require('async')
var fs = require('fs')
var mkdirp = require('mkdirp')

module.exports = mkdirps

/**
 * Validate and parse the directory structure
 * from the passed path string
 *
 * @param  {String} path       directories to create
 * @param  {function} callback user provided CB function
 */

function mkdirps(path, callback) {

  if (!path || typeof path !== 'string') {
    callback(new Error('No valid path(s) provided!'))
    return
  }

  var expanded = expand(path)
  async.each(expanded, iterate)
  callback(null)

}

/**
 * Iterate over each parsed path folder and
 * check if it needs to be created
 *
 * @param  {String}   path      expanded path
 * @param  {Function} callback  async callback
 */

function iterate(path, callback) {

  try { fs.lstatSync(path) }
  catch (err) { var defined = false }

  if (!defined) {
    mkdirp(path)
  }

  callback(null)
}
