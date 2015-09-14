'use strict'

describe('Controller: tableCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var tableCtrl, scope, modalInstance, rootScope, utilsRouteSvc,
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

    tableCtrl = $controller('tableCtrl', {
      $scope:          scope,
      $modalInstance:  modalInstance,
      utilsRouteSvc:   utilsRouteSvc,
      utilsChartSvc:   utilsChartSvc
    })
  }))

  it('should list to #routesUpdated event', function() {
  })

  it('should #initController', function() {
  })

  it('should #getTypeColor', function() {
  })

  it('should #addRoute', function() {
  })

  it('should #openRouteModal', function() {
  })

})
