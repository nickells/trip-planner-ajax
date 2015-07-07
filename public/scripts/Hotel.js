var Hotel;

$(document).ready(function () {
	//console.log(all_hotels);
	Hotel = function (data) {
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		// if (currentDay.hotel) {
		// 	console.log(currentDay);
		// 	currentDay.hotel.delete();
		// }
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.hotel = this;
		// console.log(currentDay.number, currentDay.hotel)
		//console.dir(currentDay);
		//console.dir(currentDay.hotel);
		$.ajax({
			type: 'POST',
			url: '/days/' + currentDay.number + '/hotel',
			data: {day: JSON.stringify({id: currentDay.number, hotel_id: currentDay.hotel._id})},
			success: function (resData){
				console.log(resData);
				console.log("it worked! you're a genius")
			}
		})
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
		$.ajax({
			type: "DELETE",
			url: '/days/' + currentDay.number + '/hotel',
			data: {id: currentDay.number},
			success: function(resData){
				console.log(resData);
			}
		})
		// ajaxIt('DELETE', '/days/'+currentDay.number + '/hotel', null, function(resData){
		// 	console.log(resData);
		// 	console.log("client says you deleted a post")
		// })
	};
});

	// var ajaxIt = function(type, url, data, success){
	// 	$.ajax({
	// 				type: type,
	// 				url: url,
	// 				data: data,
	// 				success: success
	// 	})
	// }