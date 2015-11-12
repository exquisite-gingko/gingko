var express = require('express');
var request = require('request');


module.exports = function(db) {  

  var router = express.Router();

  router.get('/login', function(req, res) {
    //query the facebook api
  });

  router.get('/restaurants', function(req, res) {
    //query an api for restaurant info
  });

  router.get('/', function(req, res) {
    //query google for google maps stuff
  });

  return router;

};