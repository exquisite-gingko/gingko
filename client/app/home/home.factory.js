
(function() {
  'use strict';

  angular.module('app')
  .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$http'];

    var data = {"title":"Indian","date":"Mon Nov 25 2015 21:00:00 GMT-0800 (PST)",
"time":"Mon Nov 25 2015 21:00:00 GMT-0800 (PST)",
"description":"Time for some Curry",
"restaurant":"Indian Palace",
"address":"44 Haight Street",
"contact":"83638202",
"firstName":"David",
"lastName":"Tsai"};

  function homeFactory($http) {
    var services = {
      
      //activate : activate,
      getMeals : getMeals,
      postMeal: postMeal

    };

    return services;

    // function activate () {
    //   getMeals();
    // }

    function postMeal (d) {
      return $http({
      method: 'POST',
      url: '/api/in/meals',
      data: data
      })
      .then(function (response) {
        console.log('response returned!!');
        return response.data;
      });

    }

    function getMeals () {
      return $http({
      method: 'GET',
      url: '/api/in/meals'
      })
      .then(function (response) {
        console.log(response.data)
        return response.data;
      });
    }


  }

})();

