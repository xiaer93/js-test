/**
 * Created by xiaer on 2018/7/24.
 */
var expect = require('chai').expect
var Util = require('../src/utils')

describe('utils test', function () {
  var util;
  // 在每个测试之前执行，创建实例
  beforeEach(function () {
    util = new Util()
  })

  it('should pass if f2c returns 0C for 32F', function () {
    // 采用3a形式组织测试代码，待测试内容》测试代码》断言
    var str = '32'

    var retNum = util.f2c(str)

    expect(retNum).to.eql(0)
  })

  it('should padd if f2c returns 10C for 50F', function () {
    var fahrenheit = 50

    var celsius = util.f2c(fahrenheit)

    expect(celsius).to.eql(10)
  })
})

//在编写测试时，我们应该考虑这些指导原则：
// 测试（it）和测试套件（describe）应该仅有一个单独的责任。如果一组函数紧密合作，将它们一个套间里进行测试。
// 我们编写的测试描述，必须确保这些行为是正确的，有利于测试反馈~

// 测试的目的是编写一个高内聚低耦合的代码，可以运用如下法则：
// 1/以用户的角度思考，首先编写测试代码，这些测试代码将有助于函数实现和内部结构
// 2/正向测试：当前值条件满足时，验证代码结构是否符合预期
// 3/反响测试：当前值条件或输入不满足时，代码能否优雅进行处理？
// 3/异常测试：代码在应该抛出错误的地方，是否正确抛出错误？
