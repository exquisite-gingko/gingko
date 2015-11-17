// This controller should handle the unique view of a meal page
// Example: http://localhost.com/#/meal/4 (should show the 4th meal)

(function () {
  'use strict';

  angular.module('app')
  .controller('MealCtrl', MealCtrl);

  MealCtrl.$inject = ['$http', '$location', '$window'];

  function MealCtrl($http, $location, $window) {
    var self = this;
    self.id = $location.path();


    self.activate = function() {
      self.getMeal();
    };

    self.getMeal = function() {
      var path = '/api/in';
      console.log('Getting users from DB, path is: ', path + $location.path());
      return $http({
        method: 'GET',
        url: path + $location.path()
      })
      .then(function(response) {
        console.log(' ******** RESPONSE RETURNED **********');
        console.log('Get users data is here, resp.data: ', response.data);
      });
    };

    self.activate();

  }

})();
