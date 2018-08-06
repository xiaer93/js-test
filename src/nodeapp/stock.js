/**
 * Created by xiaer on 2018/8/5.
 */
var fs = require('fs')
var http = require('http')

var StockFetch = function () {
  this.tickersCount = 0
  this.readTickersFile = function (fileName, onError) {
    var self = this
    var processResponse = function (err, data) {
      if(err) {
        onError('Error reading file: ' + fileName)
      } else {
        var ticker = self.parseTickers(data)
        if(ticker.length === 0) {
          onError('File ' + fileName + ' has invalid content')
        } else {
          self.processTickers(ticker)
        }
      }
    }

    fs.readFile(fileName, processResponse)
  }
  this.parseTickers = function (rawData) {
    var isInRightFormat = function (str) {
      return str.trim().length !== 0 && str.indexOf(' ') < 0
    }

    // readFile未设置编码形式，需要在这里手动转换？
    return rawData.toString('utf-8').split('\n').filter(isInRightFormat)
  }
  
  this.processTickers = function (tickers) {
    var self = this
    self.tickersCount = tickers.length
    tickers.forEach(function (ticker) {
      self.getPrice(ticker)
    })
  }
/*  this.getPrice = function (ticker) {
    this.http.get('http://example.com?s=' + ticker, function (res) {
      if(res.statusCode === 200) {
        var data = ''
        var getChunk = function (chunk) {
          data += chunk
        }
        res.on('data', getChunk)
        res.on('end', function () {
          console.log('received data for ' + ticker)
        })
      } else {
        console.log(ticker + ' - error getting data : ' + res.statusCode)
      }
    }).on('error', function (err) {
      console.log(ticker + ' - error getting data : ' + err.code)
    })
  }
  this.processResponse = {
    bind: function () {
      
    }
  }
  this.http = {
    get: function () {

    }
  }*/

  this.prices = {}
  this.errors = {}
  this.http = http
  this.getPrice = function (symbol) {
    var url = 'http://example.com?s=' + symbol
    this.http.get(url, this.processResponse.bind(this, symbol))
      .on('error', this.processError.bind(this, symbol))
  }
  this.processResponse = function (symbol, response) {
    var self = this
    if(response.statusCode === 200) {
      var data = ''
      response.on('data', function (chunk) {
        data += chunk
      })
      response.on('end', function () {
        self.parsePrice(symbol, data)
      })
    }
    else {
      this.processError(symbol, response.statusCode)
    }
  }
  this.processError = function (symbol, errMsg) {
    this.errors[symbol] = errMsg
    this.printReport()
  }
  this.parsePrice = function (symbol, data) {
    var price = data.split('\n')[1].split(',').pop()
    this.prices[symbol] = price
    this.printReport()
  }
  this.processHttpError = function (symbol, error) {
    this.processError(symbol, error.code)
  }
  this.printReport = function () {
    if(this.tickersCount === (Object.keys(this.prices).length + Object.keys(this.errors).length)){
      this.reportCallback(this.sortData(this.prices), this.sortData(this.errors))
    }
  }
  this.sortData = function (dataToSort) {
    var toArray = function (key) {
      return [key, dataToSort[key]]
    }
    return Object.keys(dataToSort).sort().map(toArray)
  }
  this.reportCallback = function () {
    
  }
  this.getPriceForTickers = function(fileName, displayFn, errorFn) {
    this.reportCallback = displayFn;
    this.readTickersFile(fileName, errorFn);
  };
}

module.exports = StockFetch