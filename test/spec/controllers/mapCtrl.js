'use strict'

describe('Controller: mapCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var mapCtrl, scope, rootScope, utilsRouteSvc,
  deferred, mapChartSvc

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

    // mapChartSvc stub
    mapChartSvc = { processData: function() {} }
    spyOn(mapChartSvc, 'processData').and.returnValue([
      {metrics: [{type: 'Boulder'}]},
      {metrics: [{type: 'Sport Lead'}]}
    ])

    mapCtrl = $controller('mapCtrl', {
      $scope:         scope,
      utilsRouteSvc:  utilsRouteSvc,
      mapChartSvc:    mapChartSvc
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

    expect(_.isEqual(scope.locations, [
      {"metrics":[{"type":"Boulder"}],"options":{"icon":"images/climbing_blue.png"}},
      {"metrics":[{"type":"Sport Lead"}],"options":{"icon":"images/climbing_gray.png"}}
    ])).toBe(true)
  })

  it('should #getMarkerIcon', function() {
    var types = ['Sport lead', 'Boulder', 'Traditional', 'Multi-pitch', 'Top rope']

    expect(scope.getMarkerIcon(types[0])).toMatch(/yellow/)
    expect(scope.getMarkerIcon(types[1])).toMatch(/blue/)
    expect(scope.getMarkerIcon(types[2])).toMatch(/green/)
    expect(scope.getMarkerIcon(types[3])).toMatch(/orange/)
    expect(scope.getMarkerIcon(types[4])).toMatch(/gray/)
    expect(scope.getMarkerIcon('undefined')).toMatch(/gray/)
  })
})
