'use strict'

angular.module('climbingMemo')
.controller('chartsCtrl', function($scope, routesSvc, $localStorage, $log,
$rootScope, utilsChartSvc, utilsRouteSvc) {

  // Get Data
  utilsRouteSvc.getRoutes().then(function(data) {
    $scope.initController(data)
  })

  $rootScope.$on('routesUpdated', function(event, data) {
    $scope.initController(data)
  })

  // Init Controller
  $scope.initController = function(data) {
    var arrayRoutes = _.toArray(data)
    var arrayTypes = utilsChartSvc.arrayGroupBy(arrayRoutes,"type")

    $scope.routes = arrayRoutes
    $scope.horizontalBarType = arrayTypes[0]
  }
})
