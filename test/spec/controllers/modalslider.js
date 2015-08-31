'use strict'

describe('Controller: ModalsliderCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var ModalsliderCtrl, scope, modalInstance, utilsChartSvc, routesId, filters

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $log, $localStorage,
  routesSvc) {
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

    // routesId stub
    routesId = [2, 3]

    // filters stub
    filters = {
      routeNoteFormattingFilter: function() {}
    }
    spyOn(filters, 'routeNoteFormattingFilter')

    ModalsliderCtrl = $controller('ModalsliderCtrl', {
      $scope:         scope,
      $modalInstance:  modalInstance,
      routesId: routesId,
      $localStorage: $localStorage,
      routesSvc: routesSvc,
      $log: $log,
      routeNoteFormattingFilter: filters.routeNoteFormattingFilter,
      utilsChartSvc: utilsChartSvc
    })
  }))

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

  it("should #getIconStatus", function() {
    var iconA = scope.getIconStatus({status: 'Attempt'})
    var iconB = scope.getIconStatus({status: 'Other'})

    expect(iconA).toMatch('fa-times')
    expect(iconB).toMatch('fa-check')
  })

  it("should #getIconRock", function() {
    var iconA = scope.getIconRock({rock: 'Indoor'})
    var iconB = scope.getIconRock({rock: 'Other'})

    expect(iconA).toMatch('fa-home')
    expect(iconB).toMatch('fa-sun-o')
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

  it("should #getTypeColor", function() {
    utilsChartSvc.typeColor.calls.reset()
    var result = scope.getTypeColor({type: 'green'})

    expect(utilsChartSvc.typeColor).toHaveBeenCalledWith('green')
    expect(result).toBe('green')
  })
})
