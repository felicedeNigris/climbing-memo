'use strict'

/**
* @ngdoc function
* @name climbingMemo.controller:TimelineCtrl
* @description
* # TimelineCtrl
* Controller of the climbingMemo
*/
angular.module('climbingMemo')
.controller('TimelineCtrl', function($scope, timelineSvc, routesSvc,
$localStorage, $log, $rootScope) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    data = data || {}
    $localStorage.routes = data
    $scope.initController(data)
  })
  .error(function() {
    $log.log('Local Storage used - routes')
    $scope.initController($localStorage.routes || [])
  })

  $rootScope.$on('routesUpdated', function(event, data) {
    $scope.initController(data)
  })

  // Init Controller
  $scope.initController = function(data) {
    var arrayRoutes = _.toArray(data)
    var events = timelineSvc.processData(arrayRoutes)

    $scope.events = events
  }
})
