'use strict'

describe('Controller: TimelineCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  /**
  * Initialize local variables for unit-test
  */
  var TimelineCtrl, scope, routesSvc, deferred, utilsChartSvc,
  notificationService, rootScope, modal, timelineSvc
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

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, routesSvc,
  $localStorage, $log, $rootScope, $q) {
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
    spyOn(utilsChartSvc, 'typeColor').and.returnValue('green')

    // modal stub
    modal = { open:     function() {} }
    spyOn(modal, 'open')

    // timelineSvc stub
    timelineSvc = {
      processData: function() {}
    }
    spyOn(timelineSvc, 'processData').and.returnValue([1,2,3])

    TimelineCtrl = $controller('TimelineCtrl', {
      $scope: scope,
      timelineSvc: timelineSvc,
      routesSvc: routesSvc,
      $localStorage: $localStorage,
      $log: $log,
      $rootScope: rootScope,
      utilsChartSvc: utilsChartSvc,
      $modal: modal
    })
  }))

  it('should listen on event #routesUpdated', function() {
    spyOn(scope, 'initController')
    rootScope.$emit('routesUpdated')

    expect(scope.initController).toHaveBeenCalled()
  })

  // FIXME
  // it('should #getTypeColor', function() {
  //   utilsChartSvc.typeColor.calls.reset()
  //   var result = scope.getTypeColor({mainType: 'green'})
  //
  //   expect(utilsChartSvc.typeColor).toHaveBeenCalledWith('green')
  //   expect(result).toBe('green')
  // })

  it('should #getBadgeTooltip', function() {
    var event = {
      isIndoor: true,
      mainType: 'test'
    }
    expect(scope.getBadgeTooltip(event)).toBe('Indoor test')
  })

  it('should #getBadgeIcon', function() {
    var event = { isIndoor: true }
    expect(scope.getBadgeIcon(event)).toBe('fa fa-home')

    event = { isIndoor: false }
    expect(scope.getBadgeIcon(event)).toBe('fa fa-sun-o')
  })

  it('should #openRouteModal', function() {
    modal.open.calls.reset()
    scope.openRouteModal()

    expect(modal.open).toHaveBeenCalled()
  })

  it('should #initController ', function() {
    timelineSvc.processData.calls.reset()
    scope.initController({})

    expect(_.size(scope.events)).toBe(3)
    expect(timelineSvc.processData).toHaveBeenCalled()
  })
})
