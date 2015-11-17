// Placeholder for any sort of search factory
(function() {
  'use strict';

  angular.module('app')
  .factory('searchFactory', searchFactory);

  searchFactory.$inject = ['$http', '$window'];

  function searchFactory($http, $window) {
    var services = {

      activate : activate,
      postMeal : postMeal

    };

    return services;

    function activate () {
      postMeal();
    }

    function postMeal (data) {
      console.log(data);
      return $http({
        method: 'POST',
        url: '/api/in/meals',
        data: data
      })
      .then(function (response) {
        console.log("successfully posted!");
        return response.data;
      });
    }
  }


})();