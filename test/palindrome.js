/**
 * Created by xiaer on 2018/7/27.
 */
// 回文数测试
var expect = require('chai').expect
var isPalindrome = require("../src/palindrome")


describe('palindrome-test',function () {
  it('should pass this canary test~', function () {
    expect(true).to.be.true
  })
  // 正向测试
  it('should return true for argument 121', function () {
    expect(isPalindrome(121)).to.be.true
  })
  it('should return true for argument 1', function () {
    expect(isPalindrome(1)).to.be.true
  })

  it('should return true for argument 11', function () {
    expect(isPalindrome(11)).to.be.true
  })
  // 反向测试
  it('should return false for argument 12', function () {
    expect(isPalindrome(12)).to.be.false
  })
  it('should return false when argument is String', function () {
    expect(isPalindrome('121')).to.be.false
  })
  it('should return false when argument is Boolen', function () {
    expect(isPalindrome(true)).to.be.false
  })
  it('should return false when argument is Object', function () {
    expect(isPalindrome({})).to.be.false
  })
  // 异常测试
  it('should throw an expection if argument is missing', function () {
    var call = function () {
      isPalindrome()
    }
    // 回文函数会抛出异常，因此不能直接放在expect中使用，但是可以放入返回值~
    expect(call).to.throw(Error, 'Invalid argument')
  })
})

// 测试报告
// Istanbul，主要用于检测代码测试尚未覆盖的部分~？？？