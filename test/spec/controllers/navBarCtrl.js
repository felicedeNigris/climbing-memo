'use strict'

describe('Controller: navbarCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  /**
  * Initialize local variables for unit-test
  */
  var navbarCtrl, scope, location

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new()

    // Location stub
    location = {
      path:  function() {}
    }

    spyOn(location, 'path').and.returnValue('/test')

    navbarCtrl = $controller('navbarCtrl', {
      $scope:    scope,
      $location:  location
    })
  }))

  it('should detect #isActive based on location', function() {
    var output

    output = scope.isActive('/test')
    expect(output).toBe(true)
    output = scope.isActive('/error')
    expect(output).toBe(false)
  })
})
