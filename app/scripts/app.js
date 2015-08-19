'use strict'

angular.module('climbingMemo', ['ngRoute','ui.bootstrap','hc.marked',
'jlareau.pnotify', 'ng-appcache', 'ngStorage', 'uiGmapgoogle-maps',
'angular-timeline'])

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
  .when('/timeline', {
    controller: 'TimelineCtrl',
    templateUrl: 'views/timeline.html'
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
.constant('DATABASE_URL', 'https://climbing-memo.firebaseio.com/')

angular.module('climbingMemo')
.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  })
})
