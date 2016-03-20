
var baseSite = "api.openweathermap.org/data/";
var version = 2.5;
var cityID = 4274277;
var cityName = "Lawrence,us";
var metric = false;
var apiKey = "15a642a0161ecfc456775b42af6785ac";
var apiKey2 = "48eb68b0eb4517d04a51e797a68d5903";

var callWeather = "http://" + baseSite + version + "/weather?q=" + cityName + "&units=" + (metric ? "metric" : "imperial") + "&appID=" + apiKey;
var callForecast = "http://" + baseSite + version + "/forecast?q=" + cityName + "&units=" + (metric ? "metric" : "imperial") + "&appID=" + apiKey;
var callForecast2 = "http://" + baseSite + version + "/forecast?q=" + cityName + "&units=" + (metric ? "metric" : "imperial") + "&appID=" + apiKey2;

var dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startWeather(){
	updateWeather();
	
	//check if recent forecast data exists in local storage before calling update
	var age = localStorage.getItem("lastCall");
	//hours * seconds/hour * milliseconds/second
	var maxAgeDiff = 6 * 3600 * 1000;
	if((Date.now() - maxAgeDiff) > age)	
		updateForecast();
	else
		displayLocalForecast();
}

function updateWeather(){
	$.getJSON(callWeather, function(data, status, xhr){
		//log for testing
		console.log(data);
		
		var iconCode = data.weather[0].icon;
		var temp = Math.round(data.main.temp);
		
		document.getElementById("weather").innerHTML = "<i class='wi " + getIconName(iconCode) + "'></i> " + temp + "\xB0";
	});
}

function updateForecast(call){
	$.getJSON(callForecast2, function(data, status, xhr){
		//save info to local storage to use if page reloaded over short time frame
		localStorage.setItem("forecast", JSON.stringify(data));
		localStorage.setItem("lastCall", Date.now());
		
		displayForecast(data);
	});
}

function displayLocalForecast(){
	displayForecast(JSON.parse(localStorage.getItem('forecast')));
}

function displayForecast(data){
	//log for testing purposes
	console.log(data);
	
	//absurd default values so they can be compared to find actual lows/highs
	var days = [0, 0, 0, 0, 0];
	var lows = [200, 200, 200, 200, 200];
	var highs = [-200, -200, -200, -200, -200];
	
	var day = (new Date()).getDay();
	for(var i = 0; i < 5; i++)
		days[i] = dayNames[(day+i)%7];
	
	for(var i = 0; i < 5; i++){
		for(var j = 0; j < 8; j++){
			try{
				var forecastTemp = Math.round(data.list[((8*i)+j)].main.temp);
				
				//console.log(forecastTemp + " " + lows[i] + " " + highs[i]);
				
				if (forecastTemp > highs[i])
					highs[i] = forecastTemp;
				if (forecastTemp < lows[i])
					lows[i] = forecastTemp;
			} catch(err){}
		}
	}
	
	document.getElementById("forecastRow1").innerHTML = "<td>" + days[0] + "</td>" + "<td>" + lows[0] + "\xB0</td>" + "<td>" + highs[0] + "\xB0</td>";
	document.getElementById("forecastRow2").innerHTML = "<td>" + days[1]  + "</td>" + "<td>" + lows[1] + "\xB0</td>" + "<td>" + highs[1] + "\xB0</td>";
	document.getElementById("forecastRow3").innerHTML = "<td>" + days[2]  + "</td>" + "<td>" + lows[2] + "\xB0</td>" + "<td>" + highs[2] + "\xB0</td>";
}

function getIconName(code){
	 switch(code){
		case "01d":
			return "wi-day-sunny";
		case "02d":
			return "wi-day-cloudy";
		case "03d":
			return "wi-cloudy";
		case "04d":
			return "wi-cloudy-windy";
		case "09d":
			return "wi-showers";
		case "10d":
			return "wi-rain";
		case "11d":
			return "wi-thunderstorm";
		case "13d":
			return "wi-snow";
		case "50d":
			return "wi-fog";
		case "01n":
			return "wi-night-clear";
		case "02n":
			return "wi-night-cloudy";
		case "03n":
			return "wi-night-cloudy";
		case "04n":
			return "wi-night-cloudy";
		case "09n":
			return "wi-night-showers";
		case "10n":
			return "wi-night-rain";
		case "11n":
			return "wi-night-thunderstorm";
		case "13n":
			return "wi-night-snow";
		case "50n":
			return "wi-night-alt-cloudy-windy";
		
		default:
			break;
	}
}

function toTileCase(str){
	return str.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
