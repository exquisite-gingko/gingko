// Placeholder for any sort of search factory
(function() {
  'use strict';

  angular.module('app')
  .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$http'];

  var restaurant;

  function homeFactory($http) {
    var services = {

      activate : activate,
      postMeal : postMeal,
      setRest : setRest

    };

    return services;

    function setRest (data) {
      restaurant = data;
      console.log(restaurant);
    }

    function activate () {
      postMeal();
    }

    function postMeal (data) {
      //merge 
      data.restaurant = restaurant;
      console.log(data);
      // return $http({
      //   method: 'POST',
      //   url: '/api/in/meals',
      //   data: data
      // })
      // .then(function (response) {
      //   console.log('response returned!!');
      //   return response.data;
      // });
    }
  }


})();