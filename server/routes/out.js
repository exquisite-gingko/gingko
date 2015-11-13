var express = require('express');
var request = require('request');


module.exports = function(db, passport, isLoggedIn) {  

  var router = express.Router();

  router.get('/login', passport.authenticate('facebook', { scope: 'email' }));

  router.get('/login/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/restaurants', function(req, res) {
    //query an api for restaurant info
  });

  router.get('/', function(req, res) {
    //query google for google maps stuff
  });

  return router;

};