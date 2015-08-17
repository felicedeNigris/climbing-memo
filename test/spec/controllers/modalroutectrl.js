'use strict'

describe('Controller: modalRouteCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var modalRouteCtrl, scope, modalInstance, routesSvc, deferred

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $q,
  notificationService, routeNoteFormattingFilter) {

    scope = $rootScope.$new()
    modalInstance = {
      dismiss: function() {}
    }
    spyOn(modalInstance, 'dismiss')
    routesSvc = {
      updateRoute: function() {}
    }
    deferred = $q.defer()
    spyOn(routesSvc, 'updateRoute').and.returnValue(deferred.promise)

    modalRouteCtrl = $controller('modalRouteCtrl', {
      $scope: scope,
      $modalInstance: modalInstance,
      routesSvc: routesSvc,
      route: {},
      notificationService: notificationService,
      routeNoteFormattingFilter: routeNoteFormattingFilter
    })
  }))

  it("should save a route", function() {
    var route = { '$id': 'test' }
    routesSvc.updateRoute.calls.reset()

    scope.saveRoute(route)
    expect(routesSvc.updateRoute).toHaveBeenCalledWith({
      '$id': 'test',
      '$editNotes': false
    }, 'test')
  })

  it("should toggle watch a route", function() {
    spyOn(scope, 'saveRoute')
    var route = { '$id': 'test' }
    scope.toggleWatchRoute(route)

    expect(scope.saveRoute).toHaveBeenCalledWith({
      '$id': 'test',
      'watch': true
    })
  })

  it("should close modal", function() {
    modalInstance.dismiss.calls.reset()
    scope.closeModal()

    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })
})
