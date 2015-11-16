var express = require('express');
var request = require('request');
var classes = require('./../classes/classes');


module.exports = function(dbController, passport, isLoggedIn) {

  var router = express.Router();

//------------------------------------------------------//
  //posting to the query file which will post to the meals database details of a new event
  router.post('/meals', function(req, res) {

    console.log('--------------in routes', req.body.firstName);
    //make an object of all the values that we need
    var meal = classes.Meal(req.body);
    //if the values are not valid then send err
    if (!meal) {
      res.status(400).send('wrong data passed to routes');
    }
    //else go onto the queries
    dbController.meals.post(meal)
    .then(function(data){
      res.status(200).send(data);
    });
    // .catch(function(err) {
    //   console.log('err posting meal data:', err);
    //   res.status(500).send(err);
    // });
    
  });

//------------------------------------------------------//
  router.get('/meals', function(req, res) {
    //request on loading the main page to see the upcoming meals
    dbController.meals.get(req, res);
  });

  router.post('/meal/join', function(req, res) {
    //user joining an event
    var join = new classes.Join(req.body);

    dbController.user.joinMeal(join)
    .then(function(data) {
      res.status(200).send(data);
    })
    .catch(function(err) {
      console.log('err posting meal data:', err);
      res.status(500).send(err);
    });

  });

//------------------------------------------------------//
  //testing purposes only?? Do not thing that this is relevant to our app currenly
  router.get('/user', function(req, res) {
    //get the user details from the database
    dbController.user.get()
    .then(function(data) {
      res.status(200).send(data);
    })
    .catch(function(err) {
      console.log('err getting user data:', err);
      res.status(500).send(err);
    });

  });


//------------------------------------------------------//
  router.post('/user', function(req, res) {
    
    var newUser = new classes.AddUser(req.body);

    dbController.user.post(newUser)
    .then(function(data) {
      res.status(200).send(data);
    })
    .catch(function(err) {
      console.log('err posting user data:', err);
      res.status(500).send(err);
    });

  });

  return router;

};
