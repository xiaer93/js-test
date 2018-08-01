/**
 * Created by xiaer on 2018/8/1.
 */
var fs = require("fs")

function linesCount(fileName, callback, onError) {
  var processFile = function (err, data) {
    if(err) {
      onError('unable to open file ' + fileName)
    } else {
      callback(data.toString().split('\n').length)
    }
  }
  fs.readFile(fileName, processFile)
}

module.exports = linesCount