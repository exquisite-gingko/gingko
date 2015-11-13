(function() {
  'use strict';

  angular.module('app')
  .controller('SearchCtrl', SearchCtrl);

  SearchCtrl.$inject = ['$http', '$q', '$log', '$window'];

  function SearchCtrl() {
    // TODO: Please verify that this matches the refactored style
    
    var self = this;
    // below are settings for the md-autocomplete directive
    self.simulateQuery = false;
    self.isDisabled = false;
    self.selectedItem = undefined;

    self.querySearch = function(query) {
      // var key = '&key=AIzaSyApeZQpRsdiKL3exCpZtFAsuRdRtHkti70';
      // var booksUrl = 'https://www.googleapis.com/books/v1/volumes?printType=books&q=' + query + key;

      // FIXME: See Yelp API info below

      return $http({method: 'GET', url: yelpURL}).
        then(function(response) {
          self.status = response.status;
          self.iteratee = response.data.items;
          self.data = [];
          _.each(self.iteratee, function(item) {
            // if (item.volumeInfo.title && item.volumeInfo.authors && item.volumeInfo.industryIdentifiers && item.volumeInfo.imageLinks.thumbnail && item.volumeInfo.publishedDate ) {
              self.data.push({
                // 'title': item.volumeInfo.title,
                // 'author': item.volumeInfo.authors,
                // 'isbn': item.volumeInfo.industryIdentifiers,
                // 'image': item.volumeInfo.imageLinks.thumbnail,
                // 'publishdate': item.volumeInfo.publishedDate
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
