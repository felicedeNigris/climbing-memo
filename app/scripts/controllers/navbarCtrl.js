'use strict'

angular.module('climbingMemo')
.controller('navbarCtrl', function($scope, $location, $rootScope,
utilsRouteSvc, $localStorage, notificationService) {
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
    var previousBucket = $rootScope.bucket || $localStorage.bucket || 'demo'

    // 1. Check if offline routes unsync
    if (_.find($localStorage.routes, function(localRoute) {
      return angular.isDefined(localRoute.$sync)
    })) {
      notificationService.notice('Event(s) unsync: Please sync them first')
    } else {
      // 2. Change bucket
      $rootScope.bucket = $scope.bucketName

      // 3. Force refresh cache routes & render
      utilsRouteSvc.getRoutes(true).then(function() {
        $localStorage.bucket = $rootScope.bucket
        $rootScope.$broadcast('routesUpdated')
      })
      .catch(function() {
        $rootScope.bucket = previousBucket
        $scope.bucketName = previousBucket
      })
    }
  }
})
