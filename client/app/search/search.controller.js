(function() {
  'use strict';

  angular.module('app')
  .controller('SearchCtrl', SearchCtrl);

  SearchCtrl.$inject = ['$http', '$q', '$log', '$window'];

  function SearchCtrl($http, $q, $log, $window) {
    // TODO: Please verify that this matches the refactored style

    var self = this;
    // below are settings for the md-autocomplete directive
    self.simulateQuery = false;
    self.isDisabled = false;
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
            if (!item.is_closed && item.rating && item.name && item.url && item.categories && item.phone && item.location.display_address) {
              self.data.push({
                'rating': item.rating,
                'name': item.name,
                'url': item.url,
                'categories': item.categories,
                'phone': item.phone,
                'display_address': item.location.display_address,
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
    }

    self.add = function () {
      return $http({
        method: 'POST',
        url: '/api/books',
        data: self.selectedItem
      }).then(function(res) {
        // TODO: Need to clear out the selected area after submission
        self.selectedItem = '';
      })
    }
}
})();

/** Yelp API Info below

Consumer key
TAPaLdRaLTExD0vJ18UMtA

Consumer Secret
Msd-D6cB8c33A-o_ahKYgU-kGHc

Token	1vsO2vfZr6MMWdSpWKZGXsgoX2jaXHbJ

Token Secret
s2KdohduLvVsarrrJNFilKfoFe8

**/
