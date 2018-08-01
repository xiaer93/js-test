/**
 * Created by xiaer on 2018/7/27.
 */
// ����������
var expect = require('chai').expect
var isPalindrome = require("../src/palindrome")


describe('palindrome-test',function () {
  it('should pass this canary test~', function () {
    expect(true).to.be.true
  })
  // �������
  it('should return true for argument 121', function () {
    expect(isPalindrome(121)).to.be.true
  })
  it('should return true for argument 1', function () {
    expect(isPalindrome(1)).to.be.true
  })

  it('should return true for argument 11', function () {
    expect(isPalindrome(11)).to.be.true
  })
  // �������
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
  // �쳣����
  it('should throw an expection if argument is missing', function () {
    var call = function () {
      isPalindrome()
    }
    // ���ĺ������׳��쳣����˲���ֱ�ӷ���expect��ʹ�ã����ǿ��Է��뷵��ֵ~
    expect(call).to.throw(Error, 'Invalid argument')
  })
})

// ���Ա���
// Istanbul����Ҫ���ڼ����������δ���ǵĲ���~������