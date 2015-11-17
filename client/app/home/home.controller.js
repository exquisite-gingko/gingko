(function() {
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  // if factories are needed, inject here
  HomeCtrl.$inject = ['homeFactory', '$state', "$location", "$window"];

  function HomeCtrl(homeFactory, $state, $location, $window) {
    var self = this;

    self.getData = function() {
      //call the factory function
      homeFactory.getMeals()
      .then(function(data) {
        self.events = data;
      });
      
    };

    self.routeToEvent = function() {
      homeFactory.getEvent()
      .then(function(data) {
        console.log('hello');
        // $location.url('/home');
        $window.location.href = "/#/meals/1";
      });
    };

    self.events = [];

    self.getData();



  }

})();
