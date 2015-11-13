var express = require('express');
var request = require('request');


module.exports = function(dbController) {

  var router = express.Router();

  //posting to the query file which will post to the meals database details of a new event
  router.post('/meals', function (req, res) {
    dbController.meals.post(req, res);
    //after posting, redirect to get meals
  });

  router.get('/meals', function (req, res) {
    //request on loading the main page to see the upcoming meals
    dbController.meals.get(req, res);
  });

  router.post('/join', function (req, res) {
    //route to join an event
  });

  router.post('/user', function (req, res) {
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