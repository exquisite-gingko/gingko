// Dependency injections should happen here!
// TODO: Please add 'tablesurfer.services' once services have been created

angular.module('tablesurfer', [
  'ui.router',
  'ngMaterial'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/home.html'
      // controller: 'HomeController' FIXME: Need a home controller
    })
})
