'use strict'

angular.module('climbingMemo')
.controller('navbarCtrl', function($scope, $location, appcache, $log, $route) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path()
    }

    appcache.checkUpdate()
    .then(function() {
      $log.log('Appcache update downloaded')
      $route.reload()
    })
})
