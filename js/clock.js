var hasUpdated = true;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

function startTime() {
	//clock
	var today = new Date();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	updateClock(hours, minutes);
	
	//date
	var month = today.getMonth();
	var day = today.getDate();
	updateDate(month, day);
	
	//call for weather update every 10 minutes, call forecast update every 6 hour(s)
	if(minutes%10==0){
		if(!hasUpdated){
			updateWeather();
			if(hours%6==0)
				updateForecast();
			hasUpdated = true;
		}
	}
	else
		hasUpdated = false;
	
	
	//repeat after delay
	var t = setTimeout(startTime, 500);
}

function updateClock(hours, minutes){
	//determin if am or pm, adjust hours
	var pm;
	if (pm = hours > 12)
		hours -= 12;
	else if (hours == 0)
		hours = 12;
	
	//format minutes to double digits
	minutes = makeDoubleDigit(minutes);
	
	//display
	document.getElementById("clock").innerHTML = hours + ":" + minutes + (pm ? " PM" : " AM");
}

function updateDate(month, day){
	//format month to string
	month = monthNames[month];
	
	//format day to double digits
	day = makeDoubleDigit(day);
	
	//display
	document.getElementById("date").innerHTML = month + " " + day;
}

function makeDoubleDigit(value){
	if(value < 10)
		return "0" + value;
	else
		return value;
}
