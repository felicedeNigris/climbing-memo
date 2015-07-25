'use strict'

angular.module('climbingMemo')
.controller('chartsCtrl', function($scope, routesSvc, $localStorage, $log, $rootScope) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    $localStorage.routes = data
    initController(data)
  })
  .error(function() {
    $log.log('Local Storage used - routes')
    initController($localStorage.routes || [])
  })

  // Watch for routes updates
  $rootScope.$watch('routes', initController, true)

  // Init Controller
  var initController = function(data) {
    var arrayRoutes = _.toArray(data)
    var arrayTypes = arrayGroupBy(arrayRoutes,"type")

    $scope.routes = arrayRoutes
    $scope.horizontalBarType = arrayTypes[0]
    $scope.metrics = {
      favoriteType: arrayTypes[0]
    }
  }
})
