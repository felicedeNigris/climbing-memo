'use strict'

describe('Directive: treemapChart', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))

  var element,
  scope

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new()
  }))

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<treemap-chart></treemap-chart>')
    element = $compile(element)(scope)
  }))
})
