'use strict'

angular.module('climbingMemo')
.controller('overviewCtrl', function($scope, routesSvc, $localStorage, $log,
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
    var arraySectors = utilsChartSvc.arrayGroupBy(arrayRoutes,"sector")
    var arrayTypes = utilsChartSvc.arrayGroupBy(arrayRoutes,"type")

    $scope.routes = arrayRoutes
    $scope.metrics = {
      count: arrayRoutes.length,
      favoriteSector: arraySectors[0],
      favoriteType: arrayTypes[0]
    }
  }
})
