'use strict'

angular.module('climbingMemo')
.controller('mapCtrl', function($localStorage, $log, $scope,
$rootScope, mapChartSvc, utilsRouteSvc) {

  // Get Data
  utilsRouteSvc.getRoutes().then(function(data) {
    $scope.initController(data)
  })

  $rootScope.$on('routesUpdated', function(event, data) {
    $scope.initController(data)
  })

  // Init Controller
  $scope.initController = function(routes) {
    $scope.offline = !$rootScope.online

    var arrayRoutes = _.toArray(routes)
    var arrayLocations = mapChartSvc.processData(arrayRoutes)

    _.map(arrayLocations, function(site) {
			var markerIcon = "climbing_gray.png"
			switch (site.metrics[0].type) {
				case 'Sport lead':	markerIcon = "climbing_yellow.png"; break
				case 'Boulder':		markerIcon = "climbing_blue.png"; break
				case 'Traditional':	markerIcon = "climbing_green.png"; break
				case 'Multi-pitch':	markerIcon = "climbing_orange.png"; break
				case 'Top rope':	markerIcon = "climbing_gray.png"; break
			}
      site.options = {
        icon: 'images/' + markerIcon
      }
      return site
    })

    $scope.locations = arrayLocations
    $scope.map = { center: { latitude: 37.7833, longitude: -122.4167 }, zoom: 8 }
  }
})
