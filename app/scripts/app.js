'use strict'

angular.module('climbingMemo', ['ngRoute','ui.bootstrap','hc.marked',
'jlareau.pnotify', 'ngStorage', 'uiGmapgoogle-maps', 'datatables', 'ngTouch',
'datatables.bootstrap', 'angular-timeline', 'angular-scroll-animate'])

angular.module('climbingMemo')
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    redirectTo: '/timeline'
  })
  .when('/table', {
    controller: 'tableCtrl',
    templateUrl: 'views/table.html'
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

angular.module('climbingMemo')
.run(function($window, $rootScope) {
  $rootScope.online = navigator.onLine // jshint ignore:line
  $window.addEventListener("offline", function() {
    $rootScope.$apply(function() {
      $rootScope.online = false
    })
  }, false)
  $window.addEventListener("online", function() {
    $rootScope.$apply(function() {
      $rootScope.online = true
    })
  }, false)
})
