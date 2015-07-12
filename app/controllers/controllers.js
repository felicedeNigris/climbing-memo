'use strict'

angular.module('climbingMemo')
.controller('MainController', function($scope) {
  $scope.$on('$viewContentLoaded', function() {
  })
})

angular.module('climbingMemo')
.controller('GeneralController', function($scope, $filter, routesSvc, $http, $modal) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    _.map(data, function(route, key) {
      route.$visible = true
      route.$date = route.date
      route.$id = key
    })
    $scope.routes = data
    initController()
  })

  // Init Controller
  var initController = function() {

    var arrayRoutes = _.toArray($scope.routes)
    var arrayLocations = arrayGroupBy(arrayRoutes,"location")
    var arraySectors = arrayGroupBy(arrayRoutes,"sector")
    var arrayTypes = arrayGroupBy(arrayRoutes,"type")


    drawMapChart({
      data:arrayRoutes,
      containerId:'panel-map'
    })
    drawScatterPlot({
      data:arrayRoutes,
      containerSelector:'#panel-scatter-plot'
    })
    drawCalendarHeatmap({
      data:arrayRoutes,
      cellSize:13,
      containerSelector:'#panel-calendar-heatmap'
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

    $scope.locations = arrayLocations
    $scope.sectors = arraySectors
    $scope.metrics = {
      count: arrayRoutes.length,
      favoriteSector: arraySectors[0],
      favoriteType: arrayTypes[0]
    }

  }

  /**
  * Create a route object in the scope using default values
  *
  * @method addRoute
  */
  $scope.addRoute = function() {

    var createdAt = Date.now()

    // Create incremental ID based on current date
    var id = new Date(4000,0).getTime() - createdAt

    // Set default values
    $scope.routes[id] = {
      '$edit':true,
      '$visible':true,
      '$date':$filter('date')(createdAt,'dd/MM/yyyy'),
      'createdAt': createdAt,
      'status':'Attempt',
      'id': id
    }
  }

  /**
  * Open datepicker when click on an edited route
  *
  * @method openDatepicker
  */
  $scope.openDatepicker = function($event,route) {
    $event.preventDefault()
    $event.stopPropagation()

    $scope.routes[route.id].$datepicker = !route.$datepicker
  }

  /**
  * Save or Create new route when click on done button. It will calculate the
  * lat long and re-init the controller.
  *
  * @method saveRoute
  */
  $scope.saveRoute = function(route) {
    route.$edit = false
    route.date = $filter('date')(route.$date,'dd/MM/yyyy')

    var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

    $http.get(baseUrl + encodeURIComponent(route.location)).success(function(data) {
      if (data.status !== 'ZERO_RESULTS') {
        route.latitude = data.results[0].geometry.location.lat
        route.longitude = data.results[0].geometry.location.lng
      }

      if (route.$id) { // Update route
        routesSvc.updateRoute(route, route.$id)
      } else { // Create new route
        routesSvc.addRoute(route).success(function(data) {
          route.$id = data.name
        })
      }
      initController()
    })
  }

  /**
   * Create a copy of an existing route and let the user edit it
   *
   * @method copyRoute
   */
  $scope.copyRoute = function(route) {
    var newRoute = JSON.parse(JSON.stringify(route)) // Clone
    newRoute.createdAt = Date.now()
    newRoute.$date = $filter('date')(newRoute.createdAt,'dd/MM/yyyy')
    newRoute.$edit = true

    routesSvc.addRoute(newRoute).success(function(data) {
      newRoute.$id = data.name
      $scope.routes[newRoute.$id] = newRoute
      initController()
    })
  }

  /**
  * Delete route from the scope object and re-init controller
  *
  * @method deleteRoute
  */
  $scope.deleteRoute = function(route) {
    delete $scope.routes[route.$id]
    routesSvc.deleteRoute(route.$id)
    initController()
  }

  /**
  * Populate smart default values when a sector is selected
  *
  * @method sectorPopulatePlaceholder
  */
  $scope.sectorPopulatePlaceholder = function(item,route) {

    var arrayRoutes = _.toArray($scope.routes)
    arrayRoutes = arrayRoutes.filter(function(n) { return n.sector === item })

    var properties = ['type','rock','location']

    for (var i=0 ; i < properties.length ; i++) {
      var property = properties[i]
      if (!route.hasOwnProperty(property)) {
        route[property] = arrayGroupBy(arrayRoutes,property)[0]
      }
    }
  }

  /**
  * Open a modal to display route details
  *
  * @method openRouteModal
  */
  $scope.openRouteModal = function(route) {
    $modal.open({
      templateUrl: 'app/partials/routeModal.html',
      controller: 'modalRouteController',
      size: 'lg',
      resolve: {
        route: function() {
          return route
        }
      }
    })
  }

})

angular.module('climbingMemo')
.controller('modalRouteController', function($scope, $modalInstance, route, routesSvc) {

  $scope.route = route

  /**
   * Save the route after editing the note on the modal
   *
   * @method saveRoute
   */
  $scope.saveRoute = function(route) {
    route.$editNotes = false
    routesSvc.updateRoute(route, route.$id)
  }

  /**
  * Close the modal
  *
  * @method closeModal
  */
  $scope.closeModal = function() {
    $modalInstance.dismiss('cancel')
  }

})
