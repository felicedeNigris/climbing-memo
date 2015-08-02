'use strict'

angular.module('climbingMemo')
.controller('chartsCtrl', function($scope, routesSvc, $localStorage, $log,
$rootScope, utilsChartSvc) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    data = data || {}
    $localStorage.routes = data
    initController(data)
  })
  .error(function() {
    $log.log('Local Storage used - routes')
    initController($localStorage.routes || [])
  })

  $rootScope.$on('routesUpdated', function(event, data) {
    initController(data)
  })

  // Init Controller
  var initController = function(data) {
    var arrayRoutes = _.toArray(data)
    var arrayTypes = utilsChartSvc.arrayGroupBy(arrayRoutes,"type")

    $scope.routes = arrayRoutes
    $scope.horizontalBarType = arrayTypes[0]
    $scope.metrics = {
      favoriteType: arrayTypes[0]
    }
  }
})
