'use strict'

angular.module('climbingMemo')
.controller('overviewCtrl', function($scope, routesSvc, $localStorage, $log, $rootScope) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    $localStorage.routes = data
    initController(data)
  })
  .error(function() {
    $log.log('Local Storage used - routes')
    initController($localStorage.routes || [])
  })

  $rootScope.$on('routesUpdated', function(event, data) {
    console.log('overview routesUpdated event')
    initController(data)
  })

  // Init Controller
  var initController = function(data) {
    var arrayRoutes = _.toArray(data)
    var arraySectors = arrayGroupBy(arrayRoutes,"sector")
    var arrayTypes = arrayGroupBy(arrayRoutes,"type")

    $scope.routes = arrayRoutes
    $scope.metrics = {
      count: arrayRoutes.length,
      favoriteSector: arraySectors[0],
      favoriteType: arrayTypes[0]
    }

  }
})
