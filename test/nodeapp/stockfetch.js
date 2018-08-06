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

describe('getprice test', function () {
  var stockfetch
  var sandbox

  beforeEach(function () {
    stockfetch = new StockFetch()
    sandbox = sinon.createSandbox()
  })
  afterEach(function () {
    sandbox.restore()
  })

  it('getprice should call get on http with valid URL', function (done) {
    var httpStub = sandbox.stub(stockfetch.http, 'get').callsFake(function (url) {
      expect(url).to.be.eql('http://example.com?s=GOOG')
      done()
      return {
        on: function () {
          
        }
      }
    })

    stockfetch.getPrice('GOOG')
  })
  it('getPrice should send a response handler to get', function (done) {
    var aHandler = function () {

    }

    sandbox.stub(stockfetch.processResponse, 'bind')
      .withArgs(stockfetch, 'GOOG')
      .returns(aHandler)

    var httpStub = sandbox.stub(stockfetch.http, 'get').callsFake(function (url, handler) {
      expect(handler).to.be.eql(aHandler)
      done()
      return {on: function () {
        
      }}
    })

    stockfetch.getPrice('GOOG')
  })
  it('getPrice should register handler for failure to reach host', function (done) {
    var errorHandler = function () {}

    sandbox.stub(stockfetch.processError, 'bind')
      .withArgs(stockfetch, 'GOOG')
      .returns(errorHandler)

    var onStub = function (event, handler) {
      expect(event).to.be.eql('error')
      expect(handler).to.be.eql(errorHandler)
      done()
    }

    sandbox.stub(stockfetch.http, 'get').returns({on: onStub})
    stockfetch.getPrice('GOOG')
  })
  
  it('processResponse should call parsePrice with valid data', function () {
    var dataFunction
    var endFunction
    
    var response = {
      statusCode: 200,
      // 在response中定义函数，使dataFunction可以获取到正确函数对象~~~
      on: function (event, handler) {
        if(event === 'data') {
          dataFunction = handler
        }
        if(event === 'end') {
          endFunction = handler
        }
      }
    }

    var parsePriceMock = sandbox.mock(stockfetch)
      .expects('parsePrice')
      .withArgs('GOOG', 'some data');

    stockfetch.processResponse('GOOG', response)
    dataFunction('some ')
    dataFunction('data')
    endFunction()

    parsePriceMock.verify();

  })
  it('processResponse should call processError if response failed', function () {
    var response = {statusCode: 404}
    var processErrorMock = sandbox.mock(stockfetch)
      .expects('processError')
      .withArgs('GOOG', 404)

    stockfetch.processResponse('GOOG', response)
    processErrorMock.verify()
  })
  it('processResponse should call processError only if response failed', function () {
    var response = {
      statusCode: 200,
      on: function () {}
    }

    var processErrorMock = sandbox.mock(stockfetch)
      .expects('processError')
      .never()

    stockfetch.processResponse('GOOG', response)
    processErrorMock.verify()
  })
})