'use strict'

describe('Controller: overviewCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var overviewCtrl,
    scope

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new()
    overviewCtrl = $controller('overviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    })
  }))

  it("should pass the build", function() {
    expect(true).toBe(true)
  })
})
