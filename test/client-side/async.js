/**
 * Created by xiaer on 2018/8/2.
 */
describe('fetch location test', function () {
  it('should get lat and lon from fetchLocation', function (done) {
    var onSuccess = function (location) {
      expect(location).to.have.property('lat')
      expect(location).to.have.property('lon')
      done()
    }

     var onError = function (err) {
       throw 'not expected'
     }

     // 手动修改mocha异步等待时间，默认为2s
     this.timeout(10000)
     fetchLocation(onSuccess, onError)
  })
})