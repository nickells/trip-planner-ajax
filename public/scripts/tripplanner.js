function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

var days, currentDay;

$(document).ready(function () {
	if (all_days.length > 0){
		$.ajax({
			type: "GET",
			url: '/days',
		})
		.done(function(data,done){
			days = data.map(function(mongoDay,index){
				var newDay = new Day(mongoDay.hotel,mongoDay.restuarants,mongoDay.thingsToDo,mongoDay.number);
				currentDay = newDay;
				if (currentDay.hotel) currentDay.hotel = new Hotel(currentDay.hotel);
				currentDay.$button.removeClass('current-day');
				return newDay;
			})
			days.forEach(function(day){
				day.switchTo();
			})
			days[0].switchTo();
		})
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