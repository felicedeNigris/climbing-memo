'use strict'

angular.module('climbingMemo')
.factory('routesSvc', function routeSvc($http, DATABASE_URL, $rootScope,
$localStorage) {
  var routeFactory = {}

  /**
  * Dynamically generate database URL and save bucket name
  *
  * @return {String}
  */
  routeFactory.getBaseUrl = function() {
    var bucket = $rootScope.bucket || $localStorage.bucket || 'demo'
    return DATABASE_URL + bucket + '/routes'
  }

  /**
  * Remove properties starting with "$" sign
  *
  * @param {Object} object
  * @return {Object}
  */
  routeFactory.cleanObjectProperties = function(object) {
    var cleanedObject = JSON.parse(JSON.stringify(object)) // Clone

    _.keys(cleanedObject)
    .filter(function(key) { return key.match(/^\$/) })
    .forEach(function(key) { delete cleanedObject[key] })

    return cleanedObject
  }

  /**
   * Request a route from database
   *
   * @param {String} id
   * @return {Object} promise
   */
  routeFactory.getRoute = function(id) {
    return $http.get(routeFactory.getBaseUrl() + '/' + id + '.json')
  }

  /**
  * Request all routes from database
  *
  * @return {Object} promise
  */
  routeFactory.getRoutes = function() {
    return $http.get(routeFactory.getBaseUrl() + '.json')
  }

  /**
  * Add a route to the database
  *
  * @param {Object} route
  * @return {Object} promise
  */
  routeFactory.addRoute = function(route) {
    var cleanedRoute = routeFactory.cleanObjectProperties(route)

    return $http.post(routeFactory.getBaseUrl() + '/.json', cleanedRoute)
  }

  /**
  * Delete a route from database
  *
  * @param {Object} route
  * @return {Object} promise
  */
  routeFactory.deleteRoute = function(id) {
    return $http.delete(routeFactory.getBaseUrl() + '/' + id + '.json')
  }

  /**
  * Request all routes from database
  *
  * @return {Object} promise
  */
  routeFactory.updateRoute = function(route, id) {
    var cleanedRoute = routeFactory.cleanObjectProperties(route)

    return $http.patch(routeFactory.getBaseUrl() + '/' +  id + '.json', cleanedRoute)
  }

	return routeFactory
})
