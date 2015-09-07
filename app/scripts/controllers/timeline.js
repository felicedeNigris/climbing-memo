'use strict'

/**
* @ngdoc function
* @name climbingMemo.controller:TimelineCtrl
* @description
* # TimelineCtrl
* Controller of the climbingMemo
*/
angular.module('climbingMemo')
.controller('TimelineCtrl', function($scope, timelineSvc,
$localStorage, $log, $rootScope, $modal, utilsRouteSvc) {

  // Get Data
  utilsRouteSvc.getRoutes().then(function(data) {
    $scope.initController(data)
  })

  $rootScope.$on('routesUpdated', function(event, data) {
    $scope.initController(data)
  })


  /**
  * Get route color based on type
  *
  * @method getTypeColor
  * @param {Object} Route
  *
  * @return {String} Css color
  */
  $scope.getTypeColor = function(event) {
    return utilsRouteSvc.getTypeColor({type: event.mainType})
  }

  /**
  * Get tooltip text based on rock type
  *
  * @method getBadgeTooltip
  * @param {Boolean} event
  * @return {String}
  */
  $scope.getBadgeTooltip = function(event) {
    return (event.isIndoor ? 'Indoor' : 'Outdoor') + ' ' + event.mainType
  }

  /**
  * Get icon based on rock type
  *
  * @method getBadgeIcon
  * @param {Boolean} event
  * @return {String}
  */
  $scope.getBadgeIcon = function(event) {
    return 'fa ' + (event.isIndoor ? 'fa-home' : 'fa-sun-o')
  }

  /**
  * Open a modal to display routes details
  *
  * @method openRouteModal
  * @param {Object} route - First route to display
  * @param {Array} routes - All routes in slider
  */
  $scope.openRouteModal = function(route, routes) {
    $modal.open({
      templateUrl: 'views/sliderModal.html',
      controller: 'ModalsliderCtrl',
      size: 'md',
      resolve: {
        routesId: function() {
          var routesId = _.pluck(routes, 'id')
          var routeIndex = _.indexOf(routesId, route.id)
          return _.slice(routesId, routeIndex, routesId.length).concat(
            _.slice(routesId, 0, routeIndex)
          )
        }
      }
    })
  }

  /**
  * Open a modal to add a route
  *
  * @method addRoute
  */
  $scope.addRoute = function() {
    $modal.open({
      templateUrl: 'views/_modalAddRoute.html',
      controller: 'ModaladdrouteCtrl',
      size: 'md'
    })
  }

  // Init Controller
  $scope.initController = function(data) {
    var arrayRoutes = _.toArray(data)
    var events = timelineSvc.processData(arrayRoutes)

    $scope.events = events
  }
})
