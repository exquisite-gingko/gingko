var request = require("request");
var assert = require('assert');
var Mocha = require('mocha');
var expect = require('chai').expect;
var Sequelize = require("sequelize");

describe("Meal Database", function() {

  it("Should insert new meal to database", function(done) {
    // Post the user to the chat server.
    //make post request, inserting new meal
    //query database
      //ensure that result gives us back expected post, like meal description
    request({method: "POST", uri: "http://127.0.0.1:4568/api/users", json: {name: "Anna"}});
    request({method: "POST", uri: "http://127.0.0.1:4568/api/meals", json: {date: new Date(), time: new Date(), attendees: 5, description: "new meal", user: "Anna"}}, function);

    //

    //expect(results.length).to.equal(1);
  });

});

describe("User Database", function() {

  it("Should insert new user to database", function(done) {
    // Post the user to the chat server.
    //make post request, inserting new meal
    //query database
      //ensure that result gives us back expected post, like meal description
    request({method: "POST", uri: "http://127.0.0.1:4568/api/users", json: {name: "Anna"}});
    request({method: "POST", uri: "http://127.0.0.1:4568/api/meals", json: {date: new Date(), time: new Date(), attendees: 5, description: "new meal", user: "Anna"}}, function);

    //

    //expect(results.length).to.equal(1);
  });

});