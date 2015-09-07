'use strict'

angular.module('climbingMemo')
.controller('tableCtrl', function($scope, $rootScope, $modal, utilsChartSvc,
utilsRouteSvc) {

  // Global init
  $scope.itemsPerPage = 8 // Match the select box on views

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

  $scope.$on('routesTableVisibility', function(event, visibleRoutes) {
    for (var id in $scope.routes) {
      $scope.routes[id].$visible = _.indexOf(visibleRoutes,$scope.routes[id].id) !== -1
    }
  })

  /**
  * Initialize controller with data
  *
  * @method initController
  * @param {Object} Routes
  */
  $scope.initController = function(data) {
    var count = 0
    _.map(data, function(route, key) {
      route.$visible = count < $scope.itemsPerPage
      route.$date    = route.date
      route.$id      = key
      count++
    })
    $scope.routes = data

    var arrayRoutes    = _.toArray($scope.routes)
    var arrayLocations = utilsChartSvc.arrayGroupBy(arrayRoutes,"location")
    var arraySectors   = utilsChartSvc.arrayGroupBy(arrayRoutes,"sector")

    $scope.locations = arrayLocations
    $scope.sectors   = arraySectors
  }

  /**
   * Get route color based on type
   *
   * @method getTypeColor
   * @param {Object} Route
   *
   * @return {String} Css color
   */
  $scope.getTypeColor = function(route) {
    return utilsChartSvc.typeColor(route.type)
  }

  /**
  * Create a route object in the scope using default values
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

  /**
  * Open a modal to display route details
  *
  * @method openRouteModal
  */
  $scope.openRouteModal = function(route) {
    $modal.open({
      templateUrl: 'views/sliderModal.html',
      controller: 'ModalsliderCtrl',
      size: 'md',
      resolve: {
        routesId: function() {
          return [route.id]

          // TODO load all routes visible in table
          // var routesId = _.pluck($scope.routes, 'id')
          // var routeIndex = _.indexOf(routesId, route.id)
          // return _.slice(routesId, routeIndex, routesId.length).concat(
          //   _.slice(routesId, 0, routeIndex)
          // )
        }
      }
    })
  }

})

