var Hotel;

$(document).ready(function () {
	Hotel = function (data) {
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		if (currentDay.hotel) {
			currentDay.hotel.delete();
		}
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.hotel = this;
		// ajaxIt('POST', '/days/' + currentDay.number + '/hotel', 
		// 	{id: currentDay.number, hotel: currentDay.hotel}, function(){
		// 		console.log("hotel posted from client");
		// 	}) 
	}

	Hotel.prototype = generateAttraction({
		icon: '/images/lodging_0star.png',
		$listGroup: $('#my-hotel .list-group'),
		$all: $('#all-hotels'),
		all: all_hotels,
		constructor: Hotel
	});

	Hotel.prototype.delete = function () {
		currentDay.hotel
			.eraseMarker()
			.eraseItineraryItem();
		currentDay.hotel = null;
	};
});