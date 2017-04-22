

  var blueSkycons = new Skycons({"color": "blue"});
  var yellowSkycons = new Skycons({"color": "blue"});
  var greySkycons = new Skycons({"color": "grey"})


  // on Android, a nasty hack is needed: {"resizeClear": true}

  // you can add a canvas by it's ID...
  greySkycons.add("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
  blueSkycons.add("rainy-day", Skycons.RAIN);
  yellowSkycons.add("sunny-day", Skycons.CLEAR_DAY);


  // ...or by the canvas DOM element itself.
  // skycons.add(document.getElementById("icon2"), Skycons.RAIN);

  // if you're using the Forecast API, you can also supply
  // strings: "partly-cloudy-day" or "rain".

  // start animation!
  blueSkycons.play();
  greySkycons.play();
  yellowSkycons.play();


  // you can also halt animation with skycons.pause()

  // want to change the icon? no problem:
  // skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);

  // want to remove one altogether? no problem:
  // skycons.remove("icon2");

$(document).ready(function() {

	// var x = document.getElementById("credit");
var lon = 0;
var lat = 0;
var API_KEY = '369b9e8838df87b945aa6f8986fcc5a8';
var url = 'https://api.darksky.net/forecast/369b9e8838df87b945aa6f8986fcc5a8/' + lat + ',' + lon;
var x = document.getElementById('city-name')
// api.openweathermap.org/data/2.5/weather?lat=35&lon=139
// https://api.darksky.net/forecast/369b9e8838df87b945aa6f8986fcc5a8/37.8267,-122.4233
// "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"

  // var geocoder;
  // geocoder.geocode(req.body.location, function(err, data) {
  //       var lat = data.results[0].geometry.location.lat;
  //       var lng = data.results[0].geometry.location.lng;
  //       var location = data.results[0].formatted_address;
  //   });

		function getLocation() {
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(showPosition);
		    } else { 
		        x.innerHTML = "Geolocation is not supported by this browser.";
		    }
		}

			function myMap() {
        var mapProp= {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
      };
      var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }

		function showPosition(position) {
		    // x.innerHTML = "Latitude: " + position.coords.latitude + 
		    // "<br>Longitude: " + position.coords.longitude;
		    lon = position.coords.longitude
		    lat = position.coords.latitude
		    var mapProp= {
		        center:new google.maps.LatLng(lat,lon),
		        zoom: 10
    		}

     		var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);



		    url = 'https://api.darksky.net/forecast/369b9e8838df87b945aa6f8986fcc5a8/' + lat + ',' + lon;
		    console.log(lon, lat)
		    console.log(url);
			$.ajax({
				url: url,
				dataType: 'jsonp',
				success: function(response) {
					console.log(response);

					$('#city-name').attr("class", "hide");
					$('#temp').html(Math.floor(response.currently.temperature));
					// $('#country').html(response.timezone);
					$('#forecast').html(response.hourly.summary);
					$('#temp-icon-farenh').html('&#x2109')
					// $('#coords').html('Your location: (' + Math.floor(response.latitude) + ', ' + Math.floor(response.longitude) + ')');

					switch(response.currently.summary) {
						case "Partly Cloudy":
							$('#partly-cloudy-day').attr('class', 'show');
							break;
						case "Clear":
							$("#sunny").attr('class', 'icon sunny clear');
							break;
						case "Mostly Cloudy":
							greySkycons.set('partly-cloudy-day', Skycons.CLOUDY)
							$('#partly-cloudy-day').attr('class', 'show');
							break;
						case "Clear":
							$("#sunny").attr('class', 'icon sunny clear');
							break;
					}

					$('#temp-icon-farenh').on('click', function(){
						 // F = 9/5 (K - 273) + 32
						$('#temp').html(Math.floor((response.currently.temperature - 32) * 5/9));
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


