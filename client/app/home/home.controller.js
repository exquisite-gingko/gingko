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
      var dataObj = homeFactory.getMeals();
      // homeFactory.postMeal();

    };

    self.events = [{
        host: 'Bjarke',
        restaurant: 'Nobu',
        Location: '505 Market Street, San Francisco',
        Date: 'November 20, 2015',
        time: '20:30',
        guests: 3
    }];

  }

})();
