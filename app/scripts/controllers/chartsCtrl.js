'use strict'

angular.module('climbingMemo')
.controller('chartsCtrl', function($scope, $rootScope, utilsRouteSvc) {

  // Get Data
  utilsRouteSvc.getRoutes().then(function(data) {
    $scope.initController(data)
  })

  // Watch Update event
  $rootScope.$on('routesUpdated', function() {
    utilsRouteSvc.getRoutes().then(function(data) {
      $scope.initController(data)
    })
  })

  // Init Controller
  $scope.initController = function(data) {
    $scope.routes = _.toArray(data)
  }
})
