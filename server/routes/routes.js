var express = require('express');
var request = require('request');


module.exports = function(db) {

  var router = express.Router();

  //posting to the meals database details of a new ever
  router.post('/meals', function(req, res) {
    db.meals.post(req, res);
  });



};