/**
 * Created by xiaer on 2018/8/5.
 */
function createURL(latitude, longitude) {
  if(latitude && longitude) {
    return 'https://map.baidu.com/?q=' + latitude + ',' + longitude
  } else {
    return ''
  }
}

function setLocation(window, url) {
  window.location = url
}


var onSuccess = function (position) {
  var latitude = position.coords.latitude
  var longitude = position.coords.longitude

  var url = createURL(latitude, longitude)
  setLocation(window, url)
}
var onError = function (error) {
  document.getElementById('error').innerHTML = error.message
}
// 如何测试locate？成功获取地址执行onsuccess，失败执行onerror行为~~~交互检测？？？
var locate = function () {
  navigator.geolocation.getCurrentPosition(onSuccess, onError)
}