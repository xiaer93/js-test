/**
 * Created by xiaer on 2018/7/24.
 */
var expect = require('chai').expect;

// 金丝雀测试，可以确保当前测试工具可执行（可使用）
describe('util tests', function () {
  it('should pass this canary test', function () {
    expect(true).to.eql(true)
  })
})