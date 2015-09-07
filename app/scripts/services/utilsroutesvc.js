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
  * @return {Object} promise - resolve as id or false
  */
  this.saveRoute = function(route) {
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
          deferred.resolve(route.id)
          notificationService.success(route.name + ' saved')
        })
        .catch(function() {
          deferred.reject(false)
          notificationService.error('Error while saving ' + route.name)
        })
      } else { // Create new route
        routesSvc.addRoute(route)
        .then(function(result) {
          notificationService.success(route.name + ' saved')
          route.id = result.data.name
          routesSvc.updateRoute(route, route.id)
          deferred.resolve(route.id)
        })
        .catch(function() {
          deferred.reject(false)
          notificationService.error('Error while saving ' + route.name)
        })
      }
    })
    .catch(function() {
      deferred.reject(false)
    })

    return deferred.promise
  }

  /**
  * Delete a route
  * @method deleteRoute
  * @param {Object} route
  * @return {Object} promise - route id or false
  */

  this.deleteRoute = function(route) {
    var deferred = $q.defer()

    routesSvc.deleteRoute(route.id)
    .then(function() {
      notificationService.success(route.name + ' deleted')
      deferred.resolve(route.id)
    })
    .catch(function() {
      deferred.reject(false)
      notificationService.error('Error while deleting ' + route.name)
    })

    return deferred.promise
  }
});
