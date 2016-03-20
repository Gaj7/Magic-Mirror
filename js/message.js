function updateMessage(){
	var message;
	var today = new Date();
	var hours = today.getHours();
	
	if(hours < 12)
		message = "Good Morning!";
	else if(hours >=12 && hours <18)
		message = "Good Afternoon!";
	else if(hours >= 18)
		message = "Good Evening!";
	
	document.getElementById("message").innerHTML = message;
}