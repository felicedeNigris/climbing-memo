'use strict'

angular.module('climbingMemo')
.controller('climbsCtrl', function($scope, $filter, routesSvc, $http, $rootScope,
$modal, notificationService, $localStorage, $log, utilsChartSvc) {

  // Get Data
  routesSvc.getRoutes().success(function(data) {
    $localStorage.routes = data
    initController(data)
  })
  .error(function() {
    $log.log('Local Storage used - routes')
    initController($localStorage.routes || [])
  })

  $rootScope.$on('routesUpdated', function(event, data) {
    initController(data)
  })

  // Init Controller
  var initController = function(data) {
    _.map(data, function(route, key) {
      route.$visible = true
      route.$date    = route.date
      route.$id      = key
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
    // TODO will do that later
    // I'm working here

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

      $rootScope.$broadcast('routesUpdated', $scope.routes)

      if (route.$id) { // Update route
        routesSvc.updateRoute(route, route.$id)
        .success(function() {
          notificationService.success(route.name + ' saved')
        })
        .error(function() {
          notificationService.error('Error while saving ' + route.name)
        })
      } else { // Create new route
        routesSvc.addRoute(route)
        .success(function(data) {
          route.$id = data.name
          notificationService.success(route.name + ' saved')
        })
        .error(function() {
          notificationService.error('Error while saving ' + route.name)
        })

      }
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
    newRoute.name= route.name + ' (Copy)'
    newRoute.$date = $filter('date')(newRoute.createdAt,'dd/MM/yyyy')
    newRoute.$edit = true

    routesSvc.addRoute(newRoute).success(function(data) {
      newRoute.$id = data.name
      $scope.routes[newRoute.$id] = newRoute
    })
  }

  /**
  * Delete route from the scope object and re-init controller
  *
  * @method deleteRoute
  */
  $scope.deleteRoute = function(route) {
    delete $scope.routes[route.$id]
    $rootScope.$broadcast('routesUpdated', $scope.routes)

    routesSvc.deleteRoute(route.$id)
    .success(function() {
      notificationService.success(route.name + ' deleted')
    })
    .error(function() {
      notificationService.error('Error while deleting ' + route.name)
    })

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
        route[property] = utilsChartSvc.arrayGroupBy(arrayRoutes,property)[0]
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

})

