'use strict'

angular.module('climbingMemo')
.controller('mapCtrl', function(routesSvc) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    initController(data)
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
