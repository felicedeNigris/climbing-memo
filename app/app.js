'use strict'

angular.module('climbingMemo', ['ngRoute','ui.bootstrap','hc.marked', 'jlareau.pnotify'])

angular.module('climbingMemo')
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    redirectTo: '/climbs'
  })
  .when('/climbs', {
    controller: 'climbsCtrl',
    templateUrl: 'app/views/climbs.html'
  })
  .when('/map', {
    controller: 'mapCtrl',
    templateUrl: 'app/views/map.html'
  })
  .when('/charts', {
    controller: 'chartsCtrl',
    templateUrl: 'app/views/charts.html'
  })
  .otherwise({
    redirectTo: '/climbs'
  })
})

angular.module('climbingMemo')
.constant('DATABASE_URL', 'https://dazzling-heat-1886.firebaseio.com/')
