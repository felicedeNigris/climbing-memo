'use strict'

angular.module('climbingMemo')
.factory('routesSvc', function routeSvc($http, DATABASE_URL) {
  var urlBase = DATABASE_URL + 'routes'
  var routeFactory = {}

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

  routeFactory.getRoute = function(id) {
    return $http.get(urlBase + '/' + id + '.json')
  }

  routeFactory.getRoutes = function() {
    return $http.get(urlBase + '.json')
  }

  routeFactory.addRoute = function(route) {
    var cleanedRoute = routeFactory.cleanObjectProperties(route)

    return $http.post(urlBase + '/.json', cleanedRoute)
  }

  routeFactory.deleteRoute = function(id) {
    return $http.delete(urlBase + '/' + id + '.json')
  }

  routeFactory.updateRoute = function(route, id) {
    var cleanedRoute = routeFactory.cleanObjectProperties(route)

    return $http.patch(urlBase + '/' +  id + '.json', cleanedRoute)
  }

	return routeFactory
})
