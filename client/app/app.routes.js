(function() {
  // using 'use strict' will prevent variable declaration errors
  'use strict';

  angular.module('tablesurfer')
  .config(config);

  // dependencies are injected here, when placed in array it protects against minification
  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      });
      // TODO: remove above semicolon to add more routes
  }

})();
