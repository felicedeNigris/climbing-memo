'use strict'

angular.module('climbingMemo')
.factory('routesSvc', function routeSvc($http, DATABASE_URL) {

  var urlBase = DATABASE_URL + 'routes'

  var cleanObjectProperties = function(object) {
    var cleanedObject = JSON.parse(JSON.stringify(object)) // Clone

    // Remove properties starting with "$"
    _.keys(cleanedObject)
    .filter(function(key) { return key.match(/^\$/) })
    .forEach(function(key) { delete cleanedObject[key] })

    return cleanedObject
  }

  var routeFactory = {}

  routeFactory.getRoute = function(id) {
    return $http.get(urlBase + '/' + id + '.json', {cache: true})
  }

  routeFactory.getRoutes = function() {
    return $http.get(urlBase + '.json', {cache: true})
  }

  routeFactory.addRoute = function(route) {
    var cleanedRoute = cleanObjectProperties(route)

    return $http.post(urlBase + '/.json', cleanedRoute)
  }

  routeFactory.deleteRoute = function(id) {
    return $http.delete(urlBase + '/' + id + '.json')
  }

  routeFactory.updateRoute = function(route, id) {
    var cleanedRoute = cleanObjectProperties(route)

    return $http.patch(urlBase + '/' +  id + '.json', cleanedRoute)
  }

	return routeFactory
})
