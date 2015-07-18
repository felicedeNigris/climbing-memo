'use strict'

angular.module('climbingMemo')
.controller('chartsCtrl', function($scope, routesSvc) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    initController(data)
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

    $scope.metrics = {
      favoriteType: arrayTypes[0]
    }
  }
})
