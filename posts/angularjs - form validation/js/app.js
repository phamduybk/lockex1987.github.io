var demoApp = angular.module('demoApp', []).controller("RegisterCtrl", ['$scope', function ($scope) {
    $scope.success = false;
    $scope.register = function () {
        $scope.success = true;
    }
}]);