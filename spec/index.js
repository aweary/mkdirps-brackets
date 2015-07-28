var expect = require('chai').expect
var mkdirp = require('../index.js')

describe('mkdirps-brackets', function() {

  it('should throw an error if string isn\'t passed for the path', function() {

    mkdirp(100, function(err) {
      expect(err).to.not.be.null
    })

    mkdirp({x: 100}, function(err) {
      expect(err).to.not.be.null
    })

  })

  it('should not throw an error with a valid path', function() {
    mkdirp('test/{spec,test}', function(err) {
      expect(err).to.be.null
    })
  })

})
