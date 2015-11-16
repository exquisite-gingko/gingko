(function() {
  'use strict';

  angular.module('app')
  .controller('SearchCtrl', SearchCtrl);

  SearchCtrl.$inject = ['$http', '$q', '$log', '$window', 'homeFactory'];

  function SearchCtrl($http, $q, $log, $window, homeFactory) {
    // TODO: Please verify that this matches the refactored style

    var self = this;
    // below are settings for the md-autocomplete directive
    self.simulateQuery = false;
    self.isDisabled = false;
    // self.restaurant = undefined;
    // $scope.restaurant;
    self.meal = {};
    self.attendees = [1,2,3,4,5,6,7,8,9];
    self.selectedItem = undefined;

    self.querySearch = function(query) {
      var path = '/api/out/yelp';

      return $http({
        url: path + '?term=' + query,
        method: 'GET',
      }).
        then(function(response) {
          self.status = response.status;
          self.iteratee = response.data;
          self.data = [];
          _.each(self.iteratee, function(item) {
            if (!item.is_closed && item.rating && item.name && item.url && item.categories && item.phone && item.location) {
              self.data.push({
                'rating': item.rating,
                'name': item.name,
                'url': item.url,
                'categories': item.categories,
                'phone': item.phone,
                'display_address': item.location.display_address,
                'coordinate': {
                  lat: item.location.coordinate.latitude,
                  lng: item.location.coordinate.longitude
                }
              })
            }
          });
        }, function(response) {
          self.data = response.data || "Request failed";
          self.status = response.status;
          console.log('Error during querySearch.');
        })
        .then(function(response) {
          return self.data;
        })
    };

    self.add = function () {
      //set the restaurant in the factory so it can be packaged in with other user meal data
      // self.meal.restaurant = $scope.restaurant;
      // self.meal.restaurant = self.selectedItem;
      console.log(self.meal);
      // homeFactory.setRest(self.selectedItem);

      /*We might have to merge restaurant info with the rest of user info here
        with something like:
        $scope.meal.restaurant = self.selectedItem
        data: $scope.meal
      */

      // TODO: Hook up functionality to insert selected item into DB.

      // return $http({
      //   method: 'POST',
      //   url: '/api/in/meals',
      //   data: self.selectedItem
      // }).then(function(res) {
      //   // TODO: Need to clear out the selected area after submission
      //   self.selectedItem = '';
      // })
    };

    self.check = function () {
      // console.log(self.restaurant);
      console.log(self.meal);
    }


}
})();
