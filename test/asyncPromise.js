/**
 * Created by xiaer on 2018/8/2.
 */
var expect = require('chai').expect
var linesCount = require('../src/asyncPromise')

describe('test promise', function () {
  it('should return correct lines count for a valid file',function (done) {
    var checkCount = function (count) {
      expect(count).to.be.eql(17)
      done()
    }
    linesCount('src/async.js')
      .then(checkCount)
  })

  it('should return correct lines count - using return',function () {
    var callback = function (count) {
      expect(count).to.be.eql(17)
    }

    return linesCount('src/async.js')
      .then(callback)
  })


})