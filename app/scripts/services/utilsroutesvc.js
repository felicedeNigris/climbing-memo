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
routesSvc, $http, $q) {
  /**
  * Save route - it will calculate the lat long
  *
  * @method saveRoute
  * @param {Object} route
  * @param {Object} routes - list all of routes
  * @return {Object} promise
  */
  this.saveRoute = function(route, routes) {
    var deferred = $q.defer()

    route = JSON.parse(JSON.stringify(route)) // Clone
    route.date= $filter('date')(route.date,'MM/dd/yyyy')

    var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

    $http.get(baseUrl + encodeURIComponent(route.location))
    .then(function(result) {
      var data = result.data
      if (data.status !== 'ZERO_RESULTS') {
        route.latitude = data.results[0].geometry.location.lat
        route.longitude = data.results[0].geometry.location.lng
      }

      if (route.id) { // Update route
        routesSvc.updateRoute(route, route.id)
        .then(function() {
          deferred.resolve('#saveRoute - Success: update route ' + route.id)
          notificationService.success(route.name + ' saved')
          $rootScope.$broadcast('routesUpdated', routes)
        })
        .catch(function() {
          deferred.reject('#saveRoute - Error: update route ' + route.id)
          notificationService.error('Error while saving ' + route.name)
        })
      } else { // Create new route
        routesSvc.addRoute(route)
        .then(function(result) {
          notificationService.success(route.name + ' saved')
          route.id = result.data.name
          routesSvc.updateRoute(route, route.id)
          deferred.resolve('#saveRoute - Success: add new route')

          routes[route.id] = route
          $rootScope.$broadcast('routesUpdated', routes)
        })
        .catch(function() {
          deferred.reject('#saveRoute - Error: add new route')
          notificationService.error('Error while saving ' + route.name)
        })
      }
    })
    .catch(function() {
      deferred.reject('#saveRoute - Error: google map api')
    })

    return deferred.promise
  }

  /**
  * Delete a route
  *
  * @method deleteRoute
  * @param {Object} route
  * @param {Object} routes - list all of routes
  * @return {Object} promise
  */

  this.deleteRoute = function(route, routes) {
    var deferred = $q.defer()

    routesSvc.deleteRoute(route.id)
    .then(function() {
      notificationService.success(route.name + ' deleted')
      deferred.resolve('#deleteRoute - Success: ' + route.id)

      delete routes[route.id]
      $rootScope.$broadcast('routesUpdated', routes)
    })
    .catch(function() {
      deferred.reject('#deleteRoute - Error: ' + route.id)
      notificationService.error('Error while deleting ' + route.name)
    })

    return deferred.promise
  }
});
