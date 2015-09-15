'use strict'

describe('Controller: TimelineCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  /**
  * Initialize local variables for unit-test
  */
  var TimelineCtrl, scope, deferred, utilsChartSvc,
  rootScope, modal, timelineSvc, utilsRouteSvc
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

    // utilsChartSvc stub
    utilsChartSvc = {
      arrayGroupBy:  function() {},
      typeColor:     function() {}
    }
    spyOn(utilsChartSvc, 'typeColor').and.returnValue('green')

    // utilsRouteSvc Stub
    utilsRouteSvc = {
      getRoutes:       function() {},
      getTypeColor:    function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(utilsRouteSvc, 'getRoutes').and.returnValue(deferred.promise)
    spyOn(utilsRouteSvc, 'getTypeColor')

    // modal stub
    modal = { open:     function() {} }
    spyOn(modal, 'open')

    // timelineSvc stub
    timelineSvc = {
      processData: function() {}
    }
    spyOn(timelineSvc, 'processData').and.returnValue([1,2,3])

    TimelineCtrl = $controller('TimelineCtrl', {
      $scope:         scope,
      timelineSvc:    timelineSvc,
      $rootScope:     rootScope,
      utilsChartSvc:  utilsChartSvc,
      utilsRouteSvc:  utilsRouteSvc,
      $modal:         modal
    })
  }))

  it('should listen on event #routesUpdated', function() {
    utilsRouteSvc.getRoutes.calls.reset()
    rootScope.$emit('routesUpdated')
    rootScope.$digest()

    expect(utilsRouteSvc.getRoutes).toHaveBeenCalled()
  })

  it('should #getTypeColor', function() {
    utilsRouteSvc.getTypeColor.calls.reset()
    scope.getTypeColor({mainType: 'test'})

    expect(utilsRouteSvc.getTypeColor).toHaveBeenCalled()
  })

  it('should open modal on #addRoute', function() {
    modal.open.calls.reset()

    scope.addRoute()
    expect(modal.open).toHaveBeenCalled()
  })

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
