function getCoordinates() {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude
    var lon = position.coords.longitude
    getWeather(lat, lon)
  })
}

function getWeather(lat, lon) {
  var API_KEY = '176b75e173a8d99e3705da4bb1467bef'
  var api =
    'https://crossorig.in/http://api.openweathermap.org/data/2.5/weather?lat=' +
    lat +
    '&lon=' +
    lon +
    '&appid=' +
    API_KEY
  $.getJSON(api, function (data) {
    var city = data.name
    var weather = data.weather[0].description
    var tempKelv = data.main.temp
    var tempFahr = (tempKelv * (9 / 5) - 459, 67).toFixed(1) + ' &#8457'
    var tempCels = (tempKelv - 273).toFixed(1) + ' &#8451'
    $('.city').html(city)
    $('.weather').html(weather)
    $('.temp').html(tempFahr)
    if (weather.includes('rain')) {
      $('body').addClass('rain-background')
    } else if (weather.includes('clouds')) {
      $('body').addClass('cloudy-background')
    } else {
      $('body').addClass('sunny-background')
    }
    previousTemp = tempFahr
    $('#button').on('click', function () {
      if (previousTemp === tempFahr) {
        $('.temp').html(tempCels)
        previousTemp = tempCels
      } else {
        $('.temp').html(tempFahr)
        previousTemp = tempFahr
      }
    })
  })
}

function startApp() {
  getCoordinates()
}

$(document).ready(function () {
  startApp()
})


