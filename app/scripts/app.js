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
.run(function($window, $rootScope, $log) {
  $rootScope.online = navigator.onLine // jshint ignore:line
  // FIXME
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

  var appCache = $window.applicationCache
  try {
    appCache.update() // Attempt to update the user's cache.

    if (appCache.status == $window.applicationCache.UPDATEREADY) {
      appCache.swapCache()  // The fetch was successful, swap in the new cache.
    }
  } catch(error) {
    $log.info("Error updating cache (manifest)")
  }
})
