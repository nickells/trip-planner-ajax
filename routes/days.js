var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');


// GET /days
dayRouter.get('/', function (req, res, next) {
    models.Day.find({}).exec()
    .then(function(results){
    	res.json(results);
    });
});
// POST /days
dayRouter.post('/', function (req, res, next) {
    // creates a new day and serves it as json
    var thisDayObj = JSON.parse(req.body.day)
    models.Day.create(thisDayObj, function(err,results){
        res.json(results)
    })
});
// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
    models.Day.find({number: req.params.id}).exec()
    .then(function(results){
        res.json(results);
    })
    // serves a particular day as json
});
// PUT (for updating) /days/:id
dayRouter.put('/:id', function (req, res, next) {
    models.Day.findOne({number: req.params.id}, function(err, day) {
        day.number =  Number(req.body.index) + 1;
        day.save();
    })

});

// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
    models.Day.remove({number: req.params.id}).exec()
    .then(function(){
        console.log("day with number " + req.params.id + " was removed")
        res.send("server says you deleted a post")
    })
});

dayRouter.use('/:id', attractionRouter);


// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    // creates a reference to the hotel
    var thisDayObj = JSON.parse(req.body.day)
    models.Day.findOne({number: req.params.id}, function(err, day){
        models.Hotel.findOne({name: req.body.hotel}, function(err, hotel){
            day.hotel = hotel._id
            day.save();
        })
    })
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    // deletes the reference of the hotel
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});

module.exports = {
	dayRouter: dayRouter,
	attractionRouter: attractionRouter
}