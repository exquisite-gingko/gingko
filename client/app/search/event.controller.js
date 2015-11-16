(function () {

  function AddCtrl ($scope, homeFactory) {
    $scope.meal = {};
    $scope.attendees = [1,2,3,4,5,6,7,8,9];
    $scope.addMeal = function () {
      // console.log($scope.meal);
      homeFactory.postMeal($scope.meal);
    };
  }

  angular.module('app').controller('AddCtrl', AddCtrl);

})();