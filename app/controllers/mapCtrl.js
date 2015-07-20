'use strict'

angular.module('climbingMemo')
.controller('mapCtrl', function(routesSvc, $localStorage, $log, $scope) {
  $scope.offline = true

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    $localStorage.routes = data
    $scope.offline = false
    initController(data)
  })
  .error(function() {
    $log.log('Map Offline mode')
  })

  // Init Controller
  var initController = function(routes) {
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
