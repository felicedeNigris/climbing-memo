'use strict'

angular.module('climbingMemo')
.controller('mapCtrl', function($localStorage, $log, $scope,
$rootScope, mapChartSvc, utilsRouteSvc) {

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

  /**
  * Initialize map controller
  *
  * @method initController
  * @param {Object} routes
  */
  $scope.initController = function(routes) {
    $scope.offline = !$rootScope.online

    var arrayRoutes = _.toArray(routes)
    var arrayLocations = mapChartSvc.processData(arrayRoutes)

    _.map(arrayLocations, function(site) {
      site.options = {
        icon: 'images/' + $scope.getMarkerIcon(site.metrics[0].type)
      }
      return site
    })

    $scope.locations = arrayLocations
    $scope.map = { center: { latitude: 37.7833, longitude: -122.4167 }, zoom: 8 }
  }

  /**
  * Get marker icon based on route type
  *
  * @method getMarkerIcon
  * @param {String} type
  * @return {String}
  */
  $scope.getMarkerIcon = function(type) {
    var markerIcon = ''

    switch (type) {
      case 'Sport lead':   markerIcon = 'climbing_yellow.png' ; break
      case 'Boulder':      markerIcon = 'climbing_blue.png'   ; break
      case 'Traditional':  markerIcon = 'climbing_green.png'  ; break
      case 'Multi-pitch':  markerIcon = 'climbing_orange.png' ; break
      case 'Top rope':     markerIcon = 'climbing_gray.png'   ; break
      default:             markerIcon = 'climbing_gray.png'   ; break
    }
    return markerIcon
  }
})
