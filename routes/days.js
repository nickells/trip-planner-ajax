var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');


// GET /days
dayRouter.get('/', function (req, res, next) {
    models.Day.find({}).populate('hotel').exec()
    .then(function(data){
        res.send(data);
    })
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
        es.send("server says you deleted a post")
    })
});

dayRouter.use('/:id', attractionRouter);


// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    // creates a reference to the hotel
    var thisDayObj = JSON.parse(req.body.day)
    // console.log(thisDayObj);
    models.Day.findOne({number: thisDayObj.id}, function(err, day){
        if (err) res.send(err);
        else {
            day.hotel = thisDayObj.hotel_id;
            day.save();
            res.json(day);
        }
    })
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
        models.Day.findOne({number: req.body.id}, function(err, day){
        if (err) res.send(err);
        else {
            day.hotel = null;
            day.save();
            res.json(day);
        }
    })
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