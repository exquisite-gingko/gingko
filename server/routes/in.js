var express = require('express');
var request = require('request');


module.exports = function(db) {

  var router = express.Router();

  //posting to the query file which will post to the meals database details of a new event
  router.post('/meals', function(req, res) {
    db.meals.post(req, res);
  });

  router.get('/seeMeals', function(req, res) {
    //request on loading the main page to see the upcoming meals
  });

  router.post('/join', function(req, res) {
    //route to join an event
  });

  router.post('/user', function(req, res) {
    //request sent to facebook for details
    //the response is then sent here
    //and this posts needed details to the query to insert it into the database
  });

  return router;

};