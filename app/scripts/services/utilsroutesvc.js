'use strict';

/**
* @ngdoc service
* @name climbingMemo.utilsRouteSvc
* @description
* # utilsRouteSvc
* Service in the climbingMemo.
*/
angular.module('climbingMemo')
.service('utilsRouteSvc', function ($filter, notificationService, $rootScope,
routesSvc, $http) {
  /**
  * Save route - it will calculate the lat long
  * TODO return promise
  *
  * @method saveRoute
  * @param {Object} route
  * @param {Object} routes - list all of routes
  */
  this.saveRoute = function(route, routes) {
    route = JSON.parse(JSON.stringify(route)) // Clone
    route.date= $filter('date')(route.date,'MM/dd/yyyy')

    var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

    $http.get(baseUrl + encodeURIComponent(route.location)).success(function(data) {
      if (data.status !== 'ZERO_RESULTS') {
        route.latitude = data.results[0].geometry.location.lat
        route.longitude = data.results[0].geometry.location.lng
      }

      if (route.id) { // Update route
        routesSvc.updateRoute(route, route.id)
        .success(function() {
          notificationService.success(route.name + ' saved')
          $rootScope.$broadcast('routesUpdated', routes)
        })
        .error(function() {
          notificationService.error('Error while saving ' + route.name)
        })
      } else { // Create new route
        routesSvc.addRoute(route)
        .success(function(data) {
          notificationService.success(route.name + ' saved')
          route.id = data.name
          routesSvc.updateRoute(route, route.id)

          routes[route.id] = route
          $rootScope.$broadcast('routesUpdated', routes)
        })
        .error(function() {
          notificationService.error('Error while saving ' + route.name)
        })
      }

    })
  }

  /**
  * Delete a route
  * TODO return promise
  *
  * @method deleteRoute
  * @param {Object} route
  * @param {Object} routes - list all of routes
  */

  this.deleteRoute = function(route, routes) {
    debugger
    routesSvc.deleteRoute(route.id)
    .success(function() {
      notificationService.success(route.name + ' deleted')
      delete routes[route.id]
      $rootScope.$broadcast('routesUpdated', routes)
    })
    .error(function() {
      notificationService.error('Error while deleting ' + route.name)
    })
  }
});
