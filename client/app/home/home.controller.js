(function() {
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  // if factories are needed, inject here
  HomeCtrl.$inject = ['homeFactory', '$state', "$location", "$window"];

  function HomeCtrl(homeFactory, $state, $location, $window) {
    var self = this;

    self.getData = function() {
      //call the factory function to get all of the meals
      homeFactory.getMeals()
      .then(function(data) {
        self.events = data;
      });
      
    };

    self.routeToEvent = function() {

      homeFactory.getEvent()
      .then(function(data) {
        console.log('hello');
        //this badly written function is to manually routoe to the meail of id one(written in a last minute panic to try and get it working)
        //it would be better to change the viw using ui-sref? in the view and then from 
        //that controller call the function to get the correct data from the database!
        $window.location.href = "/#/meals/1";
      });
    };

    self.events = [];

    self.getData();



  }

})();
