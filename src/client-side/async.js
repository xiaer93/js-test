/**
 * Created by xiaer on 2018/8/2.
 */
var fetchLocation = function (onSuccess, onError) {
  var returnLocation = function (position) {
    var location = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }

    onSuccess(location)
  }

  navigator.geolocation.getCurrentPosition(returnLocation, onError)
}