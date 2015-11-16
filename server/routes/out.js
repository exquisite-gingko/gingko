var express = require('express');
var _ = require('lodash');
var request = require('request');
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var qs = require('querystring');
var Promise = require('bluebird');

var auth = require('../services/auth.js');

var request_yelp = function(set_parameters, callback) {
  // set_parameters: object with params to search
  // callback: callback(error, response, body)
  var httpMethod = 'GET';
  var url = 'http://api.yelp.com/v2/search';

  var default_parameters = {
    location: 'San+Francisco',
    sort: '0'
  };

  var required_parameters = {
    oauth_consumer_key : auth.oauth.consumer_key,
    oauth_token : auth.oauth.token,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

  // parameters combined in order of importance
  var parameters = _.assign(default_parameters, set_parameters, required_parameters);

  var consumerSecret = auth.yelp.consumerSecret;
  var tokenSecret = auth.yelp.tokenSecret;

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});
  parameters.oauth_signature = signature;
  var paramURL = qs.stringify(parameters);
  var apiURL = url+'?'+paramURL;

  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });

};

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

  router.get('/yelp', function(req, res) {
    // set Yelp Search API params
    var params = {
      term: req.query.term,
      limit: "10"
    };

    request_yelp(params, function(error, response, body) {
      if (error) {
        console.log("Error hitting Yelp's Search API: ");
      } else {
        res.send(JSON.parse(body).businesses);
      }
    })
  });

  router.get('/', function(req, res) {
    //query google for google maps stuff
  });

  return router;

};
