'use strict'

describe('Controller: overviewCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var overviewCtrl, scope, rootScope, utilsRouteSvc,
  deferred, utilsChartSvc

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // utilsRouteSvc Stub
    utilsRouteSvc = {
      getRoutes:       function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(utilsRouteSvc, 'getRoutes').and.returnValue(deferred.promise)

    // utilsChartSvc stub
    utilsChartSvc = { arrayGroupBy: function() {} }
    spyOn(utilsChartSvc, 'arrayGroupBy').and.returnValue(['test1', 'test2'])

    overviewCtrl = $controller('overviewCtrl', {
      $scope:          scope,
      utilsRouteSvc:   utilsRouteSvc,
      utilsChartSvc:   utilsChartSvc
    })
  }))

  it('should watch for #routesUpdated event', function() {
    utilsRouteSvc.getRoutes.calls.reset()

    rootScope.$emit('routesUpdated')
    rootScope.$digest()

    expect(utilsRouteSvc.getRoutes).toHaveBeenCalled()
  })

  it('should #initController with new empty route', function() {
    scope.initController({test:'data'})

    expect(scope.routes).toEqual(jasmine.any(Array))
    expect(scope.routes.length).toBe(1)

    expect(scope.metrics).toEqual({
      count:           1,
      favoriteSector:  'test1',
      favoriteType:    'test1'
    })
  })
})
