var request = require("request");
var assert = require('assert');
var Mocha = require('mocha');
var expect = require('chai').expect;
var Sequelize = require("sequelize");
var database = require('./../services/db');

describe("Meals and User Insertion Correct", function() {

  it("Should insert new user to user database", function(done) {
      //ensure that result gives us back expected post, like meal description
    request({method: "POST", uri: "http://127.0.0.1:4568/api/users", json: {name: "Anna"}});
    
    var query = function () {
      database.User.findOne({ firstName: "Anna" })
      .then(function (users) {
        console.log('users return obj in test 1:', users);
        expect(users.name)to.equal('Anna');
      });
    }

  });

  it("Should insert new meal to database", function(done) {
    // request({method: "POST", uri: "http://127.0.0.1:4568/api/users", json: {name: "Anna"}});
    request({method: "POST", uri: "http://127.0.0.1:4568/api/meals", json: {date: new Date(), time: new Date(), attendees: 5, description: "new meal", user: "Anna"}}, function);

    //query the Meals database for where the desciption is "new meal" and check if the attendees is 5
    var query = function () {
      database.Meals.findOne({ description: "new meal" })
      .then(function (users) {
        //check what console.logging
        console.log('meals return object in test 2:', users);
        expect(users.attendees)to.equal(5);
      });
    };

  });

});

describe("Meals and User Insertion Correct", function() {

  it("Should insert new user to user database", function(done) {
      //ensure that result gives us back expected post, like meal description
    request({method: "POST", uri: "http://127.0.0.1:4568/api/users", json: {name: "Anna"}});
    
    var query = function () {
      database.User.findOne({ firstName: "Anna" })
      .then(function (users) {
        console.log('users return obj in test 1:', users);
        expect(users.name)to.equal('Anna');
      });
    }

  });

  it("Should insert new meal to database", function(done) {
    // request({method: "POST", uri: "http://127.0.0.1:4568/api/users", json: {name: "Anna"}});
    request({method: "POST", uri: "http://127.0.0.1:4568/api/meals", json: {date: new Date(), time: new Date(), attendees: 5, description: "new meal", user: "Anna"}}, function);

    //query the Meals database for where the desciption is "new meal" and check if the attendees is 5
    var query = function () {
      database.Meals.findOne({ description: "new meal" })
      .then(function (users) {
        //check what console.logging
        console.log('meals return object in test 2:', users);
        expect(users.attendees)to.equal(5);
      });
    };

  });

});


