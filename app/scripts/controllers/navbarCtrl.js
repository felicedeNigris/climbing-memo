'use strict'

angular.module('climbingMemo')
.controller('navbarCtrl', function($scope, $location, $rootScope,
utilsRouteSvc, $localStorage) {
  $scope.isActive = function(viewLocation) {
    return viewLocation === $location.path()
  }

  $scope.bucketName = $rootScope.bucket || $localStorage.bucket || 'demo'

  /**
   * Refresh routes with selected bucket
   *
   * @method getBucket
   */
  $scope.getBucket = function() {
    var previousBucket = $rootScope.bucket || false
    $rootScope.bucket = $scope.bucketName

    // Force refresh cache routes
    utilsRouteSvc.getRoutes(true).then(function() {
      $localStorage.bucket = $rootScope.bucket
      $rootScope.$broadcast('routesUpdated')
    })
    .catch(function() {
      if (previousBucket) {
        $rootScope.bucket = previousBucket
      }
    })
  }
})
