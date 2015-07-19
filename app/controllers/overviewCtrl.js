'use strict'

angular.module('climbingMemo')
.controller('overviewCtrl', function($scope, routesSvc) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    initController(data)
  })

  // Init Controller
  var initController = function(data) {
    var arrayRoutes = _.toArray(data)
    var arraySectors = arrayGroupBy(arrayRoutes,"sector")
    var arrayTypes = arrayGroupBy(arrayRoutes,"type")

    drawCalendarHeatmap({
      data:arrayRoutes,
      cellSize:13,
      containerSelector:'#panel-calendar-heatmap'
    })

    $scope.routes = arrayRoutes
    $scope.metrics = {
      count: arrayRoutes.length,
      favoriteSector: arraySectors[0],
      favoriteType: arrayTypes[0]
    }

  }
})
