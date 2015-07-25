'use strict'

angular.module('climbingMemo')
.controller('mapCtrl', function(routesSvc, $localStorage, $log, $scope, $rootScope) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    $localStorage.routes = data
    initController(data)
  })
  .error(function() {
    $scope.offline = true
    $log.log('Map Offline mode')
  })

  $rootScope.$on('routesUpdated', function(event, data) {
    initController(data)
    console.log('map routesUpdated event')
  })

  // Init Controller
  var initController = function(routes) {
    console.log('map initController')
    var arrayRoutes = _.toArray(routes)
    var arrayLocations = arrayGroupBy(arrayRoutes,"location")
    var arraySectors = arrayGroupBy(arrayRoutes,"sector")
    var arrayTypes = arrayGroupBy(arrayRoutes,"type")


    drawMapChart({
      data:arrayRoutes,
      containerId:'panel-map'
    })
  }
})
