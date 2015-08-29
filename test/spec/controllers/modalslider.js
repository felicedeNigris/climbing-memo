'use strict'

describe('Controller: ModalsliderCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var ModalsliderCtrl, scope, modalInstance

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new()

    // modalInstance Stub
    modalInstance = {
      dismiss: function() {}
    }
    spyOn(modalInstance, 'dismiss')

    ModalsliderCtrl = $controller('ModalsliderCtrl', {
      $scope:         scope,
      $modalInstance:  modalInstance
    })
  }))

  it("should close modal", function() {
    modalInstance.dismiss.calls.reset()
    scope.closeModal()

    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })
})
