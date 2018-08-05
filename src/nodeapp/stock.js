/**
 * Created by xiaer on 2018/8/5.
 */
var fs = require('fs')

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

    return rawData.split('\n').filter(isInRightFormat)
  }
  
  this.processTickers = function (tickers) {
    var self = this
    self.tickersCount = tickers.length
    tickers.forEach(function (ticker) {
      self.getPrice(ticker)
    })
  }
  this.getPrice = function () {
    
  }
  
}

module.exports = StockFetch