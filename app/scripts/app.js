'use strict'

angular.module('climbingMemo', ['ngRoute','ui.bootstrap','hc.marked',
'jlareau.pnotify', 'ng-appcache', 'ngStorage'])

angular.module('climbingMemo')
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    redirectTo: '/climbs'
  })
  .when('/climbs', {
    controller: 'climbsCtrl',
    templateUrl: 'views/climbs.html'
  })
  .when('/map', {
    controller: 'mapCtrl',
    templateUrl: 'views/map.html'
  })
  .when('/charts', {
    controller: 'chartsCtrl',
    templateUrl: 'views/charts.html'
  })
  .otherwise({
    redirectTo: '/climbs'
  })
})

angular.module('climbingMemo')
.constant('DATABASE_URL', 'https://dazzling-heat-1886.firebaseio.com/')
