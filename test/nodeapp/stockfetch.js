/**
 * Created by xiaer on 2018/8/5.
 */
var expect = require('chai').expect
var sinon =require('sinon')
var fs = require('fs')
var StockFetch = require('../../src/nodeapp/stock')

describe('Stockfetch test', function () {
  var stockfetch
  var sandbox

  beforeEach(function () {
    stockfetch = new StockFetch()
    sandbox = sinon.createSandbox()
  })
  afterEach(function () {
    sandbox.restore()
  })

  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  /*readTickersFile测试*/
  it('read should invoke error handler for invalid file', function (done) {
    var onError = function (error) {
      expect(error).to.be.eql('Error reading file: InvalidFile')
      done()
    }

    sandbox.stub(fs, 'readFile').callsFake(function(fileName, callback) {
      callback(new Error('failed'));
    });

    stockfetch.readTickersFile('InvalidFile', onError)
  })
  // 当正确读取文件后，解析，并传调用processTicker
  it('read should invoke processTickers for valid file', function (done) {
    var rawData = 'GOOG\nAPP'
    var parseData = ['GOOG', 'APP']

    sandbox.stub(stockfetch, 'parseTickers')
      .withArgs(rawData)
      .returns(parseData)

    sandbox.stub(stockfetch, 'processTickers').callsFake(function (data) {
      expect(data).to.be.eql(parseData)
      done()
    })

    sandbox.stub(fs, 'readFile').callsFake(function (fileName, callback) {
      callback(null, rawData)
    })

    stockfetch.readTickersFile('tickers.txt')
  })
  it('read should return error if given file is empty', function (done) {
    var onError = function (err) {
      expect(err).to.be.eql('File tickers.txt has invalid content')
      done()
    }

    // 如果传入空字符，parseTicker返回空数组
    sandbox.stub(stockfetch, 'parseTickers').withArgs('').returns([])

    sandbox.stub(fs, 'readFile').callsFake(function (fileName, callback) {
      callback(null, '')
    })

    stockfetch.readTickersFile('tickers.txt', onError)
  })

  /*parseTicker测试*/
  it('parseTickers should return tickers', function () {
    expect(stockfetch.parseTickers('A\nB\nC')).to.be.eql(['A','B','C'])
  })
  it('parseTickers should return empty for empty content', function () {
    expect(stockfetch.parseTickers('')).to.be.eql([])
  })
  it('parseTickers should return empty array for white-space', function () {
    expect(stockfetch.parseTickers(' ')).to.be.eql([])
  })
  it('parseTickers should ignore unexpected format in content', function () {
    var rawData = "AAPL \nBla h\nGOOG\n\n "
    expect(stockfetch.parseTickers(rawData)).to.be.eql(['GOOG'])
  })


  it('processTickers should call getPrice for each ticker symbol', function () {
    var stockfetchMock = sandbox.mock(stockfetch)
    stockfetchMock.expects('getPrice').withArgs('A')
    stockfetchMock.expects('getPrice').withArgs('B')
    stockfetchMock.expects('getPrice').withArgs('C')

    stockfetch.processTickers(['A','B','C'])
    stockfetchMock.verify()
  })
  it('processTickers should save tickers count', function () {
    sandbox.stub(stockfetch, 'getPrice')

    stockfetch.processTickers(['A','B','C'])
    expect(stockfetch.tickersCount).to.be.eql(3)
  })
})