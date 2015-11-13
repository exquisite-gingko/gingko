var Promise = require('bluebird');
var request = Promise.promisifyAll(require("request"));
var assert = require('assert');
var Mocha = require('mocha');
var expect = require('chai').expect;

describe("Meals and user insertion to database successful", function() {

  it("Should insert new user to user database", function() { //no argument needed here bluebird thing when using mocha
    //remember to return the promise inside- if all corrct the test will pass if not then the test will fail and no catch needed

    return requestAsync({method: "POST", uri: "http://127.0.0.1:4568/api/users", json: {firstName: "Anna", lastName: "Rogers"}})
    .then(function (data) {
      //CHECK DATA OBJECTS PROPERTIES
      expect(data.firstName).to.equal("Anna");
    });
    
  });

  // it("Should insert new meal to database", function(done) {
  //   // request({method: "POST", uri: "http://127.0.0.1:4568/api/users", json: {name: "Anna"}});
  //   request({method: "POST", uri: "http://127.0.0.1:4568/api/meals", json: {date: new Date(), time: new Date(), attendees: 5, description: "new meal", user: "Anna"}}, function);

  //   //query the Meals database for where the desciption is "new meal" and check if the attendees is 5
  //   var query = function () {
  //     database.Meals.findOne({ description: "new meal" })
  //     .then(function (users) {
  //       //check what console.logging
  //       console.log('meals return object in test 2:', users);
  //       expect(users.attendees).to.equal(5);
  //     });
  //   };
    // }

});





