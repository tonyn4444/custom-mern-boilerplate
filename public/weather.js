$(document).ready(function() {

	// var x = document.getElementById("credit");
var lon = 0;
var lat = 0;
var API_KEY = '369b9e8838df87b945aa6f8986fcc5a8';
var url = 'https://api.darksky.net/forecast/369b9e8838df87b945aa6f8986fcc5a8/' + lat + ',' + lon;
var x = document.getElementById('city-name')
// api.openweathermap.org/data/2.5/weather?lat=35&lon=139
// https://api.darksky.net/forecast/369b9e8838df87b945aa6f8986fcc5a8/37.8267,-122.4233


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
		    url = 'https://api.darksky.net/forecast/369b9e8838df87b945aa6f8986fcc5a8/' + lat + ',' + lon;
		    console.log(lon, lat)
		    console.log(url);
			$.ajax({
				url: url,
				datatype: 'jsonp',
				headers: {
					'key': API_KEY
				},
				success: function(response) {
					console.log(response);

					// var data = JSON.parse(response);
					$('#city-name').html(response.timezone + ", ");
					$('#temp').html(Math.floor(( (9/5) * (response.currently.temperature - 273)) + 32));
					$('#country').html(response.timezone);
					$('#forecast').html(response.currently.summary);
					$('#temp-icon-farenh').html('&#x2109')

					switch(response.weather[0].main) {
						case "Overcast":
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

					$('#temp-icon-farenh').on('click', function(){
						 // F = 9/5 (K - 273) + 32
						$('#temp').html(Math.floor(response.main.temp - 273));
						$('#temp-icon-farenh').html('&#x2103');
						$('#temp-icon-farenh').attr('id', 'temp-icon-celcius');
					});

					$('#temp-icon-celcius').on('click', function(){
						 // F = 9/5 (K - 273) + 32
						 console.log('test')
						$('#temp').html(response.main.temp);
						$('#temp-icon-celcius').html('&#x2109')
						$('#temp-icon-celcius').attr('id', 'temp-icon-farenh');
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
