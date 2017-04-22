$(document).ready(function() {

	// var x = document.getElementById("credit");
var lon = 0;
var lat = 0;
var API_KEY = '&APPID=ef328b71e4664319163442c800054e65';
var url = 'http://api.openweathermap.org/data/2.5/weather?lon=' + lon + '&lat=' + lat;
var x = document.getElementById('city-name')
// api.openweathermap.org/data/2.5/weather?lat=35&lon=139

		function getLocation() {
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(showPosition);
		    } else { 
		        x.innerHTML = "Geolocation is not supported by this browser.";
		    }
		}

		function showPosition(position) {
		    // x.innerHTML = "Latitude: " + position.coords.latitude + 
		    // "<br>Longitude: " + position.coords.longitude;
		    lon = position.coords.longitude
		    lat = position.coords.latitude
		    url = 'http://api.openweathermap.org/data/2.5/weather?lon=' + lon + '&lat=' + lat;
		    console.log(lon, lat)
		    console.log(url);
			$.ajax({
				url: url + API_KEY,
				success: function(response) {
					console.log(response);

					// var data = JSON.parse(response);
					$('#city-name').html(response.name + ", ");
					$('#temp').html(Math.floor((response.main.temp - 273)));
					$('#country').html(response.sys.country);
					$('#forecast').html(response.weather[0].main);
					$('#temp-icon-celcius').html('&#x2103')

					switch(response.weather[0].main) {
						case "Clouds":
							$('#clouds').attr('class', 'icon cloudy clouds');
							break;
						case "Clear":
							$("#sunny").attr('class', 'icon sunny clear');
							break;
						case "Clear":
							$("#sunny").attr('class', 'icon sunny clear');
							break;
						case "Clear":
							$("#sunny").attr('class', 'icon sunny clear');
							break;
					}

					$('#temp-icon-celcius').on('click', function(){
						 // F = 9/5 (K - 273) + 32
						$('#temp').html(Math.floor(((9/5) * (response.main.temp - 273)) + 32));
						$('#temp-icon-celcius').html('&#x2109');
						$('#temp-icon-celcius').attr('id', 'temp-icon-farenh');
					});

					$('#temp-icon-farenh').on('click', function(){
						 // F = 9/5 (K - 273) + 32
						 console.log('test')
						$('#temp').html(response.main.temp);
						$('#temp-icon-farenh').html('&#x2103')
						$('#temp-icon-farenh').attr('id', 'temp-icon-celcius');
					});
				}
			});
		}

		getLocation();

	// $.ajax({
	// 	url: url + API_KEY,
	// 	success: function(response) {
	// 		console.log(response);
	// 		// var data = JSON.parse(response);
	// 		$('#city-name').html(response.visibility);
	// 	}
	// })
});
