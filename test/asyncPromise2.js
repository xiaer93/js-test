/**
 * Created by xiaer on 2018/8/5.
 */
var expect = require('chai').use(require('chai-as-promised')).expect
var linesCount = require('../src/asyncPromise')

describe('async-promise test with chai-as-promised', function () {
  // 返回promise
  it('should return correct lines count - using eventually', function () {
    return expect(linesCount('src/async.js')).to.eventually.eql(17)
  })

  it('should return correct lines count - using no return', function (done) {
    expect(linesCount('src/async.js')).to.eventually.eql(17).notify(done)
  })

  // 当传入错误文件名时，promise报错~
  it('should report error for an invalid file name', function (done) {
    expect(linesCount('src/async2.js')).to.be.rejected.notify(done)
  })

  it('should report error for an invalid file name - using with', function () {
    return expect(linesCount('src/async2.js')).to.be.rejectedWith('unable to open file src/async2.js')
  })
})