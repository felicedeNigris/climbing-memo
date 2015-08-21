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
$localStorage, $log, $rootScope, utilsChartSvc, $modal) {

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


  /**
   * Get route color based on type
   *
   * @method getTypeColor
   * @param {Object} Route
   *
   * @return {String} Css color
   */
  $scope.getTypeColor = function(event) {
    return utilsChartSvc.typeColor(event.mainType)
  }

  $scope.getBadgeTooltip = function(event) {
    return (event.isIndoor ? 'Indoor' : 'Outdoor') + ' ' + event.mainType
    console.log(event.isIndoor)
  }

  $scope.getBadgeIcon = function(event) {
    return 'fa ' + (event.isIndoor ? 'fa-home' : 'fa-sun-o')
  }

  /**
  * Open a modal to display route details
  *
  * @method openRouteModal
  */
  $scope.openRouteModal = function(route) {
    $modal.open({
      templateUrl: 'views/routeModal.html',
      controller: 'modalRouteCtrl',
      size: 'lg',
      resolve: {
        route: function() {
          return route
        }
      }
    })
  }

  // Init Controller
  $scope.initController = function(data) {
    var arrayRoutes = _.toArray(data)
    var events = timelineSvc.processData(arrayRoutes)

    $scope.events = events
  }
})
