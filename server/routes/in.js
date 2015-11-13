var express = require('express');
var request = require('request');
var classes = require('./../classes/classes');


module.exports = function(dbController) {

//------------------------------------------------------//

  var router = express.Router();

  //posting to the query file which will post to the meals database details of a new event
  router.post('/meals', function(req, res) {

    var meal = classes.Meal(req.body);

    if (!meal) {
      res.status(400).send('wrong data passed to routes');
    }
       
    dbController.meals.post(meal)
    .then(function(data){
      res.status(200).send(data);
    })
    .catch(function(err) {
      console.log('err posting meal data:', err);
      res.status(500).send(err);
    });
    
  });

//------------------------------------------------------//

  router.get('/meals', function(req, res) {

    //request on loading the main page to see the upcoming meals
    dbController.meals.get(req, res);
  });

  router.post('/meal/join', function(req, res) {
    //user joining an event
    console.log('in route');
    var packetOfJoiningData = {};
    packetOfJoiningData.firstName = req.body.firstName;
    packetOfJoiningData.lastName = req.body.lastName;
    packetOfJoiningData.eventDetails = req.body.description;
    console.log('packet to send', packetOfJoiningData);
    dbController.user.joinMeal(packetOfJoiningData)
    .then(function(data) {
      res.status(200).send(data);
    })
    .catch(function(err) {
      console.log('err posting meal data:', err);
      res.status(500).send(err);
    });

  });

  //testing purposes only?? Do not thing that this is relevant to our app currenly?
  router.get('/user', function(req, res) {
    //get the user details from the database
    dbController.user.get(req, res);
  });

  router.post('/user', function(req, res) {
    //request sent to facebook for details
    //the response is then sent here
    //and this posts needed details to the query to insert it into the database
    dbController.user.post(req, res);
  });

  router.get('/user', function (req, res) {
    dbController.user.get(req, res);
  });

  return router;

};
