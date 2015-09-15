'use strict'

describe('Controller: tableCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var tableCtrl, scope, modal, rootScope, utilsRouteSvc,
  deferred, utilsChartSvc

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // modal Stub
    modal = {
      open: function() {}
    }
    spyOn(modal, 'open')

    // utilsRouteSvc Stub
    utilsRouteSvc = {
      getRoutes:       function() { },
      getTypeColor:    function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(utilsRouteSvc, 'getRoutes').and.returnValue(deferred.promise)
    spyOn(utilsRouteSvc, 'getTypeColor')

    // utilsChartSvc stub
    utilsChartSvc = { arrayGroupBy: function() {} }
    spyOn(utilsChartSvc, 'arrayGroupBy').and.returnValue(['test'])

    tableCtrl = $controller('tableCtrl', {
      $scope:         scope,
      $modal:         modal,
      utilsRouteSvc:  utilsRouteSvc,
      utilsChartSvc:  utilsChartSvc
    })
  }))

  it('should listen to #routesUpdated event', function() {
    utilsRouteSvc.getRoutes.calls.reset()
    rootScope.$emit('routesUpdated')
    rootScope.$digest()

    expect(utilsRouteSvc.getRoutes).toHaveBeenCalled()
  })

  it('should #initController', function() {
    utilsChartSvc.arrayGroupBy.calls.reset()
    var data = {key1: 'test1', key2: 'test2'}
    scope.initController(data)

    expect(scope.routes.length).toBe(2)
    expect(scope.routes).toEqual(jasmine.any(Array))
    expect(utilsChartSvc.arrayGroupBy).toHaveBeenCalled()
    expect(scope.locations).toEqual(['test'])
    expect(scope.sectors).toEqual(['test'])
  })

  it('should #getTypeColor', function() {
    var route = {type: 'test'}
    scope.getTypeColor(route)

    expect(utilsRouteSvc.getTypeColor).toHaveBeenCalledWith(route)
  })

  it('should #addRoute', function() {
    modal.open.calls.reset()

    scope.addRoute()
    expect(modal.open).toHaveBeenCalled()
  })

  it('should #openRouteModal', function() {
    modal.open.calls.reset()

    scope.openRouteModal()
    expect(modal.open).toHaveBeenCalled()
  })

})
