'use strict'

describe('Controller: ModaladdrouteCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var ModaladdrouteCtrl, scope, modalInstance, rootScope, utilsRouteSvc,
  deferred, utilsChartSvc

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // modalInstance Stub
    modalInstance = {
      dismiss: function() {}
    }
    spyOn(modalInstance, 'dismiss')

    // utilsRouteSvc Stub
    utilsRouteSvc = {
      getRoutes:       function() { },
      saveRoute:       function() {},
      getIconStatus:   function() {},
      getIconRock:     function() {},
      getIndoorLabel:  function() {},
      getTypeColor:    function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(utilsRouteSvc, 'getRoutes').and.returnValue(deferred.promise)
    spyOn(utilsRouteSvc, 'saveRoute').and.returnValue(deferred.promise)
    spyOn(utilsRouteSvc, 'getIconStatus')
    spyOn(utilsRouteSvc, 'getIconRock')
    spyOn(utilsRouteSvc, 'getIndoorLabel')
    spyOn(utilsRouteSvc, 'getTypeColor')

    // utilsChartSvc stub
    utilsChartSvc = { arrayGroupBy: function() {} }
    spyOn(utilsChartSvc, 'arrayGroupBy').and.returnValue(['test'])

    ModaladdrouteCtrl = $controller('ModaladdrouteCtrl', {
      $scope:          scope,
      $modalInstance:  modalInstance,
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

  it('should close the modal on #cancelEdit', function() {
    modalInstance.dismiss.calls.reset()
    scope.cancelEdit()

    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should #flipCard', function() {
    scope.route = { $hover: false }
    scope.flipCard()

    expect(scope.route.$hover).toBe(true)
  })

  it('should #sectorPopulatePlaceholder', function() {
    modalInstance.dismiss.calls.reset()

    var sectorA = { sector: 'sectorA' }
    var sectorB = { sector: 'sectorB' }
    scope.route = sectorA
    scope.arrayRoutes = [sectorA, sectorB]

    scope.sectorPopulatePlaceholder()

    expect(utilsChartSvc.arrayGroupBy.calls.mostRecent().args).toEqual(
      [[sectorA], 'location']
    )
    expect(scope.route.type).toMatch('test')
    expect(scope.route.rock).toMatch('test')
    expect(scope.route.location).toMatch('test')
  })

  it('should #saveRoute and close the modal', function() {
    utilsRouteSvc.saveRoute.calls.reset()
    scope.saveRoute()

    expect(utilsRouteSvc.saveRoute).toHaveBeenCalled()
  })

  it('should #initController with new empty route', function() {
    scope.initController({test:'data'})

    expect(scope.route).toBeDefined()
    expect(scope.locations.length).toBe(1)
    expect(scope.sectors.length).toBe(1)
    expect(scope.arrayRoutes.length).toBe(1)
  })

  it('should #getIconRock', function() {
    utilsRouteSvc.getIconRock.calls.reset()
    scope.getIconRock()

    expect(utilsRouteSvc.getIconRock).toHaveBeenCalled()
  })

  it('should #getIconStatus', function() {
    utilsRouteSvc.getIconStatus.calls.reset()
    scope.getIconStatus()

    expect(utilsRouteSvc.getIconStatus).toHaveBeenCalled()
  })

  it('should #getIndoorLabel', function() {
    utilsRouteSvc.getIndoorLabel.calls.reset()
    scope.getIndoorLabel()

    expect(utilsRouteSvc.getIndoorLabel).toHaveBeenCalled()
  })

  it('should #getTypeColor', function() {
    utilsRouteSvc.getTypeColor.calls.reset()
    scope.getTypeColor()

    expect(utilsRouteSvc.getTypeColor).toHaveBeenCalled()
  })

})
