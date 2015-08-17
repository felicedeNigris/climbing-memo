'use strict'

describe('Controller: climbsCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var climbsCtrl, scope, routesSvc, deferred

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $filter, $http, $q,
  $rootScope, $modal, notificationService, $localStorage, $log, utilsChartSvc) {
    scope = $rootScope.$new()
    routesSvc = {
      updateRoute:  function() {},
      addRoute:     function() {},
      deleteRoute:  function() {},
      getRoutes:    function() {}
    }
    deferred = $q.defer()
    spyOn(routesSvc, 'getRoutes').and.returnValue(deferred.promise)

    climbsCtrl = $controller('climbsCtrl', {
      $scope: scope,
      $filter: $filter,
      routesSvc: routesSvc,
      $http: $http,
      $rootScope: $rootScope,
      $modal: $modal,
      notificationService: notificationService,
      $localStorage: $localStorage,
      $log: $log,
      utilsChartSvc: utilsChartSvc
    })
  }))

  it("should #initController", function() {
  })

  it("should #getTypeColor", function() {
  })

  it("should #addRoute", function() {
  })

  it("should #openDatepicker", function() {
  })

  it("should #saveRoute", function() {
  })

  it("should #cancelRoute", function() {
  })

  it("should #copyRoute", function() {
  })

  it("should #deleteRoute", function() {
  })

  it("should #sectorPopulatePlaceholder", function() {
  })

  it("should #openRouteModal", function() {
  })

  it("should catch event $on #routesUpdated", function() {
  })

  it("should catch event $on #routesTableVisibility", function() {
  })
})
