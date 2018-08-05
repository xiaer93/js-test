/**
 * Created by xiaer on 2018/8/5.
 */
// var expect = require('chai').expect
// var createURL = require('../../src/baiduMap/createUrl')

describe('create-url test', function () {
  // 正向测试
  it('should return proper url given lat and lon', function () {
    var latitude = -33.87
    var longitude = 151.25

    var url = createURL(latitude, longitude)
    expect(url).to.be.eql('https://map.baidu.com/?q=-33.87,151.25')
  })

  it('should return proper url given lat and lon', function () {
    var latitude = 37.826;
    var longitude = -122.423;

    var url = createURL(latitude, longitude)
    expect(url).to.be.eql('https://map.baidu.com/?q=37.826,-122.423')
  })

  // 反向测试
  it('should return empty if longitude is undefined', function () {
    var latitude = undefined;
    var longitude = -122.423;

    var url = createURL(latitude, longitude)
    expect(url).to.be.eql('')
  })
  it('should return empty if longitude is undefined', function () {
    var latitude = 37.826;
    var longitude = undefined;

    var url = createURL(latitude, longitude)
    expect(url).to.be.eql('')
  })
})

describe('setLocation test', function () {
  it('should set URL into location of window', function () {
    var windowSub = {}
    var url = 'http://example.com'
    setLocation(windowSub, url)

    expect(windowSub.location).to.be.eql(url)
  })
})

describe('locate test', function () {
  it('should register handlers with getCurrentPosition', function (done) {
    var original = navigator.geolocation.getCurrentPosition

    navigator.geolocation.getCurrentPosition = function (success, error) {
      expect(success).to.be.eql(onSuccess)
      expect(error).to.be.eql(onError)
      done()
    }

    locate()
    // 还原函数~~~？
    navigator.geolocation.getCurrentPosition = original
  })
})

var sandbox
beforeEach(function () {
  sandbox = sinon.createSandbox()
})
afterEach(function () {
  sandbox.restore()
})

describe('locate test2', function () {
  it('should register handlers with getCurrentPosition',function () {
    var getCurrentPositionMock =
      sandbox.mock(navigator.geolocation)
        .expects('getCurrentPosition')
        .withArgs(onSuccess, onError)

    locate()
    getCurrentPositionMock.verify()
  })
})

describe('onError test', function () {
  it('should set the error Dom element', function () {
    var domElement = {innerHTML: ''}
    sandbox.stub(document, 'getElementById')
      .withArgs('error')
      .returns(domElement)


    var message = 'i love you'
    var positionError = {message: message}
    onError(positionError)
    expect(domElement.innerHTML).to.be.eql(message)
  })
})

describe('onSuccess test' ,function () {
  it('should call createURL with latitude and longitude', function () {
    var createURLSpy = sandbox.spy(window, 'createURL')

    var position = {coords: {latitude: 40.4, longitude: -105.5}}
    onSuccess(position)

    expect(createURLSpy).to.have.been.calledWith(40.4, -105.5)
  })

  it('should call setLocation with URL returned by createURL', function () {
    var url = 'http://www.example.com'

    sandbox.stub(window, 'createURL')
      .returns(url)

    var setLocationSpy = sandbox.spy(window, 'setLocation')
    var position = {coords: {latitude: 40.4, longitude: -105.5}}
    onSuccess(position)

    // setLocation应该接收，createURL返回的地址url
    expect(setLocationSpy).to.have.been.calledWith(window, url)
  })
})