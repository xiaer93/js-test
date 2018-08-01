/**
 * Created by xiaer on 2018/8/1.
 */
var expect = require('chai').expect
var linesCount = require('../src/async')

describe('test server-side callback', function () {
  it('should pass canary test', function () {
      expect(true).to.be.true
  })

  it('should return correct lines count for a valid file', function () {
    // ��ȡ�ļ���Ļص�~~
    var callback = function (count) {
      expect(count).to.be.eql(17)
    }
    // �ļ���ȡʧ�ܺ�Ļص�~~
    var onError = function (error) {
      expect(error).to.be.eql('unable to open file src/async.js')
    }

    linesCount('src/async.js', callback, onError)
  })
})