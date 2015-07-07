function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

var days, currentDay;

$(document).ready(function () {
	if (all_days.length > 0){
		console.log(all_days);
		days = all_days.map(function(mongoDay,index){
			return new Day(mongoDay.hotel,mongoDay.restuarants,mongoDay.thingsToDo,mongoDay.number)
		})
		console.log(days);
		days[0].$button.addClass('current-day');
		currentDay = days[0];
	}
	else{
	days = [];

	currentDay = new Day();
	$.ajax({
		type: 'POST',
		url: '/days',
		data: {day: JSON.stringify(currentDay)},
		success: function (resData){
			// console.log(resData);
			console.log("you made the first day")
		}
	})
	currentDay.$button.addClass('current-day');
	}
});