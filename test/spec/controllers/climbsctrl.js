'use strict'

describe('Controller: climbsCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  /**
  * Initialize local variables for unit-test
  */
  var climbsCtrl, scope, routesSvc, deferred, utilsChartSvc,
  notificationService, rootScope
  // jscs:disable
  var dataStub = {
    1: {
      date: "07/06/2015" , id: 1                , location: "Jamestown , CA" ,
      name: "Green Card" , rock: "Basalt"       , sector: "Goldwall"   ,
      status: "Onsight"  , type: "Sport lead" } ,
    2: {
      date: "08/02/2015" , id: 2                , location: "Jamestown , CA" ,
      name: "Gold Rush"  , rock: "Basalt"       , sector: "Goldwall"   ,
      status: "Redpoint" , type: "Sport lead" } ,
    3: {
      date: "02/17/2015" , id: 3                , location: "Jamestown , CA" ,
      name: "Motherlode" , rock: "Basalt"       , sector: "Jailhouse"  ,
      status: "Attempt"  , type: "Sport lead" }
  }
  // jscs:enable

  /**
  * Initialize the controller and a mock scope
  */
  beforeEach(inject(function($controller, $filter, $http, $q,
  $rootScope, $modal, $localStorage, $log) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // routesSvc stub
    routesSvc = {
      updateRoute:  function() {},
      addRoute:     function() {},
      deleteRoute:  function() {},
      getRoutes:    function() {}
    }
    deferred = $q.defer()
    spyOn(routesSvc, 'getRoutes').and.returnValue(deferred.promise)

    // utilsChartSvc stub
    utilsChartSvc = {
      arrayGroupBy:  function() {},
      typeColor:     function() {}
    }
    spyOn(utilsChartSvc, 'arrayGroupBy').and.returnValue(['test'])
    spyOn(utilsChartSvc, 'typeColor').and.returnValue('green')

    // notificationService stub
    notificationService = {
      success:  function() {},
      error:    function() {}
    }
    spyOn(notificationService, 'success')
    spyOn(notificationService, 'error')

    climbsCtrl = $controller('climbsCtrl', {
      $scope: scope,
      $filter: $filter,
      routesSvc: routesSvc,
      $http: $http,
      $rootScope: rootScope,
      $modal: $modal,
      notificationService: notificationService,
      $localStorage: $localStorage,
      $log: $log,
      utilsChartSvc: utilsChartSvc
    })
  }))

  it("should #initController", function() {
    scope.initController(dataStub)

    expect(_.size(scope.routes)).toBe(3)
    expect(scope.locations.length).toBe(1)
    expect(scope.sectors.length).toBe(1)
  })

  it("should #getTypeColor", function() {
    utilsChartSvc.typeColor.calls.reset()
    var result = scope.getTypeColor(dataStub[1])

    expect(utilsChartSvc.typeColor).toHaveBeenCalledWith(dataStub[1].type)
    expect(result).toBe('green')
  })

  it("should #addRoute", function() {
    scope.routes = {}
    scope.addRoute()

    expect(_.size(scope.routes)).toBe(1)
  })

  it("should #openDatepicker", function() {
    var eventStub = {
      preventDefault:   function() {},
      stopPropagation:  function() {}
    }
    scope.routes = { 1: {} }

    scope.openDatepicker(eventStub,{id: 1})
    expect(scope.routes[1].$datepicker).toBe(true)
  })

  it("should #saveRoute", function() {
  })

  it("should #cancelRoute", function() {
    notificationService.success.calls.reset()
    scope.routes = { 1:{} }

    scope.cancelRoute({id:1})
    expect(notificationService.success).toHaveBeenCalled()
    expect(_.size(scope.routes)).toBe(0)
  })

  it("should #copyRoute", function() {
    scope.routes = {}
    scope.copyRoute(dataStub[1])

    expect(_.size(scope.routes)).toBe(1)

    var firstObject = scope.routes[Object.keys(scope.routes)[0]]
    expect(firstObject.id).not.toBe(dataStub[1].id)
  })

  it("should #deleteRoute", function() {
  })

  it("should #sectorPopulatePlaceholder", function() {
    utilsChartSvc.arrayGroupBy.calls.reset()
    scope.routes = dataStub
    scope.routes[1].type = 'existing'
    delete scope.routes[1].rock
    delete scope.routes[1].location

    scope.sectorPopulatePlaceholder('Goldwall', dataStub[1])
    expect(scope.routes[1].type).toBe('existing')
    expect(scope.routes[1].rock).toBe('test')
    expect(scope.routes[1].location).toBe('test')
  })

  it("should #openRouteModal", function() {
  })

  it("should catch event $on #routesUpdated", function() {
    spyOn(scope, 'initController')
    rootScope.$emit('routesUpdated')

    expect(scope.initController).toHaveBeenCalled()
  })

  it("should catch event $on #routesTableVisibility", function() {
  })
})
