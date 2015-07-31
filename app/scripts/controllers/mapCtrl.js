'use strict'

angular.module('climbingMemo')
.controller('mapCtrl', function(routesSvc, $localStorage, $log, $scope,
$rootScope, utilsChartSvc) {

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
  })

  // Init Controller
  var initController = function(routes) {
    var arrayRoutes = _.toArray(routes)
    var arrayLocations = utilsChartSvc.arrayGroupBy(arrayRoutes,"location")
    var arraySectors = utilsChartSvc.arrayGroupBy(arrayRoutes,"sector")
    var arrayTypes = utilsChartSvc.arrayGroupBy(arrayRoutes,"type")


    // drawMapChart({
    //   data:arrayRoutes,
    //   containerId:'panel-map'
    // })
  }
})
