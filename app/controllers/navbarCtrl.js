'use strict'

angular.module('climbingMemo')
.controller('navbarCtrl', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path()
    }
})
