// This controller should handle the unique view of a meal page
// Example: http://localhost.com/#/meal/4 (should show the 4th meal)

(function () {
  'use strict';

  angular.module('app')
  .controller('MealCtrl', MealCtrl);

  MealCtrl.$inject = ['$http', '$location', '$window'];

  function MealCtrl() {
    var self = this;
    self.id = $location.path;

    self.getMeal = function() {
      var path = '/api/in/meals';
      console.log('Getting users from DB, path is: ', path + $location.path());
      return $http({
        url: path + $location.path(),
        method: 'GET'
      })
      .then(function(response) {
        console.log('Get users data is here, resp.data: ', response.data);
        cb(response.data);
      });
    }

    self.getMeal();

  }

})();
