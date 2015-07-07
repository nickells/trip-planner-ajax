var Day;
//they made a constructor
//each day has its own hotel,restaurant,things
$(document).ready(function () {
	//constructor that makes new Days.
	Day = function (hotel,restaurants,thingsToDo,number) {

		this.hotel = hotel || null;
		this.restaurants = restaurants || [];
		this.thingsToDo = thingsToDo || [];
		this.number = number || days.push(this);

		this.buildButton()
			.drawButton();
	}

	//this makes 
	Day.prototype.buildButton = function () { //creates a day button
		this.$button = $('<button class="btn btn-circle day-btn"></button>').text(this.number);
		var self = this;
		this.$button.on('click', function () {
			self.switchTo(); //switches to this day on click
		});
		return this;
	};

	Day.prototype.drawButton = function () { //renders a day button
		var $parent = $('.day-buttons');
		this.$button.appendTo($parent);
		return this;
	};

	Day.prototype.eraseButton = function () { //erases the chosen button
		this.$button.detach();
		return this;

		//"The .detach() method is the same as .remove(),
				//except that .detach() keeps all jQuery data associated with the removed elements.
				//This method is useful when removed elements are to be
				//reinserted into the DOM at a later time."

	};

	//switches to a new button
	Day.prototype.switchTo = function () {
		function eraseOne (attraction) {
			attraction.eraseMarker().eraseItineraryItem();
		}
		if (currentDay.hotel) eraseOne(currentDay.hotel);
		currentDay.restaurants.forEach(eraseOne);
		currentDay.thingsToDo.forEach(eraseOne);

		function drawOne (attraction) {
			attraction.drawMarker().drawItineraryItem();
		}
		if (this.hotel) drawOne(this.hotel);
		this.restaurants.forEach(drawOne);
		this.thingsToDo.forEach(drawOne);

		currentDay.$button.removeClass('current-day');
		this.$button.addClass('current-day');
		$('#day-title > span').text('Day ' + this.number);
		currentDay = this;
	};

	function deleteCurrentDay () {

			if (days.length > 1) {
				var index = days.indexOf(currentDay),
					previousDay = days.splice(index, 1)[0],
					newCurrent = days[index] || days[index - 1];
				var anId = previousDay.number;
				ajaxIt('DELETE', '/days/'+anId, {id: anId}, function(resData){
						//console.log(resData);
						console.log("client says you deleted a post")
					})
			days.forEach(function (day, idx) {
				var anId = day.number;
				ajaxIt('PUT','/days/' + anId, {id: anId, index: idx}, function(){
						//console.log("client says your days are numbered");
					})
				day.number = idx + 1;
				day.$button.text(day.number);
			});

			newCurrent.switchTo();
			previousDay.eraseButton();
		}
	};

	$('#add-day').on('click', function () {
		var thisDay = new Day();
		$.ajax({
			type: 'POST',
			url: '/days',
			data: {day: JSON.stringify(thisDay)},
			success: function (resData){
				// console.log(resData);
				// console.log("it worked! you're a genius")
			}
		})
	});

	$('#day-title > .remove').on('click', deleteCurrentDay);
});