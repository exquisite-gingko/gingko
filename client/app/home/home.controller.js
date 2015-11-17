(function() {
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  // if factories are needed, inject here
  HomeCtrl.$inject = ['homeFactory'];

  function HomeCtrl(homeFactory) {
    var self = this;

    self.getData = function() {
      //call the factory function
      homeFactory.getMeals()
      .then(function(data) {
        self.events = data;
      });
      
    };

    // self.getData = function() {

    // };

    self.events = [];

    self.getData();

  }

})();
