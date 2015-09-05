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

      routesSvc.addRoute(route)
      .success(function(data) {
        notificationService.success(route.name + ' saved')
        route.$id = data.name
        routes[route.$id] = route
        $rootScope.$broadcast('routesUpdated', routes)
      })
      .error(function() {
        notificationService.error('Error while saving ' + route.name)
      })

    })
  }
});
