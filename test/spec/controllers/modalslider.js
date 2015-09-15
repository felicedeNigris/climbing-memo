'use strict'

describe('Controller: ModalsliderCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var ModalsliderCtrl, scope, modalInstance, utilsChartSvc, routesId, filters,
  utilsRouteSvc, deferred

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $log, $localStorage,
  routesSvc, $q) {
    scope = $rootScope.$new()

    // modalInstance Stub
    modalInstance = {
      dismiss: function() {}
    }
    spyOn(modalInstance, 'dismiss')

    // utilsChartSvc stub
    utilsChartSvc = {
      typeColor:     function() {}
    }
    spyOn(utilsChartSvc, 'typeColor').and.returnValue('green')


    // utilsRouteSvc Stub
    utilsRouteSvc = {
      getRoutes:       function() {},
      saveRoute:       function() {},
      deleteRoute:     function() {},
      getIconStatus:   function() {},
      getIconRock:     function() {},
      getIndoorLabel:  function() {},
      getTypeColor:    function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(utilsRouteSvc, 'getRoutes').and.returnValue(deferred.promise)
    spyOn(utilsRouteSvc, 'saveRoute').and.returnValue(deferred.promise)
    spyOn(utilsRouteSvc, 'deleteRoute').and.returnValue(deferred.promise)
    spyOn(utilsRouteSvc, 'getIconStatus')
    spyOn(utilsRouteSvc, 'getIconRock')
    spyOn(utilsRouteSvc, 'getIndoorLabel')
    spyOn(utilsRouteSvc, 'getTypeColor')

    // routesId stub
    routesId = [2, 3]

    // filters stub
    filters = {
      routeNoteFormattingFilter: function() {}
    }
    spyOn(filters, 'routeNoteFormattingFilter')

    ModalsliderCtrl = $controller('ModalsliderCtrl', {
      $scope:                     scope,
      $modalInstance:             modalInstance,
      routesId:                   routesId,
      routeNoteFormattingFilter:  filters.routeNoteFormattingFilter,
      utilsChartSvc:              utilsChartSvc,
      utilsRouteSvc:              utilsRouteSvc
    })
  }))

  it('should $editRoute', function() {
    var route = {}
    scope.editRoute(route)

    expect(route.$editMode).toBe(true)
  })

  it('should $copyRoute', function() {
    var route = {id: 1}
    scope.copyRoute(route)

    expect(route.id).toBe(false)
    expect(route.$copy).toBeDefined()
    expect(route.$editMode).toBe(true)
  })

  it("should #saveRoute", function() {
    modalInstance.dismiss.calls.reset()
    utilsRouteSvc.saveRoute.calls.reset()
    var route = {}
    scope.saveRoute(route)

    expect(utilsRouteSvc.saveRoute).toHaveBeenCalled()
    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect(route.$editMode).toBe(false)
  })

  it("should #deleteRoute", function() {
    utilsRouteSvc.deleteRoute.calls.reset()
    modalInstance.dismiss.calls.reset()
    var route = {}
    scope.deleteRoute(route)

    expect(utilsRouteSvc.deleteRoute).toHaveBeenCalled()
    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect(route.$editMode).toBe(false)
  })

  it("should #cancelEdit", function() {
    modalInstance.dismiss.calls.reset()
    var route = {}
    scope.cancelEdit(route)

    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect(route.$editMode).toBe(false)
  })

  it("should #closeModal", function() {
    modalInstance.dismiss.calls.reset()
    scope.closeModal()

    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it("should #initController", function() {
    filters.routeNoteFormattingFilter.calls.reset()
    var routes = [{id: 1}, {id: 2}, {id: 3}, {id: 4}]

    scope.initController(routes)

    expect(scope.slides.length).toBe(2)
    expect(filters.routeNoteFormattingFilter).toHaveBeenCalled()
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


  it("should #getTimes", function() {
    expect(scope.getTimes(5).length).toBe(5)
  })

  it("should #flipCard", function() {
    var slides = [{}, {active: true}, {}]
    scope.slides = slides

    scope.flipCard()
    expect(slides[1].$hover).toBe(true)
    scope.flipCard()
    expect(slides[1].$hover).toBe(false)
  })
})
