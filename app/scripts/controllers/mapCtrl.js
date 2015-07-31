'use strict'

angular.module('climbingMemo')
.controller('mapCtrl', function(routesSvc, $localStorage, $log, $scope,
$rootScope, mapChartSvc) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    $localStorage.routes = data
    initController(data)
  })
  .error(function() {
    $scope.offline = true
    $log.log('Map Offline mode')
  })

  $rootScope.$on('routesUpdated', function(event, data) {
    initController(data)
  })

  // Init Controller
  var initController = function(routes) {
    var arrayRoutes = _.toArray(routes)
    var arrayLocations = mapChartSvc.getMapChartData(arrayRoutes)

    _.map(arrayLocations, function(site) {
			var markerIcon = "climbing_gray.png";
			switch (site.metrics[0].type) {
				case 'Sport lead':	markerIcon = "climbing_yellow.png"; break;
				case 'Boulder':		markerIcon = "climbing_blue.png"; break;
				case 'Traditional':	markerIcon = "climbing_green.png"; break;
				case 'Multi-pitch':	markerIcon = "climbing_orange.png"; break;
				case 'Top rope':	markerIcon = "climbing_gray.png"; break;
			}
      site.options = {
        icon: 'images/' + markerIcon
      }
      return site
    })
    console.log(arrayLocations);

    $scope.locations = arrayLocations
    $scope.map = { center: { latitude: 37.7833, longitude: -122.4167 }, zoom: 8 }
  }
})
