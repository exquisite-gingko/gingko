// This controller should handle the unique view of a meal page
// Example: http://localhost.com/#/meal/4 (should show the 4th meal)

(function () {
  'use strict';

  angular.module('app')
  .controller('MealCtrl', MealCtrl);

  MealCtrl.$inject = ['$http', '$location', '$window'];

  function MealCtrl($http, $location, $window, Map) {
    var self = this;
    self.id = $location.path();
    self.data;
    var map;

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
        console.log('Get users data is here, resp.data: ', response);
        self.data = response.data;
        console.log(self.data);

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng(self.data.meal.Restaurant.lat, self.data.meal.Restaurant.lng),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(mapCanvas, mapOptions);

      });
    };

    self.activate();

  }

})();
