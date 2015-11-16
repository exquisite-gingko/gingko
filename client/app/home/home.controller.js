(function() {
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  // if factories are needed, inject here
  HomeCtrl.$inject = ['homeFactory'];

  function HomeCtrl(homeFactory) {
    var self = this;

    self.postData = function() {
      //call the factory function
      homeFactory.postMeal();
    };

    // Bjarke's demo data included here, repeated data should be moved to factory file
  //   self.events = [
  //     {
  //       host: 'Bjarke',
  //       restaurant: 'Nobu',
  //       Location: '505 Market Street, San Francisco',
  //       Date: 'November 20, 2015',
  //       time: '20:30',
  //       guests: 3
  //     },
  //     {
  //       host: 'Anna',
  //       restaurant: 'Hakasan',
  //       Location: '100 Market Street, San Francisco',
  //       Date: 'November 16, 2015',
  //       time: '19:30',
  //       guests: 3
  //     },
  //     {
  //       host: 'Aaron',
  //       restaurant: 'Noma',
  //       Location: '200 Market Street, San Francisco',
  //       Date: 'November 15, 2015',
  //       time: '18:00',
  //       guests: 3
  //     },
  //     {
  //       host: 'David',
  //       restaurant: 'McDonalds',
  //       Location: '400 Market Street, San Francisco',
  //       Date: 'November 18, 2015',
  //       time: '17:00',
  //       guests: 9
  //     }
  //   ];

  }

})();
