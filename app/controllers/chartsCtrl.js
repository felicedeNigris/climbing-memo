'use strict'

angular.module('climbingMemo')
.controller('chartsCtrl', function($scope, routesSvc, $localStorage, $log) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    $localStorage.routes = data
    initController(data)
  })
  .error(function() {
    $log.log('Local Storage used - routes')
    initController($localStorage.routes || [])
  })

  // Init Controller
  var initController = function(data) {
    var arrayRoutes = _.toArray(data)
    var arrayTypes = arrayGroupBy(arrayRoutes,"type")

    drawScatterPlot({
      data:arrayRoutes,
      containerSelector:'#panel-scatter-plot'
    })
    drawVerticalBar({
      data:arrayRoutes,
      containerSelector:'#panel-vertical-chart'
    })
    drawHorizontalBar({
      data:arrayRoutes,
      type: arrayTypes[0],
      containerSelector:'#panel-horizontal-chart'
    })

    $scope.routes = arrayRoutes
    $scope.metrics = {
      favoriteType: arrayTypes[0]
    }
  }
})
