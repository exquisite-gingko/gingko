(function () {

  function AddCtrl ($scope) {
    $scope.user = {};
    $scope.attendees = [1,2,3,4,5,6,7,8,9];
  }

  angular.module('app').controller('AddCtrl', AddCtrl);

})();