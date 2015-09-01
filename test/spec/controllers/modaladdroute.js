'use strict';

describe('Controller: ModaladdrouteCtrl', function () {

  // load the controller's module
  beforeEach(module('climbingMemo'));

  var ModaladdrouteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModaladdrouteCtrl = $controller('ModaladdrouteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ModaladdrouteCtrl.awesomeThings.length).toBe(3);
  });
});
